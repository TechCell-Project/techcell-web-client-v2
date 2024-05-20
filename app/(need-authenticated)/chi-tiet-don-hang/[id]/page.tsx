import LoadingPage from '@/app/loading';
import OrderDetailComponent from '@/components/order/order-detail';
import OrderPreview from '@/components/order/order-preview';
import { Suspense } from 'react';

const OrderDetail = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      {/* <OrderPreview /> */}
      <OrderDetailComponent />
    </Suspense>
  );
};

export default OrderDetail;
