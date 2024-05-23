'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { RootPath } from '@/constants';
import { ArrowLeft } from 'lucide-react';

const OrderDetailComponent = () => {
  const { push } = useRouter();

  const handleBackToOrderList = () => {
    push(RootPath.OrderList);
  };

  return (
    <div className="container py-4">
      <div className="w-full">
        <div className="w-full sm:w-[600px] m-auto h-auto bg-white rounded-md">
          <div className="py-4">
            <div className="w-full flex items-center justify-center relative">
              <Button variant="ghost" onClick={handleBackToOrderList} className='absolute left-0'>
                <ArrowLeft />
              </Button>
              <h4 className='text-center'>Chi tiết đơn hàng</h4>
            </div>
            {/* Thông tin khách hàng */}
            <div className="w-full p-5 ">
              <ul className="w-full text-left">
                <li className="w-full flex justify-between items-center mb-2">
                  <div>Mã đơn hàng:</div>
                  <span className="font-bold text-end">#29881</span>
                </li>
                <li className="w-full flex justify-between items-center  mb-2">
                  <div>Ngày đặt hàng:</div>
                  <span className="font-bold text-end">05/05/2024</span>
                </li>
                <li className="w-full flex justify-between items-center  mb-2">
                  <div>Tình trạng:</div>
                  <span className="text-[#339901] font-bold text-end">Đang xử lý</span>
                </li>
                <li className="w-full flex justify-between items-center  mb-2">
                  <div>Tên khách hàng:</div>
                  <span className="font-bold text-end">Đặng Xuân Tiến</span>
                </li>
                <li className="w-full flex justify-between items-center  mb-2">
                  <div>Số điện thoại:</div>
                  <span className="font-bold text-end">#29881</span>
                </li>
                <li className="w-full flex justify-between items-center  mb-2">
                  <div>Email:</div>
                  <span className="font-bold text-end">asd@gmail.com</span>
                </li>
              </ul>
            </div>

            <div className="border mx-5"></div>

            {/* Phương thức thanh toán */}
            <div className="w-full p-5">
              <ul className="w-full text-left">
                <li className="flex justify-between items-center mb-2">
                  <div>Phương thức thanh toán:</div>
                  <span className="font-bold text-end">Chuyển khoản ngân hàng</span>
                </li>

                <li className="flex justify-between items-center mb-2">
                  <div>Tình trạng thanh toán:</div>
                  <span className="text-[#339901] font-bold text-end">Đang chờ xử lý</span>
                </li>
              </ul>
            </div>
            <div className="border mx-5"></div>

            {/*Sản phẩm */}
            <div className="w-full p-5">
              <div className="text-left mb-2">Sản phẩm</div>
              <div className="w-full border border-solid border-slate-300 rounded-md">
                <div className="p-3 w-full flex justify-between items-center">
                  <div className="w-full flex items-center">
                    <Image src={'/phone-test/15-base.jpg'} alt="" width={70} height={70} />
                    <div className="flex flex-col ml-8">
                      <div className="text-sm sm:text-lg font-bold mb-2">Iphone 15</div>
                      <div className="text-xs sm:text-base">Dung lượng: 128GB</div>
                      <div className="text-xs sm:text-base">Màu sắc: Đen</div>
                    </div>
                  </div>
                  <div className="text-xs sm:text-base w-[90px] sm:w-[120px]">
                    Số lượng: <span>1</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border mx-5"></div>

            {/* Tổng số tiền đã đặt hàng */}
            <div className="w-full p-5 flex justify-between">
              <div>Tổng tiền:</div>
              <div className="text-xl font-bold text-primary">13.390.000đ</div>
            </div>

            {/* BTN  */}
            <div className="w-full p-5">
              <Button className="w-full" onClick={handleBackToOrderList}>
                Quay lại danh sách đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailComponent;
