import { cn } from '@/lib/utils';
import { calculateSaleOffPercentage, currencyFormat } from '@/utilities/func.util';
import { PriceDto } from '@techcell/node-sdk';
import { TicketPercent } from 'lucide-react';

interface ProductPriceProps {
  price: PriceDto;
  className?: string;
}

export const ProductPrice = ({ price, className }: ProductPriceProps) => {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <div className="flex flex-col sm:flex-row sm:items-end">
        <h4 className="text-xl sm:text-2xl font-bold text-primary">
          {currencyFormat(price.special !== 0 ? price.special : price.base)}
          {' đ'}
        </h4>
        {price.special !== 0 && (
          <p className="text-slate-500 text-sm sm:text-lg line-through sm:ml-2.5">
            {currencyFormat(Number(price.base))}
            {' đ'}
          </p>
        )}
      </div>
      {price.special !== 0 && (
        <div className="flex gap-2.5 p-2 sm:py-2.5 sm:px-5 bg-primary text-white rounded-md items-center justify-center">
          <TicketPercent />
          <p className="text-sm sm:text-base">
            {calculateSaleOffPercentage(price.base, price.special)}{'% Discount'}
          </p>
        </div>
      )}
    </div>
  );
};
