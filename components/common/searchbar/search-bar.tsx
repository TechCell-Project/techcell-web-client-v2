'use client';

import React from 'react';

import { useSearch } from '@/hooks/useSearch';
import { Input } from '@/components/ui/input';

import { FaMagnifyingGlass } from 'react-icons/fa6';

export const SearchBar = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="h-10 bg-inherit flex gap-2 items-center">
      <Input
        type="text"
        placeholder="Tìm kiếm..."
        value={searchTerm}
        onChange={handleChange}
        className="w-56 text-zinc-600 text-base font-semibold h-full px-2 py-1 bg-inherit outline-none rounded-none border-white !border-b-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <FaMagnifyingGlass className="h-[22px] w-auto text-zinc-500 my-[2px]" />
    </div>
  );
};
