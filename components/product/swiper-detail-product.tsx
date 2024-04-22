'use client';

import React, { useState } from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import '../../styles/swiper.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

// import required modules

import { ImageLabel } from '@/constants/common';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

interface CarouselProps {
  imgLabels: ImageLabel[];
}

export const SwiperDetailProduct = ({ imgLabels }: CarouselProps) => {
  const [activeThumbs, setActiveThumbs] = useState();
  return (
    <div className="h-[400px]">
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: activeThumbs}}
        modules={[FreeMode, Navigation, Thumbs]}
        grabCursor={true}
        className="mySwiper2"
      >
        {imgLabels.map((label) => (
          <SwiperSlide key={label.alt}>
            <div className="h-[400px] w-full bg-white flex justify-center rounded-md">
              <Image src={label.src} alt="image slides" width={400} height={400} />
            </div>
          </SwiperSlide>
        ))}
        <SwiperNavButtons />
      </Swiper>

      <Swiper
        onSwiper={()=>setActiveThumbs}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumbs"
      >
        {imgLabels.map((label) => (
          <SwiperSlide key={label.alt}>
            <div className="flex justify-center rounded-md">
              <Image src={label.src} alt="image slides" width={50} height={50} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
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
