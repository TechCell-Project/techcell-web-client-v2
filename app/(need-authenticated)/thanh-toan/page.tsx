'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import useUpdateEffect from 'ahooks/lib/useUpdateEffect';

import { RootPath } from '@/constants';
import { orderApiRequest } from '@/apiRequests';
import LoadingPage from '@/app/loading';
import {
  PreviewOrderDtoPaymentMethodEnum,
  PreviewOrderResponseDto,
  ProductInOrderDto,
} from '@techcell/node-sdk';

import NotFoundPage from '@/components/common/not-found';
import { toast } from '@/components/ui/use-toast';
import OrderPreview from '@/components/order/order-preview';
import { Breadcrumb, BreadcrumbProps } from '@/components/common/breadcrumbs';
import { useOrderPreviewStore } from '@/providers/order-preview-store-provider';

const paymentPageLocation: BreadcrumbProps = {
  links: [
    {
      title: 'Thanh Toán',
      link: '',
    },
  ],
};

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export default function Order() {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewProducts, setPreviewProducts] = useState<ProductInOrderDto[]>([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState<number | null>(null);
  const [previewOrderData, setPreviewOrderData] = useState<PreviewOrderResponseDto | null>(null);

  const { previewData } = useOrderPreviewStore((state) => state);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const saveSkuIds = searchParams.get('buy-now')
  //       ? localStorage.getItem('selected-buy-now')
  //       : localStorage.getItem('selected-sku');

  //     if (!saveSkuIds) {
  //       push(RootPath.Cart);
  //       return;
  //     }

  //     const querryArray = saveSkuIds.split('/');
  //     const products = querryArray[0].split(',').map((product) => {
  //       const data = product.split('-');
  //       return {
  //         skuId: data[0],
  //         quantity: parseInt(data[1]),
  //       };
  //     });
  //     setPreviewProducts(products);
  //     setDefaultAddressIndex(parseInt(querryArray[1]));
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchParams]);

  // useUpdateEffect(() => {
  //   const previewOrder = async (products: ProductInOrderDto[], addressIndex: number) => {
  //     setIsLoading(true);
  //     try {
  //       const { payload } = await orderApiRequest.previewOrder({
  //         products,
  //         addressIndex,
  //         paymentMethod: PreviewOrderDtoPaymentMethodEnum.Cod,
  //       });

  //       setPreviewOrderData(payload);
  //     } catch (error) {
  //       toast({
  //         variant: 'destructive',
  //         title: 'Khởi tạo đơn hàng thất bại',
  //       });
  //       push(RootPath.Cart);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (previewProducts.length > 0 && defaultAddressIndex !== null) {
  //     previewOrder(previewProducts, defaultAddressIndex);
  //   }
  // }, [previewProducts, defaultAddressIndex]);

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  if (!previewData) {
    return (
      <NotFoundPage
        description="Khởi tạo đơn hàng thất bại"
        redirectTitle="Quay lại"
        redirect={RootPath.Cart}
      />
    );
  }

  console.log('previewData', previewData);

  return (
    <Suspense>
      <div className="space-y-5">
        <Breadcrumb links={paymentPageLocation.links} />
        <OrderPreview previewData={previewData} />
        <div className="h-1"></div>
      </div>
    </Suspense>
  );
}
