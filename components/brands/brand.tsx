'use client';

import Link from 'next/link';
import { brandApiRequest } from '@/apiRequests/brand';
import { Button } from '@/components/ui/button';
import { BRANDS_MAP, BrandLabel, RootPath } from '@/constants';

const BrandHomePage = async () => {
  const res = await brandApiRequest.getListBrand();

  const brandList = res.payload.data.reduce((acc: BrandLabel[], brand) => {
    const brandWithImg = BRANDS_MAP.get(brand.slug);
    if (brandWithImg) acc.push(brandWithImg);
    return acc;
  }, []);

  return (
    <div className="my-[40px] flex flex-row justify-between items-center">
      <div className="text-[16px] sm:text-[25px] font-bold uppercase">Thương hiệu</div>
      <div className='hidden sm:flex gap-7 '>
        {brandList.slice(0,10).map((brand) => (
          <div key={brand.key} className="flex flex-row">
            <Link href={'/'}>
              <Button size="default">{brand.label}</Button>
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

export default BrandHomePage;
