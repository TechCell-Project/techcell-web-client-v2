import LoadingPage from '@/app/loading';
import OrderPreview from '@/components/order/order-preview';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { authApiRequest } from '@/apiRequests';

export default async function Order() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = await authApiRequest.getMe(sessionToken?.value ?? '');
  return (
    <Suspense fallback={<LoadingPage />}>
        <OrderPreview profile={user.payload}/>
    </Suspense>
  );
};


