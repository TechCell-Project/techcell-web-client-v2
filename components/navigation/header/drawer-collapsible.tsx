'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { NavMenuProps } from './left-nav';

import { RootPath } from '@/constants';
import { ChevronDown, ChevronRight, CircleDot, Dot, Play, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export const DrawerCollapsible = ({ content, redirectLinks }: NavMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className="w-full p-0 mb-2.5 !pr-5 justify-between items-center text-xl leading-5 font-semibold text-zinc-600"
        >
            <div className='flex gap-5 items-end'>
                <Smartphone className="w-6 text-primary" />
                <h4>{content}</h4>
            </div>
            <ChevronRight className={cn('w-6', isOpen ? 'animate-spin-90 rotate-90' : '-animate-spin-90 rotate-0')} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='w-full flex flex-col gap-2.5 pl-11 text-zinc-600 transition-transform'>
        {redirectLinks.map((link) => (
          <Link href={`${RootPath.ProductList}?${link.searchQuery.toString()}`} key={link.value} className='flex gap-2.5 mr-5 border border-white border-b-primary items-center'>
            <p className='text-lg font-semibold text-primary'>{link.label}</p>
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};
