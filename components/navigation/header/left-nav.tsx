'use client';

import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { NavLinks, RootPath } from '@/constants';
import { ChevronDown } from 'lucide-react';

export interface NavMenuProps {
  content: string;
  primaryLink: string;
  redirectLinks: NavLinks[];
}

export const LeftNav = ({ content, primaryLink, redirectLinks }: NavMenuProps) => {
  return (
    <div className="hidden sm:flex items-center gap-[15px]">
      <Link
        href={RootPath.Home}
        className="h-10 px-4 py-2 rounded-md hover:bg-accent flex items-center justify-center"
      >
        <h4 className="text-base font-semibold text-slate-600">Trang chủ</h4>
      </Link>
      <NavMenu content={content} primaryLink={primaryLink} redirectLinks={redirectLinks} />
    </div>
  );
};

const NavMenu = ({ content, primaryLink, redirectLinks }: NavMenuProps) => {
  return (
    <DropdownMenu>
      <div className="flex items-center text-base font-semibold text-slate-600 hover:bg-gray-100 rounded-md">
        <Link
          href={primaryLink}
          className="h-10 px-4 py-2 rounded-md hover:bg-accent flex items-center justify-center hover:bg-none"
        >
          <h4>{content}</h4>
        </Link>
        <DropdownMenuTrigger asChild className='p-0'>
          <Button variant="ghost" className='focus-visible:ring-offset-0 focus-visible:ring-0'>
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-52 px-3">
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
