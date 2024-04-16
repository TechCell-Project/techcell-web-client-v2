'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { AddressFormType, AddressSchema } from '@/validationSchemas';
import { InputComboBox } from '@/components/common/form/input-combobox';
import { toast } from '@/components/ui/use-toast';

import { addressApiRequest } from '@/apiRequests';

import { GhnDistrictDTO, GhnProvinceDTO, GhnWardDTO } from '@techcell/node-sdk';
import { useDebounce } from 'ahooks';

interface ProfileFormProps {
  initialData: AddressFormType | null;
  closeModal: () => void;
}

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
      resetField('districtLevel');
      fetchDistricts(provinceField.toString());
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
      resetField('wardLevel');
      fetchWards(districtField.toString());
    }
  }, [districtField]);

  console.log(provinceField, districtField, wardField);

  async function onSubmit(values: AddressFormType) {}

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputComboBox<AddressFormType, GhnProvinceDTO>
            name="provinceLevel"
            label="Chọn Tỉnh/Thành phố"
            selectPlaceholder="Tỉnh/Tp"
            form={form}
            options={provinces}
            optionKeyValue={{ key: 'provinceId', value: 'provinceName' }}
          />
          <InputComboBox<AddressFormType, GhnDistrictDTO>
            name="districtLevel"
            label="Chọn Quận/huyện"
            selectPlaceholder="Quận/huyện"
            form={form}
            options={districts}
            optionKeyValue={{ key: 'districtId', value: 'districtName' }}
          />
          <InputComboBox<AddressFormType, GhnWardDTO>
            name="wardLevel"
            label="Chọn Xã/Phường"
            selectPlaceholder="Xã/Phường"
            form={form}
            options={wards}
            optionKeyValue={{ key: 'wardCode', value: 'wardName' }}
          />
        </form>
      </Form>
    </div>
  );
}
