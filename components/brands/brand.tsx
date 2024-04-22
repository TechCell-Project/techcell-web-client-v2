'use client';

import { useEffect, useState } from 'react';
import { brandApi } from '@/apiRequests/brand';
import { Brand } from './models';
import LoadingPage from '@/app/loading';
import Link from 'next/link';
import { Button } from '../ui/button';

const BrandPage = () => {
    const [brands, setBrands] = useState<Brand[]>([]);

    const fetchData = async () => {
        try {
            const res = await brandApi.getListBrands();
            setBrands(res.payload.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-[40px] flex flex-row justify-between items-center">
            <div className="text-[25px] font-bold uppercase">Thương hiệu</div>
            {brands.slice(0, 10).map(brand => (
                <div key={brand._id} className="flex flex-row">
                    <Link href={'/'}>
                        <Button size="default">
                            {brand.name}
                        </Button>
                    </Link>
                </div>
            ))}
            <div className="text-[20px] font-semibold underline">
                <Link href={''}>
                    Xem tất cả
                </Link>
            </div>
        </div>
    );
};

export default BrandPage;
