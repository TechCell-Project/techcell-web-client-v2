import Img1 from '@/public/carousel-img/img1.png';
import Img2 from '@/public/carousel-img/img2.png';
import Img3 from '@/public/carousel-img/img3.png';
import Img4 from '@/public/carousel-img/img4.png';
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

export type BrandLabel = {
  label: string;
  key: string;
  value: number;
  brandImg: string;
  setWidth?: number;
  to: string;
};

export const BRANDS: BrandLabel[] = [
  {
      label: 'Apple',
      key: 'apple',
      value: 1,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595109/filter-brand-1_txqyc5.webp',
      to: '/apple',
  },
  {
      label: 'Samsung',
      key: 'samsung',
      value: 2,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-2_hzsaee.webp',
      to: '/samsung',
  },
  {
      label: 'Xiaomi',
      key: 'xiaomi',
      value: 3,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-3_nrvhev.webp',
      to: '/xiaomi',
  },
  {
      label: 'Oppo',
      key: 'oppo',
      value: 4,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-4_drysg3.webp',
      to: '/oppo',
  },
  {
      label: 'Realme',
      key: 'realme' || 'Realme',
      value: 7,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-5_y2aihk.webp',
      to: '/realme',
  },
  {
      label: 'Nokia',
      key: 'nokia',
      value: 6,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-6_jqwqee.webp',
      to: '/nokia',
  },
  {
      label: 'Oneplus',
      key: 'oneplus',
      value: 9,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595111/filter-brand-7_zvbyo1.webp',
      to: '/oneplus',
  },
  {
      label: 'Asus',
      key: 'asus',
      value: 8,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595111/filter-brand-8_luwhky.webp',
      to: '/asus',
  },
  {
      label: 'Vivo',
      key: 'vivo',
      value: 5,
      brandImg:
          'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595109/filter-brand-9_gi96qu.webp',
      setWidth: 76.4,
      to: '/vivo',
  },
];

export const BRANDS_MAP = new Map<string, BrandLabel>(BRANDS.map((brand) => [brand.key, brand]));