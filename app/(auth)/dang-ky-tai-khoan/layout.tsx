import React from 'react';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Đăng Ký - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default async function LoginLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-full h-full flex flex-col items-center justify-center">{children}</div>;
}
