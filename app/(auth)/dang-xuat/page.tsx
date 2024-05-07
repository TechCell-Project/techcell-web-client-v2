'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { authApiRequest } from '@/apiRequests/auth';
import LoadingPage from '@/app/loading';
import { RootPath } from '@/constants';
import NotFoundPage from '@/components/common/not-found';
import { useAppContext } from '@/providers/app-provider';

function LogoutLogic() {
  const pathname = usePathname();
  const { push } = useRouter();
  const { setUser } = useAppContext();

  const searchParams = useSearchParams();
  const sessionToken = searchParams.get('sessionToken');

  useEffect(() => {
    if (!sessionToken) {
      push(RootPath.Home);
    }
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === localStorage.getItem('accessToken')) {
      authApiRequest.logoutFromNextClientToNextServer(true, signal).then((res) => {
        setUser(null);
        push(`${RootPath.Login}?callbackUrl=${pathname}`);
      });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, push, pathname, setUser]);

  if (sessionToken !== localStorage.getItem('accessToken')) {
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

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
}
