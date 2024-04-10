'use client';

import React, { createElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { LogOut, User as UserIcon } from 'lucide-react';

import { User } from '@techcell/node-sdk';

import { IconProps, RootPath } from '@/constants';
import AlternativeAvatar from '@/public/temp/avatarColor.webp';

export const IconUser = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center p-0 overflow-hidden"
        >
          <Image
            src={user.avatar?.url ?? AlternativeAvatar.src}
            alt="avatar"
            width={40}
            height={40}
            className="w-full max-w-10 max-h-10 h-auto object-cover object-center"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-base">Tài khoản</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-base">
            <Link href={RootPath.Profile} className="flex items-center gap-4">
              <UserIcon className="mr-2 h-5 w-5" />
              <span>Hồ sơ</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-base">
            <Link href="/" className="flex items-center gap-4">
              <LogOut className="mr-2 h-5 w-5" />
              <span>Đăng xuất</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Icon = ({ icon, name, desc, href, user }: IconProps & { user: User | null }) => {
  const { push } = useRouter();
  const onClick = (href: string) => {
    push(href);
  };

  return (
    <TooltipProvider delayDuration={0.5}>
      <Tooltip>
        <TooltipTrigger asChild>
          {name === 'account' && user !== null ? (
            <IconUser user={user} />
          ) : (
            <Button
              variant="ghost"
              className="rounded-full bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center p-0"
              onClick={() => href && onClick(href)}
              id={name}
            >
              {createElement(icon, { className: 'w-5 h-auto text-slate-500' })}
            </Button>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
