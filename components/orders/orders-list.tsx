import { OrderInfinityPaginationResult } from '@techcell/node-sdk';
import { OrderCard } from './order-card';
import { PaginationBar } from '../common/pagination/pagination-bar';

interface OrderListProps {
  data: OrderInfinityPaginationResult;
}

export const OrdersList = ({ data }: OrderListProps) => {
  const { data: orders, hasNextPage } = data;

  return (
    <>
      {(orders === undefined || orders.length === 0) ? (
        <div className="flex flex-col w-full h-full items-center">
          <p className="text-gray-700 text-base sm:text-lg">Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
          <div className="my-5">
            <PaginationBar hasNextPage={hasNextPage} />
          </div>
        </div>
      )}
    </>
  );
};
