import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import SidebarOrder from '@/components/order/sidebar-order';
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
      <MaxWidthWrapper>
        <SidebarOrder />
        <div className='mt-6'>{children}</div>
      </MaxWidthWrapper>
    </div>
  );
};
