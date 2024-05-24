'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import {
  ORDER_STATUSES,
  PAYMENT_STATUSES,
  STATUS_CANCELLED,
  STATUS_COMPLETED,
  STATUS_FAILED,
  STATUS_PENDING,
  STATUS_PREPARED,
  STATUS_PREPARING,
  STATUS_PROCESSING,
} from '@/constants/payment';
import { Order } from '@techcell/node-sdk';

import { ImDropbox } from 'react-icons/im';
import { BsBoxSeamFill, BsHouseCheckFill } from 'react-icons/bs';
import { MdLocalShipping, MdOutlinePendingActions } from 'react-icons/md';

import { currencyFormat } from '@/utilities/func.util';
import { getTotalOrderProductQuantity } from '@/lib/utils';

import AlternativeImg from '@/public/phone-test/15-promax.jpg';
import TechcellIcon from '@/public/favicon.ico';
import { Button } from '@/components/ui/button';
import { RootPath } from '@/constants';
import { CircleX } from 'lucide-react';

interface OrderCardProps {
  order: Order;
}

type OrderStatusContent = {
  color: string;
  icon: ReactNode;
  text: string;
};

const getOrderStatusContent = (orderStatus: string): OrderStatusContent => {
  let content = {
    color: 'text-green-500',
    icon: <MdLocalShipping />,
  };

  switch (orderStatus) {
    case STATUS_PENDING:
      content = {
        color: 'text-yellow-500',
        icon: <MdOutlinePendingActions />,
      };
      break;
    case STATUS_PREPARING:
      content = {
        color: 'text-yellow-500',
        icon: <BsBoxSeamFill />,
      };
      break;
    case STATUS_PREPARED:
      content = {
        color: 'text-yellow-500',
        icon: <ImDropbox />,
      };
      break;
    case STATUS_COMPLETED:
      content = {
        color: 'text-green-500',
        icon: <BsHouseCheckFill />,
      };
      break;
    case STATUS_CANCELLED || STATUS_FAILED: 
      content = {
        color: 'text-red-500',
        icon: <CircleX />
      }
      break;
    default:
      break;
  }

  return {
    text: String(ORDER_STATUSES.get(orderStatus)?.label),
    ...content,
  };
};

export const OrderCard = ({ order }: OrderCardProps) => {
  const { color, icon, text } = getOrderStatusContent(order.orderStatus);
  const { push } = useRouter();

  const basePrice = order.products[0].unitPrice.base;
  const specialPrice = order.products[0].unitPrice.special;

  const moveToDetail = () => {
    push(`${RootPath.OrderList}/${order._id}`);
  };

  return (
    <div className="w-full flex flex-col bg-white rounded-md px-3 sm:px-5 py-3 gap-3">
      <div className="w-full flex items-center justify-between text-base sm:text-lg font-normal uppercase">
        <div className="text-primary flex items-center">
          <h4>{String(PAYMENT_STATUSES.get(order.payment.status)?.label)}</h4>
        </div>
        <div className={`flex items-center gap-3 ${color}`}>
          {icon}
          <h4>{text}</h4>
        </div>
      </div>
      <div className="inline-block py-3 sm:flex items-center justify-between w-full border-b-2 border-gray-300">
        <div className="flex items-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src={order.products[0].image ? order.products[0].image.url : AlternativeImg.src}
              alt={order.products[0].productName}
              width={64}
              height={64}
              className="w-full h-auto object-cover object-center"
            />
          </div>
          <div className="flex flex-col ml-3 gap-1">
            <h4 className="text-base sm:text-lg text-primary font-semibold">
              {order.products[0].productName}
            </h4>
            <p className="text-sm">Phân loại: {order.products[0].productType}</p>
            <p className="text-sm">Số lượng: {order.products[0].quantity}</p>
          </div>
        </div>
        <div className="flex gap-2.5 sm:gap-5 text-sm w-full sm:w-auto justify-end mt-3 sm:mt-0">
          {specialPrice !== 0 && (
            <p className="text-gray-500 line-through font-semibold">{currencyFormat(basePrice)}</p>
          )}
          <p className="text-primary font-semibold">
            {currencyFormat(specialPrice !== 0 ? specialPrice : basePrice)}
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <div className="w-full flex justify-between items-center">
          <p className="text-sm text-gray-500">
            {getTotalOrderProductQuantity(order.products)} sản phẩm
          </p>
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src={TechcellIcon.src}
              width={24}
              height={24}
              alt="techcell"
              className="h-auto"
            />
            <p className="text-sm sm:text-base">
              Thành tiền:{' '}
              <span className="text-primary font-semibold">{currencyFormat(order.totalPrice)}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="default" className="px-5 py-2" onClick={moveToDetail}>
            Chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
};
