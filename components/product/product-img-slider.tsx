'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import '@/app/custom.css';

// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

import { ChevronLeft, ChevronRight, Landmark, ShieldCheck, Smartphone } from 'lucide-react';
import { ImageLabel } from '@/constants';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface SliderProps {
  images: ImageLabel[];
  // alternativeImg: ImageModel;
  // selectedImage: number | null;
}

export const ProductImgSlider = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full ">
      <div className="relative max-h-[400px]">
        <Swiper
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySlider2"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src} className="rounded-lg overflow-hidden">
              <div className="max-h-[400px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={300}
                  className="min-h-[240px] sm:min-h-[400px] h-full w-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
          <SwiperNavButtons />
        </Swiper>
      </div>
      <div className="max-h-20">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={image.src} className="rounded-md overflow-hidden">
              <div className="max-h-20">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={100}
                  height={300}
                  className="max-h-20 h-full w-full object-cover object-center"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Card className="w-full mt-5 overflow-hidden">
        <CardHeader className="py-2.5 bg-primary-foreground">
          <CardTitle className="text-base text-primary">Thông tin sản phẩm</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-2.5 py-5 text-justify">
          <div className="flex w-full items-center gap-4">
            <Smartphone className="w-5 h-5 text-gray-500" />
            <p className="text-sm">Mới, đầy đủ phụ kiện từ nhà sản xuất.</p>
          </div>
          <div className="flex w-full items-center gap-4">
            <div className='w-5 h-5 flex items-center justify-center'>
              <ShieldCheck className="!w-5 h-full text-gray-500" />
            </div>
            <p className="text-sm">
              Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi
              phần cứng từ nhà sản xuất.
            </p>
          </div>
          <div className="flex w-full items-center gap-4">
            <Landmark className="w-5 h-5 text-gray-500" />
            <p className="text-sm">Giá sản phẩm đã bao gồm VAT.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SwiperNavButtons = () => {
  const swiper = useSwiper();

  return (
    <div className="swiper-nav-btns w-full flex justify-between px-0 sm:px-2.5 absolute left-0 top-1/2 z-10 -translate-y-1/2">
      <Button
        className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-rose-50"
        onClick={() => swiper.slidePrev()}
      >
        <ChevronLeft className="size-[35px] text-[#ee4949]" />
      </Button>
      <Button
        className="w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0 bg-transparent hover:bg-red-50"
        onClick={() => swiper.slideNext()}
      >
        <ChevronRight className="size-[35px] text-[#ee4949]" />
      </Button>
    </div>
  );
};
