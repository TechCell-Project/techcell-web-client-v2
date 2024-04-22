import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Chi tiết sản phẩm - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function DetailProductLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className='w-full h-full bg-slate-100'>{children}</div>;
}