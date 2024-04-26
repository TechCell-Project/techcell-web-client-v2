'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authApiRequest } from '@/apiRequests/auth';
import LoadingPage from '@/app/loading';
import { clientSessionToken } from '@/lib/http';
import { RootPath } from '@/constants';
import NotFoundPage from '@/components/common/not-found';

export default function Logout() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get('sessionToken');
  console.log(sessionToken);

  if (!sessionToken) {
    push(RootPath.Home);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const controller = new AbortController();
      const signal = controller.signal;
      if (sessionToken === clientSessionToken.accessValue) {
        authApiRequest.logoutFromNextClientToNextServer(true, signal).then(() => {
          push(RootPath.Login);
        });
      }
      return () => {
        controller.abort();
      };
    }
  }, [sessionToken, push]);
  
  if (sessionToken !== clientSessionToken.accessValue) {
    return (
      <NotFoundPage
        description="Trang không khả dụng"
        redirectTitle="Trang chủ"
        redirect={RootPath.Home}
      />
    );
  }

  return <LoadingPage />;
}
