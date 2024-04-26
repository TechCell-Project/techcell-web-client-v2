import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { brandApiRequest } from '@/apiRequests/brand';
import { Button } from '@/components/ui/button';
import { BRANDS_MAP, BrandLabel, FILTERS_BRANDS, FILTERS_PARAM, RootPath } from '@/constants';

const BrandHomePage = () => {
  const [brandList, setBrandList] = useState<BrandLabel[]>([]);

  useEffect(() => {
    const fetchBrandList = async () => {
      try {
        const res = await brandApiRequest.getListBrand();
        const filteredBrandList = res.payload.data
          .map(brand => BRANDS_MAP.get(brand.slug))
          .filter(brand => brand !== undefined) as BrandLabel[];
        setBrandList(filteredBrandList);
      } catch (error) {
        console.error('Error fetching brand list:', error);
      }
    };

    fetchBrandList();
  }, []);

  return (
    <div className="my-[40px] flex flex-row justify-between items-center">
      <div className="text-[16px] sm:text-[25px] font-bold uppercase">Thương hiệu</div>
      <div className='hidden sm:flex gap-7 '>
        {brandList.slice(0, 10).map((brand) => (
          <div key={brand.key} className="flex flex-row">
            <Link href={`${RootPath.ProductList}?${FILTERS_PARAM}=${JSON.stringify({
              [FILTERS_BRANDS]: [`${brand.brandIds}`],
            })}`}>
              <Button size="default">{brand.label}</Button>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-[14px] sm:text-[20px] font-semibold underline">
        <Link href={RootPath.ProductList}>Xem tất cả</Link>
      </div>
    </div>
  );
};

export default BrandHomePage;
