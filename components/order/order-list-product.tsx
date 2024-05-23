'use client';

import Image from 'next/image';
import { PHONE_TEST } from '@/constants/phone-test';
import { ProductInListDto, ProductSchema } from '@techcell/node-sdk';

import AlternativeImg from '@/public/phone-test/15-promax.jpg';
import { currencyFormat } from '@/utilities/func.util';
import { useEffect, useState } from 'react';
import { productApiRequest } from '@/apiRequests';
import { NormalCardSkeleton } from '../common/product-card/normal-card-skeleton';
import Link from 'next/link';
import TempProductImg from '@/public/phone-test/15-base.jpg';
import { Separator } from '../ui/separator';
import MaxWidthWrapper from '../common/max-width-wrapper';


interface OrderListProductProps {
  products: ProductSchema[];
}

const OrderListProduct = () => {
  const [products, setProducts] = useState<ProductInListDto[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getProductByTags = async () => {
      setLoading(true);
      const res = await productApiRequest.getProducts({
        limit: 8,
      });

      if (res.status === 200) {
        setProducts(res.payload.data);
      }
      setLoading(false);
    };

    getProductByTags();
  }, []);

  if (loading) {
    return (
      <NormalCardSkeleton />
    )
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col">
        {products.map((product) => (
          <div key={product.id} className="bg-white my-1 p-5">
            <div className="flex flex-row justify-end text-primary text-sm sm:text-base">CHỜ THANH TOÁN</div>
            <Separator className="my-4" />
            <Link href={``} className='flex flex-row items-center justify-between'>
              <div className='flex flex-row items-center'>
                <div className="w-[120px] h-[120px] sm:w-[180px] sm:h-[180px]">
                  <Image
                    src={product.images[0]?.url || TempProductImg.src}
                    alt={product.modelName}
                    width={180}
                    height={180}
                    className="w-full h-auto max-h-[180px] object-cover object-center"
                  />
                </div>
                <div className="flex flex-col">
                  <span className='text-sm sm:text-base'>{product.name}</span>
                  <span className='text-sm sm:text-base'>Phân loại:</span>
                  <span className='text-sm sm:text-base'>Số lượng:</span>
                  <div className="flex flex-row items-center block sm:hidden">
                    <span className="text-slate-500 line-through mr-2 text-xs sm:text-sm">1200000</span>
                    <span className="text-primary text-sm sm:text-base">1000000</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center hidden sm:block">
                <span className="text-slate-500 line-through mr-2 text-xs sm:text-sm">1200000</span>
                <span className="text-primary text-sm sm:text-base">1000000</span>
              </div>
            </Link>
            <Separator className="my-4" />
            <div className="flex flex-row justify-end items-center">
              <span className="mr-2 text-sm">Thành tiền:</span>
              <span className="text-primary text-base">1000000</span></div>
          </div>
        ))}
      </div>
    </MaxWidthWrapper>
    // <div className="w-auto sm:w-[full] h-auto m-auto bg-white my-3 p-4 sm:p-0 sm:py-4">
    //   <div className="">
    //     <div className="text-center">
    //       <div className="text-[20px] font-bold ml-2">Tất cả sản phẩm</div>
    //     </div>
    //     <div className="flex flex-col">
    //       {products.map((phone) => (
    //         <div key={phone.skuId} className="w-full h-full">
    //           <div className="flex flex-row mb-1 pt-5 bg-white items-center rounded-xl">
    //             <div className="w-[115px] h-[75px] sm:w-[100px] sm:h-[100px]">
    //               <Image
    //                 src={phone.image?.url ?? AlternativeImg.src}
    //                 alt={phone.productName}
    //                 width={200}
    //                 height={200}
    //                 style={{
    //                   height: '100%',
    //                   width: '100%',
    //                   objectFit: 'cover',
    //                   display: 'block',
    //                 }}
    //               />
    //             </div>
    //             <div className="flex flex-row justify-between w-full items-center">
    //               <div className="flex flex-col ml-4">
    //                 <span className="text-lg font-semiblod">{phone.productName}</span>
    //                 <span>{phone.productType}</span>
    //                 <span className="text-[#ee4949] text-lg font-semiblod">
    //                   {currencyFormat(
    //                     phone.unitPrice.special !== 0
    //                       ? phone.unitPrice.special
    //                       : phone.unitPrice.base,
    //                   )}
    //                   đ
    //                   {phone.unitPrice.special !== 0 && (
    //                     <span className="ml-2 text-slate-500 text-base line-through">
    //                       {phone.unitPrice.base}đ
    //                     </span>
    //                   )}
    //                 </span>
    //               </div>
    //               <div className="">
    //                 <span className="text-xs sm:text-lg ">Số lượng : {phone.quantity}</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default OrderListProduct;