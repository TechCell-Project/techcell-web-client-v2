'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, {
  Fragment,
  HTMLProps,
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useDebounceEffect, useUpdateEffect } from 'ahooks';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

import { SearchSchema, SearchType } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FILTERS_PARAM, PAGE_PARAM, RootPath } from '@/constants';

import {
  autoUpdate,
  size,
  useId,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  FloatingFocusManager,
  FloatingPortal,
  useClick,
  useFocus,
} from '@floating-ui/react';
import { cn } from '@/lib/utils';
import { currencyFormat } from '@/utilities/func.util';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useRecentSearches } from '@/hooks/useRecentSearches';
import { ProductInListDto } from '@techcell/node-sdk';
import { productApiRequest } from '@/apiRequests';
import { Clock, X } from 'lucide-react';
import TempProductImg from '@/public/phone-test/15-base.jpg';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ItemProps {
  children: ReactNode;
  active?: boolean;
}

type ProductSearchCardProps = {
  product: ProductInListDto;
  handleClick: () => void;
};

const ProductSearchCard = ({ product, handleClick }: ProductSearchCardProps) => {
  const { push } = useRouter();

  const handleClickItem = () => {
    handleClick();
    push(`${RootPath.ProductDetails}/${product.id}`);
  };

  return (
    <Button
      className="w-full h-auto p-1.5 sm:my-2.5 sm:p-2.5 bg-white cursor-pointer justify-start gap-2.5 sm:gap-5 hover:bg-gray-200"
      onClick={handleClickItem}
    >
      <div className="!w-16 h-16 flex items-center">
        <Image
          src={product.images[0]?.url || TempProductImg.src}
          alt={product.modelName}
          width={64}
          height={64}
          className="max-w-16 max-h-16 h-16 w-auto object-cover object-center"
        />
      </div>
      <div className="w-full h-16 flex flex-col text-start items-start justify-center">
        <h4 className="w-full text-black text-base sm:text-lg font-bold">{product.modelName}</h4>
        <p className="w-full font-bold text-sm sm:text-base text-primary font-semiblod">
          {currencyFormat(product.price.special !== 0 ? product.price.special : product.price.base)}
          <sup>đ</sup>
          {product.price.special !== 0 && (
            <span className="ml-2 text-slate-500 text-base line-through">
              {currencyFormat(Number(product.price.base))}
              <sup>đ</sup>
            </span>
          )}
        </p>
      </div>
    </Button>
  );
};

type RecentSearchProps = {
  recentSearches: string[];
  handleClick: (historySearch: string) => void;
  removeItem: (historySearch: string) => void;
  removeAll: () => void;
};

