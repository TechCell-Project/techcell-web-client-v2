import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

import { authApiRequest } from '@/apiRequests';
import Profile from '@/components/profile/profile';
import LoadingPageServer from '@/components/common/loading-server';

export default async function ProfilePage() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const user = await authApiRequest.getMe(accessToken?.value ?? '');

  console.log('have access token', Boolean(accessToken));
  console.log(user);

  return (
    <Suspense fallback={<LoadingPageServer />}>
      <Profile profile={user.payload} />
    </Suspense>
  );
}
