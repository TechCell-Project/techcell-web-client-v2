import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface PaymentMethodListProps {
  handleSelect: (value: string) => void;
}

const PaymentMethodList = () => {
  return (
    <div className="w-auto sm:w-full h-auto m-auto bg-white">
      <div className=" rounded-md my-3 py-2">
        <div className="mt-[0] mx-0 mb-[15px] flex flex-col gap-5">
          <div className="text-center">
            <div className="text-[20px] font-bold mb-3">Thông tin thanh toán</div>

            <Select>
              <SelectTrigger className="w-full h-[70px] flex justify-between items-center">
                <SelectValue placeholder="Chọn phương thức thanh toán" className="w-full" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Khả dụng</SelectLabel>
                  <SelectItem value="1">
                    <div className="py-2 pb-5">
                      <div className="w-full h-12 px-2 py-3">
                        <div className="w-full flex items-center">
                          <div className="w-10 h-10">
                            <Image
                              src={'/payment_img/2.webp'}
                              alt=""
                              width={40}
                              height={40}
                              style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div className="ml-6 text-[16px] font-bold text-[#ee4949]">
                            Thanh toán khi nhận hàng
                          </div>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="2">
                    <div className="py-2 pb-5">
                      <div className="w-full h-12 px-2 py-3">
                        <div className="w-full flex items-center">
                          <div className="w-10 h-10">
                            <Image
                              src={'/payment_img/3.webp'}
                              alt=""
                              width={40}
                              height={40}
                              style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div className="ml-6 text-[16px] font-bold text-[#ee4949]">
                            Thanh toán bằng thẻ ngân hàng
                          </div>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                  <SelectItem value="3">
                    <div className="py-2 pb-5">
                      <div className="w-full h-12 px-2 py-3">
                        <div className="w-full flex items-center">
                          <div className="w-10 h-10">
                            <Image
                              src={'/payment_img/4.webp'}
                              alt=""
                              width={40}
                              height={40}
                              style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                display: 'block',
                              }}
                            />
                          </div>
                          <div className="ml-6 text-[16px] font-bold text-[#ee4949]">VNPAY</div>
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {/* <Dialog>
              <DialogTrigger asChild className="w-full h-auto mx-0 my-4">
                <Button variant="outline" className="flex justify-between">
                  {' '}
                  <div className="w-[full] flex items-center ">
                    <div className="w-10 h-10">
                      <Image
                        src={'/payment_img/1.png'}
                        alt=""
                        width={40}
                        height={40}
                        style={{
                          height: '100%',
                          width: '100%',
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                    </div>
                    <div className="ml-6 text-[16px] font-bold text-[#ee4949]">
                      Phương thức thanh toán
                    </div>
                  </div>
                  <ChevronRight />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
                  <DialogDescription className="text-lg">Khả dụng</DialogDescription>

                  <div className="py-2">
                    <div className="px-2 py-3 border-solid border-[1px] rounded-lg">
                      <div className="w-[full] flex items-center ">
                        <div className="w-10 h-10">
                          <Image
                            src={'/payment_img/2.webp'}
                            alt=""
                            width={40}
                            height={40}
                            style={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
                        <div className="ml-6 text-[16px] font-bold text-[#ee4949]">
                          Thanh toán tại cửa hàng
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <div className="px-2 py-3 border-solid border-[1px] rounded-lg">
                      <div className="w-[full] flex items-center ">
                        <div className="w-10 h-10">
                          <Image
                            src={'/payment_img/3.webp'}
                            alt=""
                            width={40}
                            height={40}
                            style={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
                        <div className="ml-6 text-[16px] font-bold text-[#ee4949]">
                          Chuyển khoản ngân hàng qua mã QR
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <div className="px-2 py-3 border-solid border-[1px] rounded-lg">
                      <div className="w-[full] flex items-center ">
                        <div className="w-10 h-10">
                          <Image
                            src={'/payment_img/4.webp'}
                            alt=""
                            width={40}
                            height={40}
                            style={{
                              height: '100%',
                              width: '100%',
                              objectFit: 'cover',
                              display: 'block',
                            }}
                          />
                        </div>
                        <div className="ml-6 text-[16px] font-bold text-[#ee4949]">VNPAY</div>
                      </div>
                    </div>
                  </div>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit" className="w-full">
                    Xác nhận
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodList;
