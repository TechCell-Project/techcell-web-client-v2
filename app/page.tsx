import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';
import { HOME_SLOGAN, IMAGE_CAROUSEL } from '@/constants/common';
import { SwiperCarousel } from '@/components/home/swiper-carousel';

export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <h2 className='w-full hidden sm:block text-base uppercase bg-black text-white py-2.5 text-center'>{HOME_SLOGAN}</h2>
      <SwiperCarousel imgLabels={IMAGE_CAROUSEL} />
      <p>This is home page</p>
      <LoginButton>
        <Button>Button</Button>
      </LoginButton>
    </main>
  );
}
