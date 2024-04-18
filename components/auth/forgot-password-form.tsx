'use client';

import { CardWrapper } from '@/components/auth/card-wrapper';
import { InputText } from '@/components/common/form/input-text';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';

import { CASE_AUTH_FORGOT_PASSWORD, RootPath } from '@/constants';

import { ForgotPassFormType, ForgotPasswordSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { getErrorMsg, handleErrorApi } from '@/lib/utils';
import { authApiRequest } from '@/apiRequests/auth';

export const ForgotPasswordForm = () => {
  const form = useForm<ForgotPassFormType>({
    mode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setError,
  } = form;

  const onSubmit = async (values: ForgotPassFormType) => {
    if (isSubmitting) return;
    try {
      await authApiRequest.forgotPassword({
        email: values.email,
        returnUrl: window.location.host + RootPath.ChangePassword,
      });

      toast({
        variant: 'success',
        title: 'Gửi yêu cầu thành công',
        description: 'Hãy kiểm tra email của bạn',
      });
    } catch (error) {
      const errorResponse = handleErrorApi({
        error,
        setError,
      });
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
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
          <InputText<ForgotPassFormType>
            name="email"
            label="Email"
            form={form}
            placeholder="Nhập email"
            disabled={isSubmitting}
          />

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Gửi yêu cầu
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
