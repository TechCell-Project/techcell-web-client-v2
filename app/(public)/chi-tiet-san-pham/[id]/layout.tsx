import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: {
    template: 'Chi tiết sản phẩm - TechCell - Điện thoại, phụ kiện chính hãng',
    default: 'Chi tiết sản phẩm - TechCell - Điện thoại, phụ kiện chính hãng',
  },
};

export default function DetailProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className='w-full'>{children}</div>;
}