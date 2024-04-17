'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { InputText } from '@/components/common/form/input-text';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import ImageUpload from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';

import { ProfileFormType, ProfileSchema } from '@/validationSchemas/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { cn, getErrorMsg, handleErrorApi } from '@/lib/utils';
import { authApiRequest } from '@/apiRequests';
import { CASE_DEFAULT } from '@/constants';
import { AuthUpdateDto, User } from '@techcell/node-sdk';

interface ProfileFormProps {
  initialData: User;
  editable: boolean;
  closeEdit: () => void;
}

export function UpdateProfile({ initialData, editable, closeEdit }: Readonly<ProfileFormProps>) {
  const router = useRouter();

  const form = useForm<ProfileFormType>({
    mode: 'onChange',
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      avatarImageId: initialData.avatar ? initialData.avatar.publicId : undefined,
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    setError,
  } = form;

  async function onSubmit(values: ProfileFormType) {
    if (isSubmitting) return;
    try {
      console.log(values);
      await authApiRequest.updateMe(values);

      toast({
        variant: 'success',
        title: 'Cập nhật hồ sơ thành công',
      });

      closeEdit();
      console.log('go here if refresh!');
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

  const handleCloseEdit = () => {
    setValue('avatarImageId', initialData.avatar?.publicId);
    closeEdit();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="avatarImageId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Ảnh đại diện</FormLabel>
                <FormControl>
                  <div className="flex flex-col items-center gap-2.5">
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={isSubmitting}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange(undefined)}
                      changable={editable}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <InputText<ProfileFormType>
              name="firstName"
              label="Tên"
              form={form}
              placeholder="Nhập Tên"
              isLoading={isSubmitting}
              disabled={!editable}
            />
            <InputText<ProfileFormType>
              name="lastName"
              label="Họ"
              form={form}
              placeholder="Nhập Họ"
              isLoading={isSubmitting}
              disabled={!editable}
            />
          </div>

          <FormItem>
            <FormLabel className="text-base">Email</FormLabel>
            <Input
              value={initialData.email}
              className="text-base focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-100"
              disabled
            />
          </FormItem>
          <div className={cn('justify-end items-center gap-4', editable ? 'flex' : 'hidden')}>
            <Button type="button" variant="secondary" onClick={handleCloseEdit}>
              Hủy
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Lưu
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
