'use client';

import { Button } from '@/components/ui/button';

interface ButtonProps {
  productId: string;
  skuId: string | null;
}

export const BuyingButton = ({ productId, skuId }: ButtonProps) => {
    const handleAddToCart = () => {
        console.log(productId);
    }

    const handleBuyNow = () => {
        console.log(productId);
    }

  return (
    <div className="py-2.5 flex items-center gap-3 w-full">
      <Button
        variant="default"
        className="text-primary w-3/5 border border-solid border-rose-300 bg-white hover:bg-white"
        onClick={handleAddToCart}
      >
        Thêm giỏ hàng
      </Button>
      <Button
        variant="outline"
        className="text-white w-2/5 bg-primary hover:bg-primary hover:text-white"
        onClick={handleBuyNow}
      >
        Mua ngay
      </Button>
    </div>
  );
};
