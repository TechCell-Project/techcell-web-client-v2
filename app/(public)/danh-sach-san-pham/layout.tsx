import { Metadata } from 'next/types';

export const metadata: Metadata = {
  title: 'Cửa hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="w-full h-full bg-slate-100">{children}</div>;
}
