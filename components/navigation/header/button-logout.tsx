'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { authApiRequest } from '@/apiRequests';
import { Button } from '@/components/ui/button';
import { handleErrorApi } from '@/lib/utils';

import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const pathname = usePathname();
  const { push } = useRouter();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutFromNextClientToNextServer();
      push(pathname);
    } catch (error) {
      const errorResponse = handleErrorApi({
        error,
      });
      console.log(errorResponse);
    }
  };
  return (
    <Button variant="ghost" className="gap-4 p-0 m-0 h-auto !hover:bg-none" onClick={handleLogout}>
      <LogOut className="mr-2 h-5 w-5" />
      <span>Đăng xuất</span>
    </Button>
  );
}
