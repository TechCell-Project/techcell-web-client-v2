'use client';

import Link from 'next/link';
import Image from 'next/image';

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { DrawerCollapsible } from './drawer-collapsible';

import { Home, Menu } from 'lucide-react';

import Logo from '@/public/logo-red.png';
import { NAV_CATEGORIES, RootPath } from '@/constants';

export const MobileDrawer = () => {
  return (
    <Drawer direction="left" shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-fit sm:hidden p-1 pl-0">
          <Menu className="h-full w-auto text-primary" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-[80%] h-full bg-white rounded-none">
        <div className="w-full">
          <DrawerHeader>
            <DrawerTitle>
              <Image
                src={Logo.src}
                alt="logo"
                width={100}
                height={50}
                className="w-[160px] h-auto"
              />
            </DrawerTitle>
            <DrawerDescription className="text-xl leading-5 font-semibold text-zinc-600 text-start mt-5">
              <Link href={RootPath.Home} className="w-full flex gap-5 items-end mb-5">
                <Home className='w-6 text-primary' />
                <h4>Trang chủ</h4>
              </Link>
              <DrawerCollapsible content='Sản phẩm' redirectLinks={NAV_CATEGORIES} />
            </DrawerDescription>
          </DrawerHeader>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
