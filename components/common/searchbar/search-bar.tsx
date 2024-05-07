'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { useDebounceEffect } from 'ahooks';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { SearchSchema, SearchType } from '@/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { FILTERS_PARAM, PAGE_PARAM, RootPath } from '@/constants';

export const SearchBar = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState<string>('');
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
  } = form;

  const keywordValue = watch('keyword');

  const onSubmit = (data: SearchType) => {
    console.log(JSON.stringify(data));
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_PARAM, '1');
    params.set(FILTERS_PARAM, JSON.stringify(data));
    push(`${RootPath.ProductList}?${params.toString()}`);
  };

  useDebounceEffect(
    () => {
      setSearchTerm(keywordValue);
    },
    [keywordValue],
    { wait: 600 },
  );

  console.log(searchTerm);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="h-10 bg-inherit flex gap-2 items-center">
        <FormField
          control={control}
          name="keyword"
          render={({ field }) => (
            <FormItem className="relative">
              <FormControl>
                <Input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-56 text-zinc-600 text-base font-semibold h-full px-2 py-1 bg-inherit outline-none rounded-none border-white !border-b-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isSubmitting}
                  {...field}
                />
              </FormControl>
              <FormMessage className="absolute bottom-0 translate-y-full left-2" />
            </FormItem>
          )}
        />
        <Button variant="ghost" type="submit" className="p-0" disabled={isSubmitting}>
          <FaMagnifyingGlass className="h-[22px] w-auto text-zinc-500 my-[2px]" />
        </Button>
      </form>
    </Form>
  );
};
