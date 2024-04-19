'use client';

import { usePathname, useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePassFormType, UpdatePasswordSchema } from '@/validationSchemas';

import { Form } from '@/components/ui/form';
import { FakeInputPassword, InputPassword } from '@/components/common/form/input-password';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';

import { cn, getErrorMsg, handleErrorApi } from '@/lib/utils';
import { authApiRequest } from '@/apiRequests';
import { CASE_DEFAULT } from '@/constants/error';

interface PasswordFormProps {
  editable: boolean;
  discardEdit: () => void;
}

export function UpdatePassword({ editable, discardEdit }: Readonly<PasswordFormProps>) {
    const pathname = usePathname();
    const { push } = useRouter();

  const form = useForm<UpdatePassFormType>({
    mode: 'onChange',
    resolver: zodResolver(UpdatePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
    reset,
    setError,
  } = form;

  const onSubmit = async (values: UpdatePassFormType) => {
    if (isSubmitting) return;
    try {
      await authApiRequest.updateMe({
        oldPassword: values.oldPassword,
        password: values.newPassword,
      });

      toast({
        variant: 'success',
        title: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại',
      });

      await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));

      await authApiRequest.logoutFromNextClientToNextServer();
      push(pathname);
    } catch (error) {
      console.log(error);
      const errorResponse = handleErrorApi({
        error,
        setError,
      });
      toast({
        variant: 'destructive',
        title: 'Đổi mật khẩu thất bại',
        description: getErrorMsg(errorResponse.status, CASE_DEFAULT),
      });
    }
  };

  const handleCloseEdit = () => {
    reset();
    discardEdit();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        {!editable ? (
          <FakeInputPassword />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputPassword<UpdatePassFormType>
              name="oldPassword"
              label="Mật khẩu hiện tại"
              placeholder="Nhập mật khẩu hiện tại"
              form={form}
              disabled={isSubmitting}
              disablePasswordEye={watch('oldPassword').length === 0}
            />

            <InputPassword<UpdatePassFormType>
              name="newPassword"
              label="Mật khẩu"
              form={form}
              placeholder="Nhập mật khẩu"
              disabled={isSubmitting}
              disablePasswordEye={form.watch('newPassword').length === 0}
            />

            <InputPassword<UpdatePassFormType>
              name="confirmNewPassword"
              label="Nhập lại Mật khẩu"
              form={form}
              placeholder="Xác nhận mật khẩu"
              disabled={isSubmitting}
              disablePasswordEye={form.watch('newPassword').length === 0}
            />

            <div className={cn('justify-end items-center gap-4', editable ? 'flex' : 'hidden')}>
              <Button type="button" variant="secondary" onClick={handleCloseEdit}>
                Hủy
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                Thay đổi
              </Button>
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}
