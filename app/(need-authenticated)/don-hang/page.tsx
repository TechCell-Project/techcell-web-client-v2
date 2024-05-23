import { Suspense } from 'react';
import { cookies } from 'next/headers';

import { orderApiRequest } from '@/apiRequests';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { OrdersList } from '@/components/orders/orders-list';
import { OrderListSidebar } from '@/components/orders/orders-sidebar';
import { OrderListSkeleton } from '@/components/orders/orders-skeleton';
import { STATUS_ALL, isValidOrderStatus } from '@/constants/payment';
import { OrdersApiOrdersControllerGetOrdersRequest } from '@techcell/node-sdk';
import NotFoundPage from '@/components/common/not-found';
import { RootPath } from '@/constants';

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export default async function OrderDetail({ searchParams }: Readonly<Props>) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  console.log('accessToken', accessToken);

  if (!accessToken) {
    return (
      <NotFoundPage
        description="Phiên đăng nhập không khả dụng"
        redirect={RootPath.Login}
        redirectTitle="Đăng nhập lại"
      />
    );
  }

  let status = searchParams?.status ?? STATUS_ALL;
  const page = searchParams?.page ?? '1';

  if (!isValidOrderStatus(status)) {
    status = STATUS_ALL;
  }

  const payload: OrdersApiOrdersControllerGetOrdersRequest = {
    page: Number.parseInt(page),
    limit: 10,
    filters: status !== STATUS_ALL ? JSON.stringify({ status: [status] }) : undefined,
  };

  const { payload: ordersData } = await orderApiRequest.getOrdersServer(
    payload,
    accessToken.value,
  );

  return (
    <MaxWidthWrapper className="py-5 sm:py-8">
      <div className="grid-orders relative">
        <OrderListSidebar status={status} />
        <Suspense fallback={<OrderListSkeleton />}>
          <OrdersList data={ordersData} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
