'use client';

import { PHONE_TEST } from '@/constants/phone-test';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { currencyFormat, calculateSaleOffPercentage } from '@/utilities/func.util';
import Link from 'next/link';
import { Metadata, ResolvingMetadata } from 'next';
import { filterSearchParams, findKeyword } from '@/lib/utils';
import { ProductsApiProductsControllerGetProductsRequest } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';
import { VALID_GET_PRODUCTS_PARAMS } from '@/constants';
import { NormalCard } from '../common/product-card/normal-card';

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const isFilterWithKeyword = searchParams?.filters?.includes('keyword');

  const generatedTitle = isFilterWithKeyword
    ? `${JSON.parse(searchParams?.filters as string).keyword} - Kết quả`
    : 'Tìm kiếm';

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: generatedTitle,
    openGraph: {
      images: ['/public/phone-test/15-pro.jpg', ...previousImages],
    },
  };
}

export const ListProduct = async ({ searchParams }: Readonly<Props>) => {
  const page = searchParams?.page ?? '1';

  const isFilterWithKeyword = searchParams?.filters?.includes('keyword');

  const payload = {
    page: Number.parseInt(page) - 1,
    ...(searchParams && filterSearchParams(searchParams, VALID_GET_PRODUCTS_PARAMS)),
  } as ProductsApiProductsControllerGetProductsRequest;

  const relevantKeyword = isFilterWithKeyword
    ? findKeyword(JSON.parse(searchParams?.filters as string).keyword)
    : null;

  const promises = [
    productApiRequest.getProducts(payload),
    productApiRequest.getProducts({
      limit: 4,
      filters: JSON.stringify(
        relevantKeyword ? { keyword: relevantKeyword } : { tagIds: ['661b7c09128dfd9b6b3e19da'] },
      ),
    }),
  ];

  const res = await Promise.all(promises);

  return (
    <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-10">
      {res[0].payload.data.map((product) => (
        <NormalCard key={product.id} product={product} />
      ))}
    </div>
  );
};


