'use client';

import React, { createElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

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
import LogoutButton from './button-logout';

import { User as UserIcon } from 'lucide-react';
import { LiaShippingFastSolid } from 'react-icons/lia';

import { GetMeResponseDto } from '@techcell/node-sdk';

import { IconProps, RootPath } from '@/constants';

import AlternativeAvatar from '@/public/temp/avatarColor.webp';

export const IconUser = ({ user }: { user: GetMeResponseDto }) => {
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
        <DropdownMenuLabel className="text-base text-primary">{user.firstName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-base h-9">
            <Link href={RootPath.Profile} className="flex items-center gap-4 w-full">
              <UserIcon className="mr-2 h-5 w-5" />
              <span>Hồ sơ</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-base h-9">
            <Link href={RootPath.Order} className="flex items-center gap-4 w-full">
              <LiaShippingFastSolid className="mr-2 h-5 w-5" />
              <span>Đơn hàng</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="text-base h-9">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Icon = ({
  icon,
  name,
  desc,
  href,
  user,
}: IconProps & { user: GetMeResponseDto | null }) => {
  const pathname = usePathname();

  const setLoginCallbackParams = (href: string) => {
    if (href === RootPath.Login) {
      const params = new URLSearchParams();
      params.set('callbackUrl', pathname);
      return `${RootPath.Login}?${params.toString()}`;
    }

    return href;
  };

  return (
    <TooltipProvider delayDuration={0.5}>
      <Tooltip>
        <TooltipTrigger asChild>
          {name === 'account' && user !== null ? (
            <IconUser user={user} />
          ) : (
            <Link href={href ? setLoginCallbackParams(href) : '#'}>
              <Button
                variant="ghost"
                className="rounded-full bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center p-0"
                id={name}
              >
                {createElement(icon, { className: 'w-5 h-auto text-slate-500' })}
              </Button>
            </Link>
          )}
        </TooltipTrigger>
        <TooltipContent>
          <p>{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
