'use client';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronsLeft } from 'lucide-react';
import { RootPath } from '@/constants';
import { useDebounceFn } from 'ahooks';
import { Suspense } from 'react';

interface PaginationProps {
  hasNextPage: boolean;
}

export function PaginationBar({ hasNextPage }: Readonly<PaginationProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const { run } = useDebounceFn(
    (pageNumber: number | string) => {
      replace(createPageURL(pageNumber));
    },
    {
      wait: 1000,
    },
  );

  return (
    <Suspense>
      <div className="flex h-9 sm:h-10 lg:h-12 items-center justify-center relative">
        {currentPage > 1 && (
          <div className="absolute left-0 flex items-center gap-1.5 sm:gap-2.5 text-primary">
            <ChevronsLeft />
            <Link href={RootPath.ProductList} className="text-base font-semibold hover:underline">
              Trang đầu tiên
            </Link>
          </div>
        )}
        <div className="h-full flex gap-3 sm:gap-5">
          {currentPage > 1 && (
            <Button
              variant="outline"
              className="h-full text-primary border-2 border-primary hover:text-primary p-2.5 sm:p-4"
              onClick={() => run(currentPage - 1)}
            >
              <ArrowLeft />
            </Button>
          )}
          <Button
            variant="default"
            className="h-full text-base font-semibold"
            disabled={!hasNextPage}
            onClick={() => run(currentPage + 1)}
          >
            Trang tiếp theo
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
