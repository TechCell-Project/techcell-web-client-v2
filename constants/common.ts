import Img1 from '@/public/carousel-img/img1.png'
import Img2 from '@/public/carousel-img/img2.png';
import Img3 from '@/public/carousel-img/img3.png';
import Img4 from '@/public/carousel-img/img4.png';

export const HOME_SLOGAN = 'UPGRADE YOUR CONNECTIVITY: SMART DEALS, SMARTER PHONES!';

export type ImageLabel = {
    src: string;
    alt: string;
};

export const IMAGE_CAROUSEL: ImageLabel[] = [
    { src: Img1.src, alt: 'first' },
    { src: Img2.src, alt: 'second' },
    { src: Img3.src, alt: 'third' },
    { src: Img4.src, alt: 'fourth' },
];
