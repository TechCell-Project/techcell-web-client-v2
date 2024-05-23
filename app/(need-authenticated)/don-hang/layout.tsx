import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Danh sách đơn hàng - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function OrderListLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className='min-h-[80vh]'>{children}</div>;
}