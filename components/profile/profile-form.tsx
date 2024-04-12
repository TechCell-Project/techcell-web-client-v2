'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { InputText } from '@/components/common/form/input-text';
import { Form } from '@/components/ui/form';
import { Icons } from '@/components/icons';

import { ProfileFormType, ProfileSchema } from '@/validationSchemas/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useProfileModal } from '@/hooks/useProfileModal';

import { handleErrorApi } from '@/lib/utils';
import { authApiRequest } from '@/apiRequests';
import { SUCCESS } from '@/constants';

export function UpdateProfile() {
  const router = useRouter();
  const onClose = useProfileModal((state) => state.onClose);

  const form = useForm<ProfileFormType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      avatarImageId: undefined,
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = form;

  async function onSubmit(values: ProfileFormType) {
    try {
      await authApiRequest.updateMe(values);

      toast({
        variant: 'success',
        title: 'Cập nhật hồ sơ thành công',
      });
      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Cập nhật hồ sơ thất bại',
      });
      handleErrorApi({
        error,
        setError,
      });
    } finally {
        onClose();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <InputText<ProfileFormType>
          name="firstName"
          label="Tên"
          form={form}
          placeholder="Nhập Tên"
        />
        <InputText<ProfileFormType> name="lastName" label="Họ" form={form} placeholder="Nhập Họ" />
        <DialogFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Lưu
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
