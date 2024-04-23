import { Metadata } from 'next/types';

export const metadata: Metadata = {
  keywords: ['Iphone', 'Samsung', 'Xiaomi'],
  title: {
    template: 'Cửa hàng - TechCell - Điện thoại, phụ kiện chính hãng',
    default: 'Cửa hàng - TechCell - Điện thoại, phụ kiện chính hãng',
  },
};

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-full">{children}</div>;
}
