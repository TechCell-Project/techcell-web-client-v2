'use client';

import React, { createElement } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

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

import { User } from '@techcell/node-sdk';

import { IconProps, RootPath } from '@/constants';

import AlternativeAvatar from '@/public/temp/avatarColor.webp';

export const IconUser = ({ user }: { user: User }) => {
  const { push } = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center p-0 overflow-hidden"
        >
          <Image
            src={user?.avatar?.url ?? AlternativeAvatar.src}
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
            <Button variant="ghost" onClick={() => push(RootPath.Profile)} className="justify-start pl-0 gap-4 w-full">
              <UserIcon className="mr-2 h-5 w-5" />
              <span>Hồ sơ</span>
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="text-base h-9">
            <Button variant="ghost" onClick={() => push(RootPath.OrderList)} className="justify-start pl-0 gap-4 w-full">
              <LiaShippingFastSolid className="mr-2 h-5 w-5" />
              <span>Đơn hàng</span>
            </Button>
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
}: IconProps & { user: User | null }) => {
  const { push } = useRouter();
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
            <Button
              id={name}
              variant="ghost"
              className="rounded-full bg-gray-200 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center p-0"
              onClick={() => push(href ? setLoginCallbackParams(href) : '#')}
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
