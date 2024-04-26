import { ProductDto } from '@techcell/node-sdk';

import { IMAGE_SWIPER_DETAILS } from '@/constants';

import MaxWidthWrapper from '@/components/common/max-width-wrapper';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProductImgSlider } from './product-img-slider';
import { SelectProductVariation } from './select-product-variation';

import { CircleCheck } from 'lucide-react';
import OutstandingFeatures from './outstanding-features-product';
import TableSpecification from './table-specifications';
import DialogSpecification from './dialog-specifications';
import { ProductSimilar } from './similar-product';

interface ProductDetailProps {
  detail: ProductDto;
}

export default function ProductDetailSection({ detail }: ProductDetailProps) {
  return (
    <>
      <MaxWidthWrapper>
        <h3 className="text-xl sm:text-2xl font-bold mb-2.5">{detail.productName}</h3>
        <Separator className="h-0.5" />
        <div className="max-w-full flex flex-col sm:grid sm:grid-cols-product-detail py-5 gap-4 sm:gap-8">
          <ProductImgSlider images={IMAGE_SWIPER_DETAILS} />
          <div className="w-full flex flex-col gap-3 mb-5">
            <h3 className="text-xl font-bold text-primary">{detail.productName}</h3>
            <p className="text-base">{detail.brand.name} - Điện thoại</p>
            <SelectProductVariation productId={detail.productId} variations={detail.variations} />
            <MoreOver />
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="w-full bg-slate-50">
        <MaxWidthWrapper>
          <div className="w-full flex flex-col sm:grid sm:grid-cols-product-desc-info py-8 gap-3">
            <OutstandingFeatures productDes={detail.description} />
            <div className="w-full flex flex-col items-center bg-white p-3 rounded-md">
              <TableSpecification specifications={detail.attributes.slice(0, 8)} />
              <DialogSpecification productSpecifications={detail.attributes} />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
      <ProductSimilar productSimilar={detail.brand.name}/>
    </>
  );
}

const MoreOver = () => {
  return (
    <Card className="w-full mt-5 overflow-hidden">
      <CardHeader className="py-2.5 bg-gray-300">
        <CardTitle className="text-base">Ưu đãi thêm</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2.5 py-5 text-justify">
        <div className="flex w-full items-center gap-4">
          <CircleCheck className="!w-5 !h-5 text-gray-500" />
          <p className="text-sm">
            Giảm 1% tối đa 100.000đ (Áp dụng khi thanh toán 100% giá trị đơn hàng qua Vnpay).
          </p>
        </div>
        <div className="flex w-full items-center gap-4">
          <CircleCheck className="!w-5 !h-5 text-gray-500" />
          <p className="text-sm">Giảm tới 200.000đ khi mua kèm Microsoft Office/Microsoft 365.</p>
        </div>
        <div className="flex w-full items-center gap-4">
          <CircleCheck className="!w-5 !h-5 text-gray-500" />
          <p className="text-sm">Ưu đãi Youtube Premium (Áp dụng một số sản phẩm)</p>
        </div>
      </CardContent>
    </Card>
  );
};
