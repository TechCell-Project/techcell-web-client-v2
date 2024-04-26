'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

const paymentPageLocation: BreadcrumbProps = {
  links: [
    {
      title: 'Thanh Toán',
      link: '',
    },
  ],
};

export default function Order() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [previewProducts, setPreviewProducts] = useState<ProductInOrderDto[]>([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState<number | null>(null);
  const [previewOrderData, setPreviewOrderData] = useState<PreviewOrderResponseDto | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saveSkuIds = localStorage.getItem('selected-sku');
      if (!saveSkuIds) {
        push(RootPath.Cart);
        return;
      }

      const querryArray = saveSkuIds.split('/');
      const products = querryArray[0].split(',').map((product) => {
        const data = product.split('-');
        return {
          skuId: data[0],
          quantity: parseInt(data[1]),
        };
      });
      setPreviewProducts(products);
      setDefaultAddressIndex(parseInt(querryArray[1]));
    }
  }, []);

  useUpdateEffect(() => {
    const previewOrder = async (products: ProductInOrderDto[], addressIndex: number) => {
      setIsLoading(true);
      try {
        const { payload } = await orderApiRequest.previewOrder({
          products,
          addressIndex,
          paymentMethod: PreviewOrderDtoPaymentMethodEnum.Cod,
        });

        setPreviewOrderData(payload);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Khởi tạo đơn hàng thất bại',
        });
        push(RootPath.Cart);
      } finally {
        setIsLoading(false);
      }
    };

    if (previewProducts.length > 0 && defaultAddressIndex !== null) {
      previewOrder(previewProducts, defaultAddressIndex);
    }
  }, [previewProducts, defaultAddressIndex]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!previewOrderData) {
    return (
      <NotFoundPage
        description="Không thể tải đơn đặt hàng"
        redirectTitle="Quay lại"
        redirect={RootPath.Cart}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Breadcrumb links={paymentPageLocation.links} />
      <OrderPreview previewData={previewOrderData} />
      <div className="h-1"></div>
    </div>
  );
}
