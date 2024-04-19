'use client';

import React from 'react';

import { CardWrapper } from './card-wrapper';
import { RegisterFormType, RegisterSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { InputText } from '@/components/common/form/input-text';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { InputPassword } from '@/components/common/form/input-password';
import { toast } from '@/components/ui/use-toast';

import { useForm } from 'react-hook-form';

import { CASE_AUTH_REGISTER, RootPath } from '@/constants';
import { getErrorMsg, handleErrorApi } from '@/lib/utils';
import { authApiRequest } from '@/apiRequests';
import { useRouter } from 'next/navigation';

export const RegisterForm = () => {
  const { push } = useRouter();

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      // userName: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    setError
  } = form;

  async function onSubmit(values: RegisterFormType) {
    try {
      await authApiRequest.registerEmail({
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
      });
      
      toast({
        variant: 'success',
        title: 'Tạo tài khoản thành công. Kiểm tra email để hoàn thành đăng ký.',
      });
      push(RootPath.Login);
    } catch (error) {
      const errorResponse = handleErrorApi({
        error,
        setError,
      });
      toast({
        variant: 'destructive',
        title: 'Đăng nhập thất bại',
        description: getErrorMsg(errorResponse.status, CASE_AUTH_REGISTER),
      })
    }
  }

  return (
    <CardWrapper
      headerLabel="Đăng ký"
      backButtonLabel="Đã có tài khoản? Đăng nhập"
      backButtonHref={RootPath.Login}
      showSocial
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-[10px]">
          <div className="grid grid-cols-2 gap-4">
            <InputText<RegisterFormType>
              name="firstName"
              label="Tên"
              form={form}
              placeholder='Nhập tên'
            />

            <InputText<RegisterFormType>
              name="lastName"
              label="Họ"
              form={form}
              placeholder='Nhập họ'
            />
          </div>

          <InputText<RegisterFormType>
            name="email"
            label="Email"
            form={form}
            placeholder='Nhập Email'
          />

          {/* <InputText<RegisterFormType>
            name="userName"
            label="Tên người dùng"
            form={form}
            inputAttributes={{
              placeholder: 'Nhập tên người dùng',
            }}
          /> */}

          <InputPassword<RegisterFormType>
            name="password"
            label="Mật khẩu"
            form={form}
            placeholder="Nhập mật khẩu"
            disablePasswordEye={form.watch('password').length === 0}
          />

          <InputPassword<RegisterFormType>
            name="confirmPassword"
            label="Nhập lại Mật khẩu"
            form={form}
            placeholder="Xác nhận mật khẩu"
            disablePasswordEye={form.watch('password').length === 0}
          />

          <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
            {isSubmitting && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Đăng ký
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
