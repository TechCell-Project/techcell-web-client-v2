'use client';

import { PHONE_TEST } from '@/constants/phone-test';
import Image from 'next/image';

const OrderListProduct = () => {
  return (
    <div className="w-auto sm:w-[640px] h-auto m-auto bg-white my-3 p-4 sm:py-4">
      <div className=''>
        <div className="text-center">
          <div className="text-[20px] font-bold ml-2">Tất cả sản phẩm</div>
        </div>
        <div className="flex flex-col">
          {PHONE_TEST.map((phone) => (
            <div key={phone.name} className="w-full h-full">
              <div className="flex flex-row mb-1 pt-5 bg-white items-center rounded-xl">
                <div className="w-[115px] h-[75px] sm:w-[100px] sm:h-[100px]">
                  <Image
                    src={phone.images[0].url}
                    alt={phone.name}
                    width={200}
                    height={200}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className="flex flex-row justify-between w-[443px] items-center">
                  <div className="flex flex-col ml-4">
                    <span className="text-lg font-semiblod">{phone.name}</span>
                    <span>Màu tím</span>
                    <span className="text-[#ee4949] text-lg font-semiblod">
                      {phone.price.special}đ
                      <span className="ml-2 text-slate-500 text-base line-through">
                        {phone.price.base}đ
                      </span>
                    </span>
                  </div>
                  <div className="">
                    <span className="">Số lượng : 1</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderListProduct;
