import { Suspense } from 'react';
import { orderApiRequest } from '@/apiRequests';

import OrderDetailComponent from '@/components/order/order-detail';
import LoadingPageServer from '@/components/common/loading-server';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const res = await orderApiRequest.getOrderById(id);
  console.log('get order by id', res);

  return (
    <Suspense fallback={<LoadingPageServer />}>
      <OrderDetailComponent />
    </Suspense>
  );
};
