import { Metadata } from 'next/types';

export const metadata: Metadata = {
    title: 'Hồ sơ - TechCell - Điện thoại, phụ kiện chính hãng',
};

export default function ProfileLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return <div className='w-full h-full py-5'>{children}</div>;
}