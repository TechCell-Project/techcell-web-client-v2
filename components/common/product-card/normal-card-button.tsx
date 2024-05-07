'use client';

import { Button } from '@/components/ui/button';
import { RootPath } from '@/constants/enum';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

interface ButtonProps {
  productId: string;
  onClickBuying: (productId: string) => void;
}

export const BuyingButton = ({ productId, onClickBuying }: ButtonProps) => {
  const pathname = usePathname();
  const { refresh, push } = useRouter();
  const [openSelectVariation, setOpenSelectVariation] = useState<boolean>(false);

  const handleAddToCart = () => {
    console.log(productId);
  };

  const handleBuyNow = () => {
    console.log(productId);
  };

  const handleClickBuy = async () => {
    refresh();
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      push(`${RootPath.Login}?callbackUrl=${pathname}`);
      return;
    }

    setOpenSelectVariation(true);
  };

  return (
    <div className="py-2.5 flex items-center gap-3 w-full">
      <Button
        variant="default"
        className="text-primary w-3/5 border border-solid border-rose-300 bg-white hover:bg-gray-100"
        onClick={() => onClickBuying(productId)}
      >
        Thêm giỏ hàng
      </Button>
      <Button
        variant="outline"
        className="text-white w-2/5 bg-primary hover:bg-primary-dark hover:text-white"
        onClick={() => onClickBuying(productId)}
      >
        Mua ngay
      </Button>
    </div>
  );
};
