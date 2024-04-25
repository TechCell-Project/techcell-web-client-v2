import { cartApiRequest } from '@/apiRequests/cart';
import LoadingPage from '@/app/loading';
import CartPage from '@/components/cart/cart-page';
import { cookies } from 'next/headers';
import { Suspense } from 'react';

export default async function Cart() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const { payload } = await cartApiRequest.getCartsWithToken(sessionToken?.value ?? '');

  return (
    <Suspense fallback={<LoadingPage />}>
      <CartPage cart={payload} />
    </Suspense>
  );
}
