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

import '../../styles/product.css';
// import required modules

import { Button } from '@/components/ui/button';
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductInListDto } from '@techcell/node-sdk';
import Link from 'next/link';
import { SuccinctCard } from '../common/product-card/succinct-card';

interface ListProductHotProps {
  products: ProductInListDto[];
}

export const ListProductHot = ({ products }: ListProductHotProps) => {
  const perViewNumber = typeof window !== 'undefined' && window.innerWidth < 1024 ? 1 : 4;

  return (
    <div className="bg-primary rounded flex flex-col my-5">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center">
          <div className="w-[100px] h-full sm:w-[170px] sm:h-full ml-10 mt-2">
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
          <div className="text-[12px] text-white sm:text-[25px] font-bold uppercase mt-[35px] ml-2 sm:mt-[55px]">
            Mừng quốc tế thiếu nhi <b className="animate-flash">1/6</b>
          </div>
        </div>
        <div className="mt-[30px] mr-10 sm:mt-[55px] hidden sm:block">
          <Link href={''}>
            <Button
              variant="default"
              className="text-primary border border-solid border-rose-300 bg-white hover:bg-primary hover:text-white text-[14px] sm:text-[16px] font-bold uppercase "
            >
              Xem tất cả
            </Button>
          </Link>
        </div>
      </div>
      <div className="m-10">
        <Swiper
          slidesPerView={perViewNumber}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="w-full"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="rounded">
              <SuccinctCard key={product.id} product={product} />
            </SwiperSlide>
          ))}
          <SwiperNavButtons />
        </Swiper>
      </div>

      <div className="flex flex-row justify-center sm:hidden mb-2">
        <Link href={''}>
          <Button
            variant="default"
            className="text-primary border border-solid border-rose-300 bg-white hover:bg-primary hover:text-white text-[14px] sm:text-[16px] font-bold uppercase "
          >
            Xem tất cả
          </Button>
        </Link>
      </div>
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
    <div className="swiper-nav-btns w-full flex justify-between items-center px-0 sm:px-2.5 absolute left-0 top-1/2 z-10 -translate-y-1/2">
      {!isFirstSlide && (
        <Button
          className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-rose-50"
          onClick={() => swiper.slidePrev()}
        >
          <ChevronLeft className="size-[35px] text-primary" />
        </Button>
      )}
      <div className="flex-grow"></div>
      {!isLastSlide && (
        <Button
          className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-red-50"
          onClick={() => swiper.slideNext()}
        >
          <ChevronRight className="size-[35px] text-primary" />
        </Button>
      )}
    </div>
  );
};
