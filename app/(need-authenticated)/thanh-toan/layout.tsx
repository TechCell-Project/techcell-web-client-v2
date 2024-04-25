import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Đơn hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function OrderLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className='w-full h-full bg-slate-100'>{children}</div>;
}