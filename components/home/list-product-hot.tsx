'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../../styles/swiper.css';

// import required modules

import { Button } from '@/components/ui/button';

import { PHONE_TEST, PhoneProps } from '@/constants/phone-test';
import { calculateSaleOffPercentage, currencyFormat } from '@/utilities/func.util';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface ListProductHotProps {
  phone: PhoneProps[];
}

export const ListProductHot = ({ phone }: ListProductHotProps) => {
  return (

    <div className="flex flex-col sm:flex sm:flex-row items-center sm:py-7 gap-2">
      <div className="text-center flex flex-row items-end sm:flex sm:flex-col sm:items-center">
        <div className="w-[100px] h-full sm:w-[200px] sm:h-full m-auto ">
          <Image
            src={'/hot-sale.jpg'}
            alt={'hot-sale'}  
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
        <div className="text-[16px] sm:text-[25px] font-bold uppercase">Giảm giá</div>
      </div>
      <Swiper
        slidesPerView={window.innerWidth < 1024 ? 2 : 4}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation]}
        className="w-full"
      >
        {PHONE_TEST.slice(0, 10).map((phone) => (
          <SwiperSlide key={phone.name}>
            <Link
              href={''}

              key={phone.name}
              className="flex flex-col bg-white p-2 justify-center rounded-xl cursor-pointer hover:scale-105 hover:transition duration-150 ease-in-out"
            >
              <div className="w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] m-auto">
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
              <span className="font-bold text-sm pt-4">{phone.modelName}</span>
              <div className="w-full flex flex-col sm:flex sm:flex-row sm:items-center ">
                <div className="text-md font-bold sm:text-lg my-2 text-[#ee4949] font-semiblod">
                  {currencyFormat(Number(phone.price[0].special))}
                  <sup>đ</sup>
                </div>
                <div className="text-xs mb-2 sm:ml-2 sm:text-sm sm:my-2 text-slate-500 line-through">
                  {currencyFormat(Number(phone.price[0].base))}
                  <sup>đ</sup>
                </div>
              </div>

              {/*  */}
              <div className="text-xs p-2 rounded-md border border-solid border-slate-[#e5e7eb] bg-[#f3f4f6]">
                Giảm giá đến :{' '}
                <span className="text-sm text-[#ee4949] font-bold">
                  {calculateSaleOffPercentage(phone.price[0].base, phone.price[0].special)} %
                </span>{' '}
                và nhiều khuyến mại hấp dẫn khác
              </div>

              {/*  */}
              <div className="pb-2 pt-4 flex justify-between items-center">
                <Button
                  variant="default"
                  className="hidden sm:hidden md:hidden lg:hidden xl:hidden 2xl:flex text-[#ee4949] border border-solid border-rose-300 bg-white hover:bg-white items-center"
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
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>
    </div>
  );
};

const SwiperNavButtons = () => {
  const swiper = useSwiper();
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  useEffect(() => {
    const updateSlideStatus = () => {
      setIsFirstSlide(swiper.isBeginning);
      setIsLastSlide(swiper.isEnd);
    };

    updateSlideStatus(); // Initial check

    swiper.on('slideChange', updateSlideStatus);

    return () => {
      swiper.off('slideChange', updateSlideStatus);
    };
  }, [swiper]);

  return (
    <div className='swiper-nav-btns w-full flex justify-between items-center px-0 sm:px-2.5 absolute left-0 top-1/2 z-10 -translate-y-1/2'>
      {!isFirstSlide && (
        <Button
          className='w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-rose-50'
          onClick={() => swiper.slidePrev()}
        >
          <ChevronLeft className='size-[35px] text-[#ee4949]' />
        </Button>
      )}
      <div className="flex-grow"></div>
      {!isLastSlide && (
        <Button
          className='w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-red-50'
          onClick={() => swiper.slideNext()}
        >
          <ChevronRight className='size-[35px] text-[#ee4949]' />
        </Button>
      )}
    </div>

  );
};
