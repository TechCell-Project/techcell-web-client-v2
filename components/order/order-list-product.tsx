'use client';

import Image from 'next/image';
import { ProductInListDto, ProductSchema } from '@techcell/node-sdk';
import { currencyFormat } from '@/utilities/func.util';
import { productApiRequest } from '@/apiRequests';
import { NormalCardSkeleton } from '../common/product-card/normal-card-skeleton';
import Link from 'next/link';
import TempProductImg from '@/public/phone-test/15-base.jpg';
import { Separator } from '../ui/separator';
import { PhoneListOrder } from '@/constants/common';
import { RootPath } from '@/constants';


interface OrderListProductProps {
  product: PhoneListOrder;
  // products: ProductSchema[];
}

const getStatusMessage = (status: string) => {
  switch (status) {
    case "pending":
      return "Chờ xử lý";
    case "processing":
      return "Đang xử lý";
    case "wait-for-payment":
      return "Chờ thanh toán";
    case "completed":
      return "Hoàn thành";
    case "canceled":
      return "Đã hủy";
    default:
      return "";
  }
}

const OrderListProduct = ({ product }: OrderListProductProps) => {
  return (
      <div className="flex flex-col">
        <div className="bg-white my-1 p-5 rounded-xl">
          <div className="flex flex-row justify-end text-primary text-sm sm:text-lg">
            {getStatusMessage(product.payment.status)}
          </div>
          <Separator className="my-4" />
          <Link href={`${RootPath.OrderDetails}`} className='flex flex-row items-center justify-between'>
            <div className='flex flex-row items-center'>
              <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]">
                <Image
                  src={product.image.url || TempProductImg.src}
                  alt={product.productName}
                  width={180}
                  height={180}
                  className="w-full h-auto max-h-[180px] object-cover object-center"
                />
              </div>
              <div className="flex flex-col">
                <span className='text-sm sm:text-base'>{product.productName}</span>
                <span className='text-sm sm:text-base'>Phân loại: {product.productType}</span>
                <span className='text-sm sm:text-base'>SerialNumber: {product.serialNumber}</span>
                <span className='text-sm sm:text-base'>Số lượng:  {product.quantity}</span>
                <div className="flex flex-row items-center block sm:hidden">
                  <span className="text-slate-500 line-through mr-2 text-xs sm:text-lg">
                    {currencyFormat(Number(product.unitPrice.base))}
                    <sup>đ</sup>
                  </span>
                  <span className="text-primary text-sm sm:text-xl">
                    {currencyFormat(Number(product.unitPrice.special))}
                    <sup>đ</sup>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center hidden sm:block">
              <span className="text-slate-500 line-through mr-2 text-xs sm:text-lg">
                {currencyFormat(Number(product.unitPrice.base))}
                <sup>đ</sup>
              </span>
              <span className="text-primary text-sm sm:text-xl">
                {currencyFormat(Number(product.unitPrice.special))}
                <sup>đ</sup>
              </span>
            </div>
          </Link>
          <Separator className="my-4" />
          <div className="flex flex-row justify-end items-center">
            <span className="mr-2 text-xl">Thành tiền:</span>
            <span className="text-primary text-xl">
              {currencyFormat(Number(product.unitPrice.special))}
            </span>
          </div>
        </div>
      </div>
  );
};

export default OrderListProduct;