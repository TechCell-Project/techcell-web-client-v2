import { BENEFIT_SECTION, HOME_SLOGAN, IMAGE_CAROUSEL } from '@/constants/common';
import { SwiperCarousel } from '@/components/home/swiper-carousel';
import HomePage from '@/components/home/home-page';

export default function Home() {

  return (
    <main>
      <h2 className="w-full hidden sm:block text-base uppercase bg-primary text-white py-2.5 text-center">
        {HOME_SLOGAN}
      </h2>

      <SwiperCarousel imgLabels={IMAGE_CAROUSEL} />

      <div className="container">
        {/* <HomePage /> */}
      </div>
      
      <div className="bg-slate-100 mt-5">
        <div className="max-w-full px-0 sm:container">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {BENEFIT_SECTION.map((benefit) => (
              <div key={benefit.title} className="flex justify-center items-center my-5 h-20 gap-5">
                <div className="font-blod">
                  <benefit.icon />
                </div>
                <div className="max-w-[180px]">
                  <p className="text-[18px] font-bold">{benefit.title}</p>
                  <p className="text-[16px] opacity-90">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
