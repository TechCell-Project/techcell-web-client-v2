'use client';

import React, { useState } from 'react';
import { CardWrapper } from './card-wrapper';
import { RegisterFormType, RegisterSchema } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { InputText } from '@/components/common/form/input-text';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import { useForm } from 'react-hook-form';
import { InputPassword } from '../common/form/input-password';
import { RootPath } from '@/constants';

export const RegisterForm = () => {
  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
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

  console.log(isSubmitting);

  async function onSubmit(values: RegisterFormType) {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
              inputAttributes={{
                placeholder: 'Nhập tên',
              }}
            />
            <InputText<RegisterFormType>
              name="lastName"
              label="Họ"
              form={form}
              inputAttributes={{
                placeholder: 'Nhập họ',
              }}
            />
          </div>

          <InputText<RegisterFormType>
            name="email"
            label="Email"
            form={form}
            inputAttributes={{
              placeholder: 'Nhập email',
            }}
          />

          <InputText<RegisterFormType>
            name="userName"
            label="Tên người dùng"
            form={form}
            inputAttributes={{
              placeholder: 'Nhập tên người dùng',
            }}
          />

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
