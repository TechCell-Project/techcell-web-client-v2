import OrderListProduct from '@/components/order/order-list-product';
import SidebarOrder from '@/components/order/sidebar-order';
import { NAV_ORDER } from '@/constants';
import Link from 'next/link';
import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: {
    template: 'Cửa hàng - TechCell - Điện thoại, phụ kiện chính hãng',
    default: 'Cửa hàng - TechCell - Điện thoại, phụ kiện chính hãng',
  },
};

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='w-full container'>
      <div className="h-16"></div>
      <SidebarOrder />
      <div>{children}</div>
    </div>
  );
};
