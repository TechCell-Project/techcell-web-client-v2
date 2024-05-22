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
import { RootPath } from './enum';

export const HOME_SLOGAN =
  'Nâng cấp kết nối của bạn: Các giao dịch thông minh, điện thoại thông minh hơn!';

export type ImageLabel = {
  src: string;
  alt: string;
  link?: string;
};

export const IMAGE_CAROUSEL: ImageLabel[] = [
  { src: Img1.src, alt: 'first', link: '' },
  { src: Img2.src, alt: 'second', link: '' },
  { src: Img3.src, alt: 'third', link: '' },
  { src: Img4.src, alt: 'fourth', link: '' },
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

export type BrandLabel = {
  label: string;
  key: string;
  brandIds: string;
  value: number;
  brandImg: string;
  setWidth?: number;
  to: string;
};

export const BRANDS: BrandLabel[] = [
  {
    label: 'Apple',
    key: 'apple',
    brandIds: '661681dde3e5984cfc2c28cc',
    value: 1,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595109/filter-brand-1_txqyc5.webp',
    to: '/apple',
  },
  {
    label: 'Samsung',
    key: 'samsung',
    brandIds: '6612cc455edb561eb8e263db',
    value: 2,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-2_hzsaee.webp',
    to: '/samsung',
  },
  {
    label: 'Xiaomi',
    key: 'xiaomi',
    brandIds: '6612cc2e5edb561eb8e263d7',
    value: 3,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-3_nrvhev.webp',
    to: '/xiaomi',
  },
  {
    label: 'Oppo',
    key: 'oppo',
    brandIds: '661554a43d3c1ace081c6536',
    value: 4,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-4_drysg3.webp',
    to: '/oppo',
  },
  {
    label: 'Realme',
    key: 'realme' || 'Realme',
    brandIds: '66161616a59679da58207f70',
    value: 7,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-5_y2aihk.webp',
    to: '/realme',
  },
  {
    label: 'Nokia',
    key: 'nokia',
    brandIds: '661555163d3c1ace081c653f',
    value: 6,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595110/filter-brand-6_jqwqee.webp',
    to: '/nokia',
  },
  {
    label: 'Oneplus',
    key: 'oneplus',
    brandIds: '661555163d3c1ace081c653f',
    value: 9,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595111/filter-brand-7_zvbyo1.webp',
    to: '/oneplus',
  },
  {
    label: 'Asus',
    key: 'asus',
    brandIds: '6626188539692de754c56cc8',
    value: 8,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595111/filter-brand-8_luwhky.webp',
    to: '/asus',
  },
  {
    label: 'Vivo',
    key: 'vivo',
    brandIds: '6626184f39692de754c56cbb',
    value: 5,
    brandImg:
      'https://res.cloudinary.com/dzoykqusl/image/upload/v1687595109/filter-brand-9_gi96qu.webp',
    setWidth: 76.4,
    to: '/vivo',
  },
];

export const BRANDS_MAP = new Map<string, BrandLabel>(BRANDS.map((brand) => [brand.key, brand]));

export type NavLinkProps = {
  title: string;
  href: string;
};

export const NAV_ORDER: NavLinkProps[] = [
  {
    title: 'Tất cả',
    href: RootPath.AllOrder
  },
  {
    title: 'Đang xử lý',
    href: RootPath.Processing
  },
  {
    title: 'Chờ thanh toán',
    href: RootPath.WaitForPay
  },
  {
    title: 'Vận chuyển',
    href: RootPath.TransportOrder
  },
  {
    title: 'Hoàn thành',
    href: RootPath.CompleteOrder
  },
  {
    title: 'Đã hủy',
    href: RootPath.Cancelled
  },
];

export type PhoneListOrder = {
  skuId: string;
  productName: string;
  productType: string;
  image: ImageChildrens;
  serialNumber: string[];
  unitPrice: UnitPriceChildrens;
  quantity: number;
  payment: PaymentChildrens;
};

export type ImageChildrens = {
  publicId: string;
  url: string;
  isThumbnail: boolean;
};

export type UnitPriceChildrens = {
  base: number;
  special: number;
};

export type PaymentChildrens = {
  method: string;
  status: string;
  url: string;
};


export const List_Order: PhoneListOrder[] = [
  {
    skuId: "1",
    productName: "Iphone 15",
    productType: "512GB - Gold",
    image: {
      publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
      url: "/phone-test/15-promax.jpg",
      isThumbnail: false
    },
    serialNumber: [
      "ip15prm12345",
    ],
    unitPrice: {
      base: 20000000,
      special: 15000000
    },
    quantity: 1,
    payment: {
      method: "COD",
      status: "pending",
      url: "https://vnpay.com/pay",
    },
  },
  {
    skuId: "2",
    productName: "Iphone 14",
    productType: "216GB - Xanh",
    image: {
      publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
      url: "/phone-test/ip14.webp",
      isThumbnail: false
    },
    serialNumber: [
      "ip14prm12345",
    ],
    unitPrice: {
      base: 17000000,
      special: 16000000
    },
    quantity: 1,
    payment: {
      method: "COD",
      status: "processing",
      url: "https://vnpay.com/pay",
    },
  },
  {
    skuId: "3",
    productName: "Iphone 13",
    productType: "128GB - Red",
    image: {
      publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
      url: "/phone-test/ip13mini.webp",
      isThumbnail: false
    },
    serialNumber: [
      "ip13prm12345",
    ],
    unitPrice: {
      base: 15000000,
      special: 13000000
    },
    quantity: 1,
    payment: {
      method: "COD",
      status: "wait-for-payment",
      url: "https://vnpay.com/pay",
    },
  },
  {
    skuId: "4",
    productName: "Iphone 12",
    productType: "128GB - Tím",
    image: {
      publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
      url: "/phone-test/ip12mini.webp",
      isThumbnail: false
    },
    serialNumber: [
      "ip12prm12345",
    ],
    unitPrice: {
      base: 14000000,
      special: 13000000
    },
    quantity: 1,
    payment: {
      method: "COD",
      status: "completed",
      url: "https://vnpay.com/pay",
    },
  },
  {
    skuId: "5",
    productName: "Iphone 11 Promax",
    productType: "256GB - White",
    image: {
      publicId: "5f9a7f5d9d8f6d7f5d8f6d7",
      url: "/phone-test/ip11.webp",
      isThumbnail: false
    },
    serialNumber: [
      "ip11prm12345",
    ],
    unitPrice: {
      base: 14000000,
      special: 12000000
    },
    quantity: 1,
    payment: {
      method: "COD",
      status: "canceled",
      url: "https://vnpay.com/pay",
    },
  }
]

export const statusesToDisplay = ["completed", "processing", "pending", "canceled", "failed"];