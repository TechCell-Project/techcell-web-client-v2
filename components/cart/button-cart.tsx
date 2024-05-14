'use client';
import { ProductCart } from '@/types/cart.type';
import { Button } from '../ui/button';
import { useDebounceFn } from 'ahooks';
import { useEffect, useState } from 'react';
import { RootPath } from '@/constants';
import { useRouter } from 'next/navigation';
import { authApiRequest } from '@/apiRequests';
import { currencyFormat } from '@/utilities/func.util';

export type ListProductCartProps = {
  totalPrice: number;
  handleClick: () => void;
  isLoading: boolean;
};

const ButtonCart = ({ totalPrice, handleClick, isLoading }: Readonly<ListProductCartProps>) => {
  const handleClickCheckout = () => {
    handleClick();
  };

  return (
    <div className="flex justify-between items-center bg-white h-20 px-2.5 sm:px-5 rounded-xl">
      <span className="text-lg">Tạm tính: <span className='text-primary'>{currencyFormat(totalPrice)}</span></span>
      <Button variant="default" onClick={handleClickCheckout} disabled={isLoading}>
        <span>Tiến hành đặt hàng</span>
      </Button>
    </div>
  );
};

export default ButtonCart;
