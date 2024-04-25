'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import {
  Breadcrumb as ShadcnBreadcumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { RootPath } from '@/constants';
import { Button } from '@/components/ui/button';

export interface BreadcrumbProps {
  links: {
    title: string;
    link: string;
  }[];
}

export function Breadcrumb({ links }: BreadcrumbProps) {
  const { push } = useRouter();

  return (
    <ShadcnBreadcumb className="w-full h-9 sm:h-11 bg-slate-50 shadow-md">
      <BreadcrumbList className="text-base h-full container px-2.5 sm:px-10 flex items-center">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={RootPath.Home}>Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {links.map((link, index) => (
          <div className="flex gap-1.5 sm:gap-2.5 items-center" key={link.link}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {index === links.length - 1 ? (
                <BreadcrumbPage className="text-primary font-semibold">{link.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Button
                    variant="ghost"
                    onClick={() => push(link.link)}
                    className="p-0 hover:text-primary"
                  >
                    {link.title}
                  </Button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </ShadcnBreadcumb>
  );
}
