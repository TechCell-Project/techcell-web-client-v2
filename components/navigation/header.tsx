'use client';

import React, { createElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { RootPath } from '@/constants';
import Logo from '@/public/logo-red.png';
import { IconProps, NAV_CATEGORIES, NavLinks, RIGHT_NAV } from '@/constants/nav';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@techcell/node-sdk';

const Icon = ({ icon, name, desc, href }: IconProps) => {
  const { push } = useRouter();
  const onClick = (href: string) => {
    push(href);
  };

  return (
    <TooltipProvider delayDuration={0.5}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center p-0"
            onClick={() => href && onClick(href)}
            id={name}
          >
            {createElement(icon, { className: 'w-5 h-auto text-slate-500' })}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface NavMenuProps {
  content: string;
  redirectLinks: NavLinks[];
}

const LeftNav = ({ content, redirectLinks }: NavMenuProps) => {
  return (
    <div className="ml-6 w-full flex items-center gap-[15px]">
      <Link
        href={RootPath.Home}
        className="h-10 px-4 py-2 rounded-md hover:bg-accent flex items-center justify-center"
      >
        <h4 className="text-base font-semibold text-slate-600">Trang chủ</h4>
      </Link>
      <NavMenu content={content} redirectLinks={redirectLinks} />
    </div>
  );
};

const NavMenu = ({ content, redirectLinks }: NavMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-base font-semibold text-slate-600">
          {content}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52 px-3" align="start">
        <DropdownMenuGroup>
          {redirectLinks.map((link) => (
            <Link href={`${RootPath.ProductList}?${link.searchQuery.toString()}`} key={link.value}>
              <DropdownMenuItem>
                <p className="text-base">{link.label}</p>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface HeaderProps {
  user: User | null;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <header className="bg-white w-full border-gray-200 py-2 h-16">
      <div className="container h-full flex items-center">
        <Link href={RootPath.Home} className="h-full">
          <Image src={Logo} alt="logo" width={200} height={64} className="h-full w-auto" />
        </Link>
        <LeftNav content="Sản phẩm" redirectLinks={NAV_CATEGORIES} />
        <div className='mr-auto h-full flex items-center gap-3'>
          {RIGHT_NAV.map((item) => (
            <Icon key={item.name} {...item} />
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
