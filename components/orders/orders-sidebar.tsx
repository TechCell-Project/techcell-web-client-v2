'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';

import { ORDER_STATUSES, STATUS_PROCESSING } from '@/constants/payment';
import { cn } from '@/lib/utils';

interface OrderListSidebarProps {
  status: string;
}

export const OrderListSidebar = ({ status }: OrderListSidebarProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClick = (newStatus: string) => {
    if (newStatus === status) return;
    const params = new URLSearchParams(searchParams);
    params.set('status', newStatus);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full h-fit bg-white rounded-md sm:flex flex-col py-5 hidden sm:sticky top-5 text-base font-semibold">
      <h3 className="text-xl font-bold text-primary text-center my-4">Đơn hàng</h3>
      {Array.from(ORDER_STATUSES.values()).map((item) => (
        <button
          key={item.key}
          type='button'
          className={cn(
            'flex justify-start items-center h-9 px-5 hover:bg-gray-200',
            item.key === status && 'bg-primary text-white hover:bg-primary-dark',
          )}
          onClick={() => handleClick(item.key)}
        >
          <h4>{item.key !== STATUS_PROCESSING ? item.label : 'Đang xử lý'}</h4>
        </button>
      ))}
    </div>
  );
};
