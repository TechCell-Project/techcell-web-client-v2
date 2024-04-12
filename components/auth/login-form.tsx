'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { LoginFormType, LoginSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/common/form/input-text';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { InputPassword } from '../common/form/input-password';
import { RootPath } from '@/constants';
import { authApiRequest } from '@/apiRequests';
import { handleErrorApi } from '@/lib/utils';

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
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
    control,
    getValues,
    setValue,
    trigger,
  } = form;

  async function onSubmit(values: LoginFormType) {
    try {
      const res = await authApiRequest.loginEmail(values);

      await authApiRequest.auth({
        sessionToken: res.payload.accessToken,
        expiresAt: res.payload.accessTokenExpires,
      });

      toast({
        variant: 'success',
        title: 'Đăng nhập thành công',
      });
      router.push(callbackUrl || RootPath.Home);
      router.refresh();
    } catch (error) {
      handleErrorApi({
        error,
        setError: form.setError,
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
            disablePasswordEye={form.watch('password').length === 0}
          />

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Đăng nhập
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
