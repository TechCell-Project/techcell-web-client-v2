import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

import { authApiRequest } from '@/apiRequests';
import { RootPath, SUCCESS } from '@/constants';

import NotFoundPage from '@/components/common/not-found';
import Profile from '@/components/profile/profile';
import LoadingPage from '@/app/loading';


export default async function ProfilePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = await authApiRequest.getMe(sessionToken?.value ?? '');

  // if (user.status !== SUCCESS)
  //   return (
  //     <NotFoundPage
  //       description="Không có quyền truy cập"
  //       redirectTitle="Đăng nhập"
  //       redirect={RootPath.Login}
  //     />
  //   );

  return (
    <Suspense fallback={<LoadingPage />}>
      <Profile profile={user.payload} />
    </Suspense>
  );
}
