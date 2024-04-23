import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import { BrandScrolling } from '@/components/brands/brandscrolling';
import { Breadcrumb, BreadcrumbProps } from '@/components/common/breadcrumbs';
import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import LoadingPageServer from '@/components/common/loading-server';
import { NormalCard } from '@/components/common/product-card/normal-card';

import { VALID_GET_PRODUCTS_PARAMS } from '@/constants';
import { filterSearchParams, findKeyword } from '@/lib/utils';

import { ProductsApiProductsControllerGetProductsRequest } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests/product';
import { PaginationBar } from '@/components/common/pagination/pagination-bar';
import SearchingResult from '@/components/products/result-search';

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

const productsPageLocation: BreadcrumbProps = {
  links: [
    {
      title: 'Sản phẩm',
      link: '',
    },
  ],
};

export default async function ProductsPage({ searchParams }: Readonly<Props>) {
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
    <div className="w-full h-fit pb-5 sm:pb-8">
      <Breadcrumb links={productsPageLocation.links} />
      <MaxWidthWrapper className="my-6 space-y-6">
        {isFilterWithKeyword ? (
          <SearchingResult
            isFound={res[0].payload.data.length > 0}
            keyword={JSON.parse(searchParams?.filters as string).keyword}
          />
        ) : (
          <BrandScrolling />
        )}
        <Suspense fallback={<LoadingPageServer />}>
          <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {res[0].payload.data.map((product) => (
              <NormalCard key={product.id} product={product} />
            ))}
          </div>
          <PaginationBar hasNextPage={res[0].payload.hasNextPage} />
          <div className="w-full flex flex-col !mt-14 gap-6">
            <h3 className="text-2xl font-bold text-center">
              {isFilterWithKeyword ? 'Sản phẩm tương tự' : 'Sản phẩm đặc sắc'}
            </h3>
            <div className="w-full flex flex-col items-center sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {res[1].payload.data.map((product) => (
                <NormalCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </Suspense>
      </MaxWidthWrapper>
    </div>
  );
}
