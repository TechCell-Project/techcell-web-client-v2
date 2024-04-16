'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { AddressFormType, AddressSchema } from '@/validationSchemas';
import { InputComboBox } from '@/components/common/form/input-combobox';
import { InputText } from '@/components/common/form/input-text';
import { InputSelect } from '@/components/common/form/input-select';
import { toast } from '@/components/ui/use-toast';
import { addressApiRequest } from '@/apiRequests';
import { GhnDistrictDTO, GhnProvinceDTO, GhnWardDTO } from '@techcell/node-sdk';
import { ADDRESS_TYPES, AddressType } from '@/constants/common';
import { ProfileFormProps } from './address-form';

export function AddressForm({ initialData, closeModal }: ProfileFormProps) {
  const router = useRouter();
  const [provinces, setProvinces] = useState<GhnProvinceDTO[]>([]);
  const [districts, setDistricts] = useState<GhnDistrictDTO[]>([]);
  const [wards, setWards] = useState<GhnWardDTO[]>([]);

  const form = useForm<AddressFormType>({
    mode: 'onChange',
    resolver: zodResolver(AddressSchema),
    defaultValues: initialData ?? {
      provinceLevel: { provinceId: undefined },
      districtLevel: { districtId: undefined },
      wardLevel: { wardCode: '' },
      detail: '',
      customerName: '',
      phoneNumber: '',
      type: 'home',
      isDefault: undefined,
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    resetField,
    setValue,
    setError,
    watch,
    control,
  } = form;

  const provinceField = useWatch({ control, name: 'provinceLevel.provinceId' });
  const districtField = useWatch({ control, name: 'districtLevel.districtId' });
  const wardField = useWatch({ control, name: 'wardLevel.wardCode' });

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await addressApiRequest.getProvinces();

        setProvinces(res.payload);
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
        toast({
          variant: 'destructive',
          title: 'Lấy dữ liệu Tỉnh thành thất bại',
        });
      }
    };

    if (provinces.length === 0) {
      fetchProvinces();
      resetField('provinceLevel.provinceId');
      setDistricts([]);
      resetField('districtLevel.districtId');
      setWards([]);
      resetField('wardLevel');
    }
  }, [provinces.length]);

  useEffect(() => {
    const fetchDistricts = async (provinceId: string) => {
      try {
        const res = await addressApiRequest.getDistricts(provinceId);

        setDistricts(res.payload);
      } catch (error) {
        console.error('Failed to fetch districts:', error);
        toast({
          variant: 'destructive',
          title: 'Lấy dữ liệu Quận Huyện thất bại',
        });
      }
    };

    if (provinceField) {
      fetchDistricts(provinceField.toString());
      resetField('districtLevel.districtId');
      setWards([]);
      resetField('wardLevel.wardCode');
    }
  }, [provinceField]);

  useEffect(() => {
    const fetchWards = async (districtId: string) => {
      try {
        const res = await addressApiRequest.getWards(districtId);

        setWards(res.payload);
      } catch (error) {
        console.error('Failed to fetch districts:', error);
        toast({
          variant: 'destructive',
          title: 'Lấy dữ liệu Xã Phường thất bại',
        });
      }
    };

    if (districtField) {
      fetchWards(districtField.toString());
      resetField('wardLevel.wardCode');
    }
  }, [districtField]);

  console.log(provinceField, districtField, wardField);

  async function onSubmit(values: AddressFormType) {
    try {
      await authApiRequest.updateMe(values as Partial<AuthUpdateDto>);

      await authApiRequest.getMeClient();

      toast({
        variant: 'success',
        title: 'Cập nhật hồ sơ thành công',
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      const errorResponse = handleErrorApi({
        error,
        setError,
      });
      toast({
        variant: 'destructive',
        title: 'Cập nhật hồ sơ thất bại',
        description: getErrorMsg(errorResponse.status, CASE_DEFAULT),
      });
    }
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputComboBox<AddressFormType, GhnProvinceDTO>
            name="provinceLevel.provinceId"
            label="Chọn Tỉnh/Thành phố"
            selectPlaceholder="Tỉnh/Tp"
            form={form}
            options={provinces}
            optionKeyValue={{ key: 'provinceId', value: 'provinceName' }}
          />
          <InputComboBox<AddressFormType, GhnDistrictDTO>
            name="districtLevel.districtId"
            label="Chọn Quận/huyện"
            selectPlaceholder="Quận/huyện"
            form={form}
            options={districts}
            optionKeyValue={{ key: 'districtId', value: 'districtName' }}
          />
          <InputComboBox<AddressFormType, GhnWardDTO>
            name="wardLevel.wardCode"
            label="Chọn Xã/Phường"
            selectPlaceholder="Xã/Phường"
            form={form}
            options={wards}
            optionKeyValue={{ key: 'wardCode', value: 'wardName' }}
          />

          <InputText<AddressFormType>
            name="detail"
            label="Chi tiết"
            form={form}
            placeholder="Địa chỉ chi tiết"
            disabled={isSubmitting}
          />

          <div className="grid grid-cols-2 gap-4">
            <InputText<AddressFormType>
              name="customerName"
              label="Tên người nhận"
              form={form}
              placeholder="Nhập tên người nhận"
              disabled={isSubmitting}
            />
            <InputText<AddressFormType>
              name="phoneNumber"
              label="Số Điện thoại"
              form={form}
              placeholder="Nhập SĐT"
              disabled={isSubmitting}
            />
          </div>
          <InputSelect<AddressFormType, AddressType>
            name="type"
            label="Loại Địa chỉ"
            options={ADDRESS_TYPES}
            optionKeyValue={{ key: 'typeKey', value: 'typeValue' }}
            disabled={isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
}
