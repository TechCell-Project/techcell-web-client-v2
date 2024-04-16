'use client';

import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddressFormType, AddressSchema } from '@/validationSchemas';
import { InputComboBox } from '../common/form/input-combobox';
import { useEffect, useState } from 'react';
import { toast } from '../ui/use-toast';
import { addressApiRequest } from '@/apiRequests';
import { GhnProvinceDTO } from '@techcell/node-sdk';

interface ProfileFormProps {
  initialData: AddressFormType | null;
  closeModal: () => void;
}

export function AddressForm({ initialData, closeModal }: ProfileFormProps) {
  const router = useRouter();
  const [provinces, setProvinces] = useState<GhnProvinceDTO[]>([]);
  console.log(provinces);
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await addressApiRequest.getProvinces();
        setProvinces(res.payload);
      } catch (error) {
        console.error('Failed to fetch provinces:', error);
        toast({
          variant: 'destructive',
          title: 'Lấy dữ liệu tỉnh thành thất bại',
        });
      }
    };
    if(provinces.length === 0) {
      fetchProvinces();
    }

  }, []);

  const form = useForm<AddressFormType>({
    mode: 'onChange',
    resolver: zodResolver(AddressSchema),
    defaultValues: initialData ?? {
      provinceLevel: { provinceId: undefined },
      districtLevel: { districtId: undefined },
      wardLevel: { wardCode: ''},
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
    setValue,
    setError,
  } = form;

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
        </form>
      </Form>
    </div>
  );
}
