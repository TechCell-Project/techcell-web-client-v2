'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { RootPath } from '@/constants';
import { ArrowLeft } from 'lucide-react';
import { Order } from '@techcell/node-sdk';
import { buildAddressString, cn } from '@/lib/utils';
import {
  ORDER_STATUSES,
  PAYMENT_METHODS,
  PAYMENT_STATUSES,
  STATUS_CANCELLED,
  STATUS_CONFIRMED,
  STATUS_FAILED,
  STATUS_PENDING,
  STATUS_PREPARING,
  STATUS_WAIT_FOR_PAYMENT,
} from '@/constants/payment';
import { currencyFormat } from '@/utilities/func.util';

interface OrderDetailProps {
  order: Order;
}

export const OrderDetail = ({ order }: OrderDetailProps) => {
  const { push } = useRouter();

  const handleBackToOrderList = () => {
    push(RootPath.OrderList);
  };

  const cancelable =
    order.payment.status === STATUS_WAIT_FOR_PAYMENT ||
    (order.payment.method === 'COD' &&
      [STATUS_PENDING, STATUS_CONFIRMED, STATUS_PREPARING].includes(order.orderStatus));

  const continuable = order.payment.status === STATUS_WAIT_FOR_PAYMENT;

  return (
    <div className="container py-4">
      <div className="w-full">
        <div className="w-full sm:w-[600px] m-auto h-auto bg-white rounded-md">
          <div className="py-4">
            <div className="w-full flex items-center justify-center relative">
              <Button variant="ghost" onClick={handleBackToOrderList} className="absolute left-0">
                <ArrowLeft />
              </Button>
              <h4 className="text-center">Chi tiết đơn hàng</h4>
            </div>
            {/* Thông tin khách hàng */}
            <div className="w-full p-5 ">
              <ul className="w-full text-left">
                <li className="w-full flex flex-col sm:flex-row sm:justify-between items-center mb-2">
                  <div>Mã đơn hàng:</div>
                  <span className="font-bold uppercase text-end">#{order._id}</span>
                </li>
                <li className="w-full flex justify-between items-center mb-2">
                  <div>Ngày đặt hàng:</div>
                  <span className="font-bold text-end">05/05/2024</span>
                </li>
                <li className="w-full flex justify-between items-center mb-2">
                  <div>Tình trạng:</div>
                  <span
                    className={cn(
                      'font-bold text-end',
                      order.orderStatus === STATUS_CANCELLED || order.orderStatus === STATUS_FAILED
                        ? 'text-red-600'
                        : 'text-[#339901]',
                    )}
                  >
                    {ORDER_STATUSES.get(order.orderStatus)?.label}
                  </span>
                </li>
                <li className="w-full flex justify-between items-center mb-2">
                  <div>Tên khách hàng:</div>
                  <span className="font-bold text-end">{order.customer.address.customerName}</span>
                </li>
                <li className="w-full flex justify-between items-center mb-2">
                  <div>Số điện thoại:</div>
                  <span className="font-bold text-end">{order.customer.address.phoneNumbers}</span>
                </li>
                <li className="w-full flex justify-between items-center mb-2">
                  <div>Email:</div>
                  <span className="font-bold text-end">{order.customer.email}</span>
                </li>
                <li className="w-full flex justify-between sm:items-center mb-2">
                  <div>Địa chỉ:</div>
                  <span className="font-bold text-end max-w-[60%]">
                    {buildAddressString(order.customer.address)}
                  </span>
                </li>
              </ul>
            </div>

            <div className="border mx-5"></div>

            {/* Phương thức thanh toán */}
            <div className="w-full p-5">
              <ul className="w-full text-left">
                <li className="flex justify-between items-center mb-2">
                  <div>Phương thức thanh toán:</div>
                  <span className="font-bold text-end">
                    {PAYMENT_METHODS.get(order.payment.method)?.label}
                  </span>
                </li>

                <li className="flex justify-between items-center mb-2">
                  <div>Tình trạng thanh toán:</div>
                  <span
                    className={cn(
                      'font-bold text-end',
                      order.payment.status === STATUS_CANCELLED ||
                        order.payment.status === STATUS_FAILED
                        ? 'text-red-600'
                        : 'text-[#339901]',
                    )}
                  >
                    {PAYMENT_STATUSES.get(order.payment.status)?.label}
                  </span>
                </li>
              </ul>
            </div>
            <div className="border mx-5"></div>

            {/*Sản phẩm */}
            <div className="w-full p-5">
              <div className="text-left mb-2">Sản phẩm</div>
              <div className="w-full border border-solid border-slate-300 rounded-md">
                {order.products.map((product) => {
                  const types = product.productType?.split('-') as string[];
                  const unitPrice =
                    product.unitPrice.special !== 0
                      ? product.unitPrice.special
                      : product.unitPrice.base;

                  return (
                    <div
                      key={product.skuId}
                      className="p-3 w-full flex justify-between items-center"
                    >
                      <div className="w-full flex items-center">
                        <Image src={'/phone-test/15-base.jpg'} alt="" width={70} height={70} />
                        <div className="flex flex-col ml-8">
                          <div className="text-sm sm:text-lg font-bold mb-2">
                            {product.productName}
                          </div>
                          {types.length === 2 ? (
                            <>
                              <div className="text-xs sm:text-base">Bộ nhớ: {types[0]}</div>
                              <div className="text-xs sm:text-base">Màu sắc: {types[1]}</div>
                            </>
                          ) : (
                            <div className="text-xs sm:text-base">
                              Phân loại: {product.productType}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 text-xs sm:text-base text-end">
                        <p>
                          Số lượng: <span className="font-bold">{product.quantity}</span>
                        </p>
                        <p>
                          Đơn giá:{' '}
                          <span className="font-bold text-primary">
                            {currencyFormat(unitPrice)}
                          </span>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border mx-5"></div>

            {/* Tổng số tiền đã đặt hàng */}
            <div className="w-full p-5 flex justify-between">
              <div>Tổng tiền:</div>
              <div className="text-xl font-bold text-primary">
                {currencyFormat(order.totalPrice)}
              </div>
            </div>

            {/* BTN  */}
            <div className="w-full p-5">
              <div className="flex w-full gap-3 sm:gap-5 flex-col sm:flex-row mb-3 sm:mb-5">
                {continuable && (
                  <Button
                    variant="default"
                    className={cn(
                      'w-full bg-[#339901] hover:bg-green-700',
                      cancelable && 'sm:w-1/2',
                    )}
                  >
                    Tiếp tục thanh toán
                  </Button>
                )}
                {cancelable && (
                  <Button
                    variant="destructive"
                    className={cn('w-full sm:w-1/2', continuable && 'sm:w-1/2')}
                  >
                    Hủy đơn
                  </Button>
                )}
              </div>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:text-primary-dark"
                onClick={handleBackToOrderList}
              >
                Quay lại danh sách đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
