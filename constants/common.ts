import Img1 from '@/public/carousel-img/img1.png';
import Img2 from '@/public/carousel-img/img2.png';
import Img3 from '@/public/carousel-img/img3.png';
import Img4 from '@/public/carousel-img/img4.png';
// img details product
import Img5 from '@/public/phone-test/ip11.webp';
import Img6 from '@/public/phone-test/ip12.webp';
import Img7 from '@/public/phone-test/ip12mini.webp';
import Img8 from '@/public/phone-test/ip12pro.webp';
import Img9 from '@/public/phone-test/ip13.webp';
import { Phone, RefreshCw, Rocket, WalletCards } from 'lucide-react';

export const HOME_SLOGAN =
  'Nâng cấp kết nối của bạn: Các giao dịch thông minh, điện thoại thông minh hơn!';

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

export const IMAGE_SWIPER_DETAILS: ImageLabel[] = [
    { src: Img5.src, alt: '' },
    { src: Img6.src, alt: '' },
    { src: Img7.src, alt: '' },
    { src: Img8.src, alt: '' },
    { src: Img9.src, alt: '' },
];

export const BENEFIT_SECTION: Array<{
  icon: React.ElementType;
  title: string;
  desc: string;
}> = [
  {
    icon: Rocket,
    title: 'Vận chuyển nhanh',
    desc: 'Miễn phí vận chuyển cho đơn hàng từ 2 triệu',
  },
  {
    icon: RefreshCw,
    title: 'Đổi trả & hoàn tiền',
    desc: 'Quy trình đổi trả dễ dàng',
  },
  {
    icon: Phone,
    title: 'Liên hệ',
    desc: 'Chăm sóc khách hàng 24/7',
  },
  {
    icon: WalletCards,
    title: 'Thanh toán',
    desc: 'VNPay & COD trả tiền khi nhận hàng',
  },
];


export const BRAND: Array<{
    id: string;
    name: string;
    desc: string;
}> = [
        {
            id: '1',
            name: 'Apple',
            desc: '',
        },
        {
            id: '2',
            name: 'Sam sung',
            desc: '',
        },
        {
            id: '3',
            name: 'Xiaomi',
            desc: '',
        },
        {
            id: '4',
            name: 'OPPO',
            desc: '',
        },
    ];
export type AddressType = {
  typeKey: string;
  typeValue: string;
};

export const ADDRESS_TYPES = new Map<'home' | 'office' | 'other', AddressType>([
  [
    'home',
    {
      typeKey: 'home',
      typeValue: 'Nhà',
    },
  ],
  [
    'office',
    {
      typeKey: 'office',
      typeValue: 'Cơ quan',
    },
  ],
  [
    'other',
    {
      typeKey: 'other',
      typeValue: 'Khác',
    },
  ],
]);
