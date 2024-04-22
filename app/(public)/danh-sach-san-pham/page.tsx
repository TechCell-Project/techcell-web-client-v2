
import { Suspense } from 'react';

import { BrandScrolling } from '@/components/brands/brandscrolling';
import { Breadcrumb, BreadcrumbProps } from '@/components/common/breadcrumbs';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import LoadingPageServer from '@/components/common/loading-server';
import { NormalCard } from '@/components/common/product-card/normal-card';

import { VALID_GET_PRODUCTS_PARAMS } from '@/constants';
import { filterSearchParams } from '@/lib/utils';

import { ProductsApiProductsControllerGetProductsRequest } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';

const productsPageLocation: BreadcrumbProps = {
  links: [
    {
      title: 'Sản phẩm',
      link: '',
    },
  ],
};

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams?.page ?? '1';

  const payload = {
    page: Number.parseInt(page) - 1,
    ...(searchParams && filterSearchParams(searchParams, VALID_GET_PRODUCTS_PARAMS)),
  } as ProductsApiProductsControllerGetProductsRequest;

  const res = await productApiRequest.getProducts(payload);

  console.log(res.payload.data);
  return (
    <div className="w-full">
      <Breadcrumb links={productsPageLocation.links} />
      <MaxWidthWrapper className="py-5">
        <BrandScrolling />
        <Suspense fallback={<LoadingPageServer />}>
            <div className='w-full py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {res.payload.data.map((product) => (
                <NormalCard key={product.id} product={product} />
              ))}
            </div>
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
}
