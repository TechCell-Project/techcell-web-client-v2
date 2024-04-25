import Link from 'next/link';
import Image from 'next/image';

import { brandApiRequest } from '@/apiRequests/brand';
import { BRANDS_MAP, BrandLabel } from '@/constants';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export async function BrandScrolling() {
  const res = await brandApiRequest.getListBrand();

  const brandList = res.payload.data.reduce((acc: BrandLabel[], brand) => {
    const brandWithImg = BRANDS_MAP.get(brand.slug);
    if (brandWithImg) acc.push(brandWithImg);
    return acc;
  }, []);

  return (
    <Suspense fallback={<Skeleton className="h-[34px] w-full" />}>
      <div className="w-full flex flex-row gap-2.5 flex-nowrap whitespace-nowrap overflow-y-hidden overflow-x-scroll sm:flex-wrap sm:items-center sm:justify-center py-10">
        {brandList.map((brand) => (
          <div
            key={brand.key}
            className="bg-white border border-gray-400 h-[34px] flex justify-center rounded-md"
          >
            <Link href="/" className="flex px-1 items-center justify-center">
              <Image
                src={brand.brandImg}
                alt={brand.label}
                height={20}
                width={brand.setWidth ? brand.setWidth : 98}
                style={{ maxWidth: 'none' }}
              />
            </Link>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
