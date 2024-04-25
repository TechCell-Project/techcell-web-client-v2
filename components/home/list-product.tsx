'use client';

import { PHONE_TEST } from '@/constants/phone-test';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { currencyFormat, calculateSaleOffPercentage } from '@/utilities/func.util';
import Link from 'next/link';

const ListProduct = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mb-4">
      {PHONE_TEST.map((phone) => (
        <Link
          href={''}
          key={phone.name}
          className="flex flex-col bg-white p-2 justify-center rounded-xl cursor-pointer hover:scale-105 hover:transition duration-150 ease-in-out"
        >
          <div className="w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] m-auto">
            <Image
              src={phone.images[0].url}
              alt={phone.name}
              width={400}
              height={400}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          <span className="font-bold text-sm pt-4">{phone.modelName}</span>
          <div className="w-full flex flex-col sm:flex sm:flex-row sm:items-center ">
            <div className="text-md font-bold sm:text-lg my-2 text-[#ee4949] font-semiblod">
              {currencyFormat(Number(phone.price.special))}
              <sup>đ</sup>
            </div>
            <div className="text-xs mb-2 sm:ml-2 sm:text-sm sm:my-2 text-slate-500 line-through">
              {currencyFormat(Number(phone.price.base))}
              <sup>đ</sup>
            </div>
          </div>

          {/*  */}
          <div className="text-xs p-2 rounded-md border border-solid border-slate-[#e5e7eb] bg-[#f3f4f6]">
            Giảm giá đến :{' '}
            <span className="text-sm text-[#ee4949] font-bold">
              {calculateSaleOffPercentage(phone.price.base, phone.price.special)} %
            </span>{' '}
            và nhiều khuyến mại hấp dẫn khác
          </div>

          {/*  */}
          <div className="pb-2 pt-4 flex justify-between items-center">
            <Button
              variant="default"
              className="hidden sm:hidden md:hidden xl:flex text-[#ee4949] border border-solid border-rose-300 bg-white hover:bg-white items-center"
            >
              Thêm giỏ hàng
            </Button>
            <Button
              variant="outline"
              className="text-white bg-[#ee4949] hover:bg-[#ee4949] hover:text-white"
            >
              Mua ngay
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListProduct;
