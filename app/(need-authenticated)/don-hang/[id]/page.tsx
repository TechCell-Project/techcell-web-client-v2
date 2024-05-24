import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { orderApiRequest } from '@/apiRequests';

import LoadingPageServer from '@/components/common/loading-server';
import { OrderDetail } from '@/components/order/order-detail';
import NotFoundPage from '@/components/common/not-found';

export default async function Page({ params: { id } }: Readonly<{ params: { id: string } }>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  if (!accessToken) {
    return (
      <NotFoundPage
        description="Phiên đăng nhập không khả dụng"
        redirect="/"
        redirectTitle="Đăng nhập lại"
      />
    );
  }

  const res = await orderApiRequest.getOrderByIdServer(id, accessToken.value);

  // console.log(res.payload);

  return (
    <Suspense fallback={<LoadingPageServer />}>
      <OrderDetail order={res.payload} />
    </Suspense>
  );
}