const RecentSearchesSection = ({
  recentSearches,
  handleClick,
  removeItem,
  removeAll,
}: RecentSearchProps) => {
  return (
    <div className="w-full">
      <div className="w-full p-1.5 sm:px-2.5 bg-gray-200 border-b flex justify-between items-center">
        <h4 className="font-bold text-gray-600 text-base sm:text-lg">Lịch sử</h4>
        <Button variant="ghost" className="p-0 hover:bg-gray-200 underline" onClick={removeAll}>
          Xóa
        </Button>
      </div>
      <div className="w-full flex flex-col gap-1">
        {recentSearches.map((item) => (
          <div key={item} className="w-full flex items-center justify-between text-gray-700">
            <Button
              variant="ghost"
              className="w-full p-1.5 sm:px-2.5 py-1.5 flex items-center justify-start gap-1.5"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleClick(item);
              }}
            >
              <Clock className="w-5 h-5" />
              <span className="text-sm sm:text-base">{item}</span>
            </Button>
            <Button
              variant="ghost"
              className="rounded-full !w-8 !h-8 items-center p-0 mr-1.5 sm:mr-2.5"
              onClick={() => removeItem(item)}
            >
              <X className="!w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [searchProducts, setSearchProducts] = useState<ProductInListDto[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { recentSearches, setRecentSearches } = useRecentSearches();

  const isMobile = useIsMobile(400);

  const { context, refs, floatingStyles } = useFloating<HTMLInputElement>({
    whileElementsMounted: autoUpdate,
    open,
    placement: 'bottom-end',
    onOpenChange: setOpen,
    middleware: [
      size({
        apply({ rects, availableHeight, elements }) {
          Object.assign(elements.floating.style, {
            width: isMobile ? `${rects.reference.width}px` : '400px',
            maxHeight: isMobile ? `${availableHeight}px` : '600px',
          });
        },
        padding: 10,
      }),
    ],
  });

  const focus = useFocus(context, {
    visibleOnly: false,
  });
  const role = useRole(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    focus,
    role,
    dismiss,
  ]);

  const form = useForm<SearchType>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      keyword: '',
    },
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
  } = form;

  const keywordValue = watch('keyword');

  const onSubmit = (data: SearchType) => {
    console.log(JSON.stringify(data));
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM, '1');
    params.set(FILTERS_PARAM, JSON.stringify(data));
    // add to push recent searches after every search
    if (!recentSearches) {
      setRecentSearches([searchTerm]);
      push(`${RootPath.ProductList}?${params.toString()}`);
      return;
    }

    if (!recentSearches.includes(searchTerm)) {
      setRecentSearches([searchTerm, ...recentSearches]);
    }
    push(`${RootPath.ProductList}?${params.toString()}`);
  };

  useDebounceEffect(
    () => {
      const trimedKeyword = keywordValue.trim();
      if (trimedKeyword.length === 0) {
        setSearchProducts([]);
        return;
      }
      setSearchTerm(trimedKeyword);
    },
    [keywordValue],
    { wait: 600 },
  );

  console.log(JSON.stringify({ keyword: searchTerm }));

  useUpdateEffect(() => {
    async function searchProductsByKeyword(keyword: string) {
      setIsFetching(true);
      try {
        const { payload } = await productApiRequest.getProducts({
          filters: JSON.stringify({ keyword }),
          limit: 4,
        });
        setSearchProducts(payload.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsFetching(false);
      }
    }

    searchProductsByKeyword(searchTerm);
  }, [searchTerm]);

  console.log(keywordValue);
  console.log(searchTerm);
  console.log(open);
  console.log(searchProducts);

  const removeHistorySearchItem = (historySearch: string) => {
    setRecentSearches(recentSearches?.filter((item) => item !== historySearch));
  };

  const headingId = useId();

  return (
    <div className="w-full sm:w-56">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="h-10 w-full bg-inherit flex gap-2 items-center"
        >
          <FormField
            control={control}
            name="keyword"
            render={({ field }) => (
              <FormItem className="relative">
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="w-full text-zinc-600 text-base font-semibold h-full px-2 py-1 bg-inherit outline-none rounded-none border-white !border-b-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                    disabled={isSubmitting}
                    {...field}
                    ref={refs.setReference}
                    onBlur={() => setOpen(false)}
                    {...getReferenceProps({
                      onKeyDown: (e) => {
                        if (e.key === 'Enter') {
                          if (searchTerm.length !== 0) {
                            setOpen(false);
                          }
                        }
                      }

                    })}
                  />
                </FormControl>
                <FormMessage className="absolute bottom-0 translate-y-full left-2" />
              </FormItem>
            )}
          />

          {open && (
            <FloatingFocusManager context={context} returnFocus={false} closeOnFocusOut>
              <div
                ref={refs.setFloating}
                aria-labelledby={headingId}
                style={floatingStyles}
                {...getFloatingProps()}
                className="bg-white rounded-md z-50"
              >
                {recentSearches && recentSearches.length !== 0 && (
                  <RecentSearchesSection
                    recentSearches={recentSearches.slice(0, 6)}
                    handleClick={(searchValue: string) => {
                      setValue('keyword', searchValue);
                      setSearchTerm(searchValue);
                    }}
                    removeItem={removeHistorySearchItem}
                    removeAll={() => setRecentSearches([])}
                  />
                )}

                {isFetching && (
                  <div className="w-full h-12 flex flex-col items-center justify-center">
                    <Icons.spinner className="mr-2 h-8 w-8 text-primary animate-spin" />
                  </div>
                )}
                {searchProducts.length !== 0 && (
                  <Fragment>
                    <div className="w-full p-1.5 sm:px-2.5 bg-gray-200 border-b flex items-center">
                      <h4 className="font-bold text-gray-600 text-base sm:text-lg">
                        Sản phẩm tìm kiếm
                      </h4>
                    </div>
                    <ScrollArea className="h-60">
                      {searchProducts.map((product) => (
                        <ProductSearchCard
                          key={product.id}
                          product={product}
                          handleClick={() => {
                            reset();
                            setOpen(false);
                          }}
                        />
                      ))}
                    </ScrollArea>
                  </Fragment>
                )}
              </div>
            </FloatingFocusManager>
          )}

          <Button variant="ghost" type="submit" className="p-0" disabled={isSubmitting}>
            <FaMagnifyingGlass className="h-[22px] w-auto text-zinc-500 my-[2px]" />
          </Button>
        </form>
      </Form>
    </div>
  );
};
