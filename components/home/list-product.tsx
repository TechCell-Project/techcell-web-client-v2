'use client';

import { PHONE_TEST } from '@/constants/phone-test';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { currencyFormat, calculateSaleOffPercentage } from '@/utilities/func.util';

const ListProduct = () => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {PHONE_TEST.map((phone) => (
        <div
          key={phone.name}
          className="flex flex-col bg-white p-2 justify-center rounded-xl cursor-pointer hover:scale-105 hover:transition duration-150 ease-in-out"
        >
          <div className="w-[180px] h-[180px] m-auto">
            <Image
              src={phone.image[0].url}
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
          <span className="font-bold text-sm">{phone.name}</span>
          <span className="font-bold text-lg my-2 text-[#ee4949] font-semiblod">
            {currencyFormat(Number(phone.price[0].base))}
            <sup>đ</sup>
            <span className="ml-2 text-sm text-slate-500 text-base line-through">
              {currencyFormat(Number(phone.price[0].special))}
              <sup>đ</sup>
            </span>
          </span>

          {/*  */}
          <div className="text-xs p-2 rounded-md border border-solid border-slate-[#e5e7eb] bg-[#f3f4f6]">
            Giảm giá đến : <span className='text-sm text-[#ee4949] font-bold'>{calculateSaleOffPercentage(phone.price[0].base , phone.price[0].special)} %</span>
          </div>

          {/*  */}
          <div className="pb-2 pt-4 flex justify-between items-center">
            <Button
              variant="default"
              className="text-[#ee4949] border border-solid border-rose-300 bg-white hover:bg-white"
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
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
