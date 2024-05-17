'use client';

import { Suspense } from 'react';

import { RootPath } from '@/constants';

import NotFoundPage from '@/components/common/not-found';
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
  const { previewData } = useOrderPreviewStore((state) => state);

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
