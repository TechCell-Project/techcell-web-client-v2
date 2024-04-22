'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { CardWrapper } from './card-wrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/common/form/input-text';
import { InputPassword } from '@/components/common/form/input-password';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useToast } from '@/components/ui/use-toast';

import { useForm } from 'react-hook-form';

import { authApiRequest } from '@/apiRequests';
import { LoginFormType, LoginSchema } from '@/validationSchemas';
import { CASE_AUTH_CONFIRM_EMAIL, CASE_AUTH_LOGIN, RootPath } from '@/constants';
import { getErrorMsg, handleErrorApi } from '@/lib/utils';

export const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const confirmEmail = searchParams.get('confirmEmail');
  const statusCode = searchParams.get('error');

  useEffect(() => {
    if (confirmEmail === 'success') {
      toast({
        variant: 'success',
        title: 'Xác nhận Email thành công',
        description: 'Chào mừng bạn đến với Techcell',
      });
    }

    if (statusCode) {
      toast({
        variant: 'destructive',
        title: 'Xác nhận email thất bại',
        description: getErrorMsg(parseInt(statusCode), CASE_AUTH_CONFIRM_EMAIL),
      });
    }
  }, []);

  const callbackUrl = searchParams.get('callbackUrl');

  console.log(callbackUrl);

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setError,
    watch,
  } = form;
  
  async function onSubmit(values: LoginFormType) {
    try {
      const res = await authApiRequest.loginEmail(values);

      await authApiRequest.auth({
        sessionToken: res.payload.accessToken,
        refreshToken: res.payload.refreshToken,
        expiresAt: res.payload.accessTokenExpires,
      });
      
      toast({
        variant: 'success',
        title: 'Đăng nhập thành công',
      });
      router.push(callbackUrl ?? RootPath.Home);
      router.refresh();
    } catch (error) {
      const errorResponse = handleErrorApi({
        error,
        setError,
      });
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: getErrorMsg(errorResponse.status, CASE_AUTH_LOGIN),
      });
    }
  }

  return (
    <CardWrapper
      headerLabel="Đăng nhập"
      backButtonLabel="Chưa có tài khoản? Đăng ký"
      backButtonHref={RootPath.Register}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText<LoginFormType>
            name="email"
            label="Email"
            form={form}
            placeholder="Nhập email"
          />

          <InputPassword<LoginFormType>
            name="password"
            label="Password"
            form={form}
            placeholder="Nhập mật khẩu"
            disablePasswordEye={watch('password').length === 0}
          />

          <div className="w-full">
            <Link
              href={RootPath.ForgotPassword}
              className="float-right text-sm text-primary hover:underline"
            >
              Quên mật khẩu ?
            </Link>
          </div>

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Đăng nhập
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
