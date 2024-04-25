import { Suspense } from 'react';
import { Metadata, ResolvingMetadata } from 'next';

import { productApiRequest } from '@/apiRequests/product';
import { getErrorMsg } from '@/lib/utils';
import { CASE_PRODUCT_FETCH, FILTERS_BRANDS, FILTERS_PARAM, INVALID, RootPath } from '@/constants';

import NotFound from '@/components/common/not-found';
import LoadingPage from '@/app/loading';
import ProductDetailSection from '@/components/product/product-detail';
import { Breadcrumb, BreadcrumbProps } from '@/components/common/breadcrumbs';
import LoadingPageServer from '@/components/common/loading-server';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const productResponse = await productApiRequest.getProductById({ productId: id });

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: productResponse.payload.productName + ' - TechCell - Điện thoại, phụ kiện chính hãng',
    openGraph: {
      images: ['/public/phone-test/15-pro.jpg', ...previousImages],
    },
  };
}

export default async function SecProductDetailSection({ params }: Readonly<Props>) {
  const response = await productApiRequest.getProductById({ productId: params.id });

  if (response.status === INVALID) {
    return (
      <NotFound
        description={getErrorMsg(response.status, CASE_PRODUCT_FETCH)}
        redirectTitle="Xem danh sách sản phẩm"
        redirect={RootPath.ProductList}
      />
    );
  }

  const productDetailPageLocation: BreadcrumbProps = {
    links: [
      {
        title: 'Apple',
        link: `${RootPath.ProductList}?${FILTERS_PARAM}=${JSON.stringify({
          [FILTERS_BRANDS]: ['661681dde3e5984cfc2c28cc'],
        })}`,
      },
      {
        title: response.payload.productName,
        link: '',
      },
    ],
  };

  return (
    <div className="w-full space-y-2.5 sm:space-y-5">
      <Breadcrumb links={productDetailPageLocation.links} />
      <Suspense fallback={<LoadingPageServer />}>
        <ProductDetailSection detail={response.payload} />
      </Suspense>
    </div>
  );
}
