import LoadingPage from '@/app/loading';
import OrderPreview from '@/components/order/order-preview';
import { Suspense } from 'react';

const OrderDetail = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
        {/* <OrderPreview /> */}
    </Suspense>
  );
};

export default OrderDetail;
