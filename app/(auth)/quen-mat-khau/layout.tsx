import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Quên mật khẩu - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function ForgotPasswordLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-auto bg-login bg-repeat bg-cover p-6 sm:p-10">
      <div className="w-full sm:w-1/2 mr-auto sm:ml-auto sm:mr-0 h-fit py-auto flex flex-col items-center">
        <div className="w-full h-fit flex flex-col items-center justify-center">{children}</div>
      </div>
    </div>
  );
}
