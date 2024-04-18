import React from 'react';

import { NewPasswordForm } from '@/components/auth/new-password-form';
import NotFoundPage from '@/components/common/not-found';
import { RootPath } from '@/constants/enum';

export default function ForgotPasswordPage({
  searchParams,
}: Readonly<{ searchParams: { hash?: string } }>) {
  console.log(searchParams.hash);

  if (!searchParams.hash)
    return (
      <NotFoundPage
        description="Trang không tồn tại"
        redirectTitle="Đăng nhập"
        redirect={RootPath.Login}
      />
    );
    
  return <NewPasswordForm hash={searchParams.hash} />;
}
