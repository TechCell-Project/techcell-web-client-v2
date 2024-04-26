import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { cartApiRequest } from '@/apiRequests/cart';

import LoadingPageServer from '@/components/common/loading-server';
import CartPage from '@/components/cart/cart-page';
import { Breadcrumb, BreadcrumbProps } from '@/components/common/breadcrumbs';
import CartEmpty from '@/components/cart/cart-empty';
import NotFoundPage from '@/components/common/not-found';

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

  if (!sessionToken) {
    return (
      <NotFoundPage
        description="Phiên đăng nhập không khả dụng"
        redirect="/"
        redirectTitle="Đăng nhập lại"
      />
    );
  }

  const userCart = await cartApiRequest.getCarts(sessionToken.value ?? '');

  if (
    userCart.status !== 200 ||
    userCart.payload.products === undefined ||
    userCart.payload.products.length === 0
  ) {
    return (
      <div className="px-5 sm:container sm:max-w-[640px] lg:max-w-[768px]">
        <CartEmpty />
      </div>
    );
  }

  console.log(userCart);

  return (
    <>
      <Breadcrumb links={cartPageLocation.links} />
      <Suspense fallback={<LoadingPageServer />}>
        <CartPage cartProducts={userCart.payload.products} />
      </Suspense>
    </>
  );
}
