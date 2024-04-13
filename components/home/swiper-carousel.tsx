'use client';

import React from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';

import { ImageLabel } from '@/constants/common';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
    imgLabels: ImageLabel[];
}

export const SwiperCarousel = ({ imgLabels }: CarouselProps) => {
    return (
        <div className='relative max-h[480px]'>
            <Swiper
                pagination={{
                    clickable: true,
                }}
                loop={true}
                modules={[Pagination, Navigation]}
                className='mySlider w-full h-full'
            >
                {imgLabels.map((label) => (
                    <SwiperSlide key={label.alt}>
                        <div className='max-h-[480px]'>
                            <Image
                                src={label.src}
                                alt='image slides'
                                width={1920}
                                height={480}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperNavButtons />
            </Swiper>
        </div>
    )
}

const SwiperNavButtons = () => {
    const swiper = useSwiper();

    return (
        <div className='swiper-nav-btns w-full flex justify-between px-0 sm:px-2.5 absolute left-0 top-1/2 z-10 -translate-y-1/2'>
            <Button className='w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0' onClick={() => swiper.slidePrev()}>
                <ChevronLeft className='text-[18px] sm:text-[30px]' />
            </Button>
            <Button className='w-[30px] sm:w-[50px] h-[30px] sm:h-[50px] rounded-full p-0' onClick={() => swiper.slideNext()}>
                <ChevronRight className='text-[18px] sm:text-[30px]' />
            </Button>
        </div>
    )
}