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

interface NavMenuProps {
  content: string;
  redirectLinks: NavLinks[];
}

export const LeftNav = ({ content, redirectLinks }: NavMenuProps) => {
  return (
    <div className="hidden sm:flex items-center gap-[15px]">
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
