import React, { Suspense } from 'react';
import { cookies } from 'next/headers';

import { authApiRequest } from '@/apiRequests';
import Profile from '@/components/profile/profile';
import LoadingPage from '@/app/loading';

export default async function ProfilePage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = await authApiRequest.getMe(sessionToken?.value ?? '');

  return (
    <Suspense fallback={<LoadingPage />}>
      <Profile profile={user.payload} />
    </Suspense>
  );
}