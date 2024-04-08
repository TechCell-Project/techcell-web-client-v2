"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { RootPath } from '@/constants';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({ children, mode = 'redirect', asChild }: LoginButtonProps) => {
  const { push } = useRouter();

  const onClick = () => {
    push(RootPath.Login);
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
