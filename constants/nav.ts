import { CATEGORY_PARAM, PHONE_CATEGORIES } from './validApiParams';
import { getSearchParamsQuery, upperCase } from '@/lib/utils';
import { RootPath } from './enum';
import { Bell, ShoppingBag, User } from 'lucide-react';

export interface NavLinks {
  label: string;
  value: string;
  searchQuery: URLSearchParams;
}

export const DRAWER_WIDTH: number = 280;

export const NAV_CATEGORIES: NavLinks[] = PHONE_CATEGORIES.map((cat) => {
  return {
    label: cat[0].toUpperCase() + cat.slice(1),
    value: cat,
    searchQuery: getSearchParamsQuery(CATEGORY_PARAM, cat),
  };
});

export interface IconProps {
  icon: React.ElementType;
  name: string;
  desc: string;
  href?: string;
}

export const RIGHT_NAV: IconProps[] = [
  {
    icon: ShoppingBag,
    name: 'cart',
    desc: 'Giỏ hàng',
    href: RootPath.Cart,
  },
  {
    icon: Bell,
    name: 'notification',
    desc: 'Thông báo',
  },
  {
    icon: User,
    name: 'account',
    desc: 'Tài khoản',
    href: RootPath.Login,
  },
];

interface FooterLinks {
  title: string;
  children: {
    title: string;
    href: string;
  }[];
}[];

export const FOOTER_LINKS = [
  {
    title: 'Dịch vụ',
    children: [
      { title: 'Quy chế hoạt động', href: '' },
      { title: 'Ưu đãi thanh toán', href: '' },
      { title: 'Bảo hành điện thoại', href: '' },
      { title: 'Bảo hành mở rộng', href: '' },
      { title: 'Chính sách bảo hành', href: '' },
    ],
  },
  {
    title: 'Sản phẩm',
    children: [
      { title: 'Smart Phone', href: '' },
      { title: 'Phụ kiện', href: '' },
    ],
  },
  {
    title: 'Liên hệ',
    children: [
      { title: 'Mail: teams@techcell.cloud', href: '' },
      { title: 'Hotline: 0019 8942', href: '' },
    ],
  },
];
