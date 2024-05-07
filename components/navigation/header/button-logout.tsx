'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { authApiRequest } from '@/apiRequests';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';

import { LogOut } from 'lucide-react';
import { RootPath } from '@/constants';
import { useAppContext } from '@/providers/app-provider';

export default function LogoutButton() {
  const pathname = usePathname();
  const { push, refresh } = useRouter();
  const { setUser } = useAppContext();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      push(pathname);
    } catch (error) {
      const errorResponse = handleErrorApi({
        error,
      });
      console.log(errorResponse);
      authApiRequest.logoutFromNextClientToNextServer(true).then((res) => {
        push(`${RootPath.Login}=${pathname}`);
      });
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('accessTokenExpires');
      refresh();
    }
  };
  return (
    <Button
      variant="ghost"
      className="gap-4 px-0 py-2 m-0 h-auto !hover:bg-none w-full justify-start"
      onClick={handleLogout}
    >
      <LogOut className="mr-2 h-5 w-5" />
      <span>Đăng xuất</span>
    </Button>
  );
}
