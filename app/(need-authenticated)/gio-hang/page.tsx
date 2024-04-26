import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { cartApiRequest } from '@/apiRequests/cart';

import LoadingPageServer from '@/components/common/loading-server';
import CartPage from '@/components/cart/cart-page';
import { Breadcrumb, BreadcrumbProps } from '@/components/common/breadcrumbs';
import CartEmpty from '@/components/cart/cart-empty';

const cartPageLocation: BreadcrumbProps = {
  links: [
    {
      title: 'Giỏ hàng',
      link: '',
    },
  ],
};

export default async function Cart() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const userCart = await cartApiRequest.getCartsWithToken(sessionToken?.value ?? '');

  if (
    userCart.status !== 200 ||
    userCart.payload.products.length === 0 ||
    userCart.payload.products === undefined
  ) {
    return (
      <div className="px-5 sm:container sm:max-w-[640px] lg:max-w-[768px]">
        <CartEmpty />
      </div>
    );
  }

  return (
    <>
      <Breadcrumb links={cartPageLocation.links} />
      <Suspense fallback={<LoadingPageServer />}>
        <CartPage cartProducts={userCart.payload.products} />
      </Suspense>
    </>
  );
}
