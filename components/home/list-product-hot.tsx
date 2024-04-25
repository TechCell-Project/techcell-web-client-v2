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
import { Navigation, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import { VALID_GET_PRODUCTS_PARAMS } from '@/constants';
import { ProductsApiProductsControllerGetProductsRequest } from '@techcell/node-sdk';
import { filterSearchParams, findKeyword } from '@/lib/utils';
import { productApiRequest } from '@/apiRequests/product';
import { NormalCard } from '../common/product-card/normal-card';
import '../../styles/product.css';

type Props = {
  searchParams?: { [key: string]: string | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const isFilterWithKeyword = searchParams?.filters?.includes('keyword');

  const generatedTitle = isFilterWithKeyword
    ? `${JSON.parse(searchParams?.filters as string).keyword} - Kết quả`
    : 'Tìm kiếm';

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: generatedTitle,
    openGraph: {
      images: ['/public/phone-test/15-pro.jpg', ...previousImages],
    },
  };
}

export const ListProductHot = async ({ searchParams }: Readonly<Props>) => {

  const page = searchParams?.page ?? '1';

  const isFilterWithKeyword = searchParams?.filters?.includes('keyword');

  const payload = {
    page: Number.parseInt(page) - 1,
    ...(searchParams && filterSearchParams(searchParams, VALID_GET_PRODUCTS_PARAMS)),
  } as ProductsApiProductsControllerGetProductsRequest;

  const relevantKeyword = isFilterWithKeyword
    ? findKeyword(JSON.parse(searchParams?.filters as string).keyword)
    : null;

  const promises = [
    productApiRequest.getProducts(payload),
    productApiRequest.getProducts({
      limit: 4,
      filters: JSON.stringify(
        relevantKeyword ? { keyword: relevantKeyword } : { tagIds: ['661b7c09128dfd9b6b3e19da'] },
      ),
    }),
  ];

  const res = await Promise.all(promises);

  return (
    <div className="bg-[#ee4949] rounded flex flex-col">
      <div className="flex flex-row items-center">
        <div className="w-[100px] h-full sm:w-[200px] sm:h-full ml-5">
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
        <div className="text-[16px] text-white sm:text-[25px] font-bold uppercase mt-[25px] ml-2 sm:mt-[50px]">
          Mừng đại lễ <b className='animate-flash'>30/4 - 1/5</b>
        </div>
      </div>
      <div className="m-7 sm:m-10">
        <Swiper
          slidesPerView={window.innerWidth < 1024 ? 1 : 4}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 10000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
          className="w-full"
        >
          {res[0].payload.data.slice(-10).map((product) => (
            <SwiperSlide key={product.id} className='rounded'>
              <NormalCard key={product.id} product={product} />
            </SwiperSlide>
          ))}
          <SwiperNavButtons />
        </Swiper>
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
