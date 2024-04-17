'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { AddressFormType, AddressSchema } from '@/validationSchemas';
import { InputComboBox } from '@/components/common/form/input-combobox';
import { InputText } from '@/components/common/form/input-text';
import { InputSelect } from '@/components/common/form/input-select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { Icons } from '@/components/icons';

import { addressApiRequest, authApiRequest } from '@/apiRequests';

import {
  GhnDistrictDTO,
  GhnProvinceDTO,
  GhnWardDTO,
  UserAddressSchema,
  UserAddressSchemaDTO,
} from '@techcell/node-sdk';
import { ADDRESS_TYPES, AddressType, CASE_DEFAULT, RootPath } from '@/constants';

import { getErrorMsg, handleErrorApi } from '@/lib/utils';

import { useAddressModal } from '@/hooks/useAddressModal';

interface ProfileFormProps {
  index: number | null;
  closeModal: () => void;
}

export function AddressForm({ index, closeModal }: Readonly<ProfileFormProps>) {
  const router = useRouter();
  const [provinces, setProvinces] = useState<GhnProvinceDTO[]>([]);
  const [districts, setDistricts] = useState<GhnDistrictDTO[]>([]);
  const [wards, setWards] = useState<GhnWardDTO[]>([]);

  const { addressList, setAddressList } = useAddressModal();

  const form = useForm<AddressFormType>({
    mode: 'onChange',
    resolver: zodResolver(AddressSchema),
    defaultValues: index ? addressList[index] : {
      provinceLevel: { provinceId: undefined },
      districtLevel: { districtId: undefined },
      wardLevel: { wardCode: '' },
      detail: '',
      customerName: '',
      phoneNumbers: '',
      type: 'home',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    resetField,
    setError,
    control,
  } = form;

  const provinceField = useWatch({ control, name: 'provinceLevel.provinceId' });
  const districtField = useWatch({ control, name: 'districtLevel.districtId' });

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtField]);

  async function onSubmit(values: AddressFormType) {
    try {
      if (!index) {
        await authApiRequest.updateMe({
          address: [...addressList, values] as Array<UserAddressSchemaDTO>,
        });
        
      }

      const newUser = await authApiRequest.getMeClient();

      toast({
        variant: 'success',
        title: `${index ? 'Cập nhật' : 'Thêm'} địa chỉ thành công`,
      });

      setAddressList(newUser.payload.address ?? []);
      router.refresh();
      closeModal();
    } catch (error) {
      console.log(error);
      const errorResponse = handleErrorApi({
        error,
        setError,
      });
      toast({
        variant: 'destructive',
        title: `${index ? 'Cập nhật' : 'Thêm'} địa chỉ thất bại`,
        description: getErrorMsg(errorResponse.status, CASE_DEFAULT),
      });
    }
  }

  return (
    <ScrollArea className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:h-[85vh]">
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
              name="phoneNumbers"
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
          <div className="flex justify-end items-center gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Lưu
            </Button>
            <Button type="button" variant="secondary" onClick={closeModal}>
              Hủy
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  );
}