'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { brandApiRequest } from '@/apiRequests/brand';
import { Button } from '@/components/ui/button';
import { Brand } from '@techcell/node-sdk';

const BrandPage = () => {
  const [brands, setBrands] = useState<Brand[]>([]);

  const fetchData = async () => {
    try {
      const res = await brandApiRequest.getListBrand();
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
      <div className="text-[18px] sm:text-[25px] font-bold uppercase">Thương hiệu</div>
      <div className="hidden sm:flex gap-7 ">
        {brands.slice(0, 10).map((brand) => (
          <div key={brand.slug} className="flex flex-row">
            <Link href={'/'}>
              <Button size="default">{brand.name}</Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-[14px] sm:text-[20px] font-semibold underline">
        <Link href={''}>Xem tất cả</Link>
      </div>
    </div>
  );
};

export default BrandPage;
