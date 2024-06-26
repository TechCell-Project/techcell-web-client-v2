import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Quên mật khẩu - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function NewPasswordLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="w-full h-auto bg-login bg-repeat bg-cover p-6 sm:p-10">
      <div className="w-full h-fit flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}
