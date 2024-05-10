'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { SearchBar } from '@/components/common/searchbar/search-bar';
import { Icon } from './header-icon';
import { MobileDrawer } from './mobile-drawer';
import { LeftNav } from './left-nav';

import { NAV_CATEGORIES, RIGHT_NAV, RootPath } from '@/constants';

import Logo from '@/public/logo-red.png';
import { useAppContext } from '@/providers/app-provider';

const Header = () => {
  const { user } = useAppContext();

  return (
    <header className="bg-white w-full border-gray-200 py-2 h-16 mb-1 fixed z-50">
      <div className="container px-2.5 sm:px-10 h-full flex items-center justify-between">
        <div className="flex h-full items-center gap-1 sm:gap-6">
          <MobileDrawer />
          <Link href={RootPath.Home} className="h-full w-auto">
            <Image src={Logo} alt="logo" width={200} height={64} className="h-full w-auto" />
          </Link>
          <LeftNav
            content="Sản phẩm"
            primaryLink={RootPath.ProductList}
            redirectLinks={NAV_CATEGORIES}
          />
        </div>
        <div className="h-full flex items-center gap-5">
          <div className="h-full hidden sm:flex items-center">
            <Suspense>
              <SearchBar />
            </Suspense>
          </div>
          <div className="h-full flex gap-3 items-center w-full">
            {RIGHT_NAV.map((item) => (
              <Icon key={item.name} {...item} user={user} />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
