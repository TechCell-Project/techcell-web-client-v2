import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { BENEFIT_SECTION, HOME_SLOGAN, IMAGE_CAROUSEL } from '@/constants/common';
import { SwiperCarousel } from '@/components/home/swiper-carousel';
import HomePage from '@/components/home/home-page';

export default function Home() {
  return (
    <main>
      <h2 className='w-full hidden sm:block text-base uppercase bg-[#ee4949] text-white py-2.5 text-center'>
        {HOME_SLOGAN}
      </h2>

      <SwiperCarousel imgLabels={IMAGE_CAROUSEL} />

      <p>This is home page</p>
      <div className="px-[100px] xs:px-[20px]">

        <HomePage />

        <div className="bg-[#fafafa] py-[48px]">
          <div className='max-w-full !important'>
            <div className="flex flex-row gap-[145px] justify-center">
              {BENEFIT_SECTION.map((benefit) => (
                <div key={benefit.title} className='flex items-center'>
                  <div className="px-3 font-blod">
                    <benefit.icon />
                  </div>
                  <div>
                    <p className="text-[18px] font-bold">{benefit.title}</p>
                    <p className="text-[16px] opacity-90">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
