import { CATEGORY_PARAM, PHONE_CATEGORIES } from './validApiParams';
import { getSearchParamsQuery, upperCase } from '@/lib/utils';

import { IconType } from 'react-icons/lib';
import { LuShoppingBag } from 'react-icons/lu';
import { MdNotificationsNone } from "react-icons/md";
import { FaRegUser } from 'react-icons/fa';
import { RootPath } from './enum';

export interface NavLinks {
  label: string;
  value: string;
  searchQuery: URLSearchParams;
}

export const DRAWER_WIDTH: number = 280;

export const NAV_CATEGORIES: NavLinks[] = PHONE_CATEGORIES.map((cat) => {
  return {
    label: upperCase(cat),
    value: cat,
    searchQuery: getSearchParamsQuery(CATEGORY_PARAM, cat),
  };
});

export interface IconProps {
  icon: IconType;
  name: string;
  desc: string;
  href?: string;
}

export const RIGHT_NAV: IconProps[] = [
  {
    icon: LuShoppingBag,
    name: 'cart',
    desc: 'Giỏ hàng',
    href: RootPath.Cart,
  },
  {
    icon: MdNotificationsNone,
    name: 'notification',
    desc: 'Thông báo',
  },
  {
    icon: FaRegUser,
    name: 'account',
    desc: 'Tài khoản',
  }
]