'use client';

import { authApiRequest } from '@/apiRequests';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { RootPath } from '@/constants/enum';
import { clientSessionToken } from '@/lib/http';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ModalInformation } from './modal-information';

interface ButtonProps {
  productId: string;
}

export const BuyingButton = ({ productId }: ButtonProps) => {
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
    const currentUser = clientSessionToken.accessValue;

    if (currentUser === '') {
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
        onClick={handleClickBuy}
      >
        Thêm giỏ hàng
      </Button>
      <Button
        variant="outline"
        className="text-white w-2/5 bg-primary hover:bg-primary-dark hover:text-white"
        onClick={handleClickBuy}
      >
        Mua ngay
      </Button>

      <ModalInformation
        isOpen={openSelectVariation}
        onClose={() => setOpenSelectVariation(false)}
        productId={productId}
      />
    </div>
  );
};
