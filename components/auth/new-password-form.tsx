'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { InputText } from '@/components/common/form/input-text';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';

import { CASE_AUTH_FORGOT_PASSWORD, RootPath } from '@/constants';

import { NewPassFormType, NewPasswordSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { getErrorMsg, handleErrorApi } from '@/lib/utils';
import { authApiRequest } from '@/apiRequests/auth';

interface NewPasswordFormProps {
    hash: string;
}

export const NewPasswordForm = ({ hash }: NewPasswordFormProps) => {
  const form = useForm<NewPassFormType>({
    mode: 'onChange',
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = form;

  const onSubmit = async (values: NewPassFormType) => {
    if (isSubmitting) return;
    try {
      await authApiRequest.resetPassword({
        password: values.password,
        hash: hash,
      });

      toast({
        variant: 'success',
        title: 'Đổi mật khẩu thành công',
        description: 'Hãy sử dụng mật khẩu mới để đăng nhập vào tài khoản của bạn',
      });
    } catch (error) {
      const errorResponse = handleErrorApi({
        error,
      });
      toast({
        variant: 'destructive',
        title: 'Đổi mật khẩu thất bại',
        description: getErrorMsg(errorResponse.status, CASE_AUTH_FORGOT_PASSWORD),
      });
    }
  };

  return (
    <CardWrapper
      headerLabel="Quên mật khẩu"
      backButtonLabel="Đăng nhập"
      backButtonHref={RootPath.Login}
      showSocial={false}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText<NewPassFormType>
            name="password"
            label="Mật khẩu mới"
            form={form}
            placeholder="Nhập mật khẩu mới"
            disabled={isSubmitting}
          />

          <InputText<NewPassFormType>
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            form={form}
            placeholder="Nhập lại mật khẩu mới"
            disabled={isSubmitting}
          />

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Đổi mật khẩu
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
