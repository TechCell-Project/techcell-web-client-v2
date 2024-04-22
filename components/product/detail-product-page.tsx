'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CircleCheck } from 'lucide-react';
import { IMAGE_SWIPER_DETAILS } from '@/constants';
import { SwiperDetailProduct } from './swiper-detail-product';

import OutstandingFeatures from './outstanding-features-product';
import TableSpecification from './table-specifications';
import { PRODUCT_DETAILS } from '@/constants/product-detail';
import DialogSpecification from './dialog-specifications';

const DetailProductPage = () => {
  return (
    <div className="container py-4">
      {PRODUCT_DETAILS.map((product, index) => (
        <div key={index}>
          <div className="text-lg font-bold pb-4">{product.productName}</div>
          <div className="w-full h-[3px] bg-slate-200"></div>
          {/* ảnh sản phẩm và btn chọn màu sản phẩm */}
          <div className="w-full flex justify-between my-2">
            {/* left */}
            <div className="w-3/5 h-auto">
              <SwiperDetailProduct imgLabels={IMAGE_SWIPER_DETAILS} />
              {/* Đặc điểm nổi bật */}
              <OutstandingFeatures />
            </div>
            {/* right */}
            <div className="w-2/5 h-auto ml-4">
              <div className="w-full grid grid-cols-3 gap-2.5 text-center mb-4">
                {product.variation.map((variations, index) => (
                  <Link
                    href={''}
                    className="bg-white border-2 border-slate-300 border-solid rounded-md"
                    key={index}
                  >
                    <div>
                      <strong className="text-xs">{variations.attributes[0].v}GB</strong>
                    </div>
                    <span className="text-xs">
                      {variations.price[0].special}
                      <sup>đ</sup>
                    </span>
                  </Link>
                ))}
              </div>
              {/* chọn màu để xem giá */}
              <div className="text-sm font-bold mb-4">Chọn màu để xem giá</div>
              <div className="w-full grid grid-cols-3 gap-2.5 mb-4">
                <Link
                  href={''}
                  className="bg-white border-2 border-slate-300 border-solid rounded-md flex justify-center items-center"
                >
                  <div>
                    <Image src={'/phone-test/ip13.webp'} alt="" width={30} height={30} />
                  </div>
                  <div className="text-left ml-4">
                    <div>
                      <strong className="text-xs">Xanh lá</strong>
                    </div>
                    <span className="text-xs">
                      240000000<sup>đ</sup>
                    </span>
                  </div>
                </Link>

                <Link
                  href={''}
                  className="bg-white border-2 border-slate-300 border-solid rounded-md flex justify-center items-center"
                >
                  <div>
                    <Image src={'/phone-test/ip13.webp'} alt="" width={30} height={30} />
                  </div>
                  <div className="text-left ml-4">
                    <div>
                      <strong className="text-xs">Xanh lá</strong>
                    </div>
                    <span className="text-xs">
                      240000000<sup>đ</sup>
                    </span>
                  </div>
                </Link>

                <Link
                  href={''}
                  className="bg-white border-2 border-slate-300 border-solid rounded-md flex justify-center items-center"
                >
                  <div>
                    <Image src={'/phone-test/ip13.webp'} alt="" width={30} height={30} />
                  </div>
                  <div className="text-left ml-4">
                    <div>
                      <strong className="text-xs">Xanh lá</strong>
                    </div>
                    <span className="text-xs">
                      240000000<sup>đ</sup>
                    </span>
                  </div>
                </Link>

                <Link
                  href={''}
                  className="bg-white border-2 border-slate-300 border-solid rounded-md flex justify-center items-center"
                >
                  <div>
                    <Image src={'/phone-test/ip13.webp'} alt="" width={30} height={30} />
                  </div>
                  <div className="text-left ml-4">
                    <div>
                      <strong className="text-xs">Xanh lá</strong>
                    </div>
                    <span className="text-xs">
                      240000000<sup>đ</sup>
                    </span>
                  </div>
                </Link>

                <Link
                  href={''}
                  className="bg-white border-2 border-slate-300 border-solid rounded-md flex justify-center items-center"
                >
                  <div>
                    <Image src={'/phone-test/ip13.webp'} alt="" width={30} height={30} />
                  </div>
                  <div className="text-left ml-4">
                    <div>
                      <strong className="text-xs">Xanh lá</strong>
                    </div>
                    <span className="text-xs">
                      240000000<sup>đ</sup>
                    </span>
                  </div>
                </Link>

                <Link
                  href={''}
                  className="bg-white border-2 border-slate-300 border-solid rounded-md flex justify-center items-center"
                >
                  <div>
                    <Image src={'/phone-test/ip13.webp'} alt="" width={30} height={30} />
                  </div>
                  <div className="text-left ml-4">
                    <div>
                      <strong className="text-xs">Xanh lá</strong>
                    </div>
                    <span className="text-xs">
                      240000000<sup>đ</sup>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Gía sản phẩm */}
              <div className="bg-slate-300 w-full h-[60px] flex items-center p-6 rounded-md">
                <div className="text-2xl text-[#ee4949] font-bold">
                  13.790.000 <sup>đ</sup>
                </div>
                <span className="ml-12 text-lg text-slate-500 text-base line-through">
                  18.990.000 <sup>đ</sup>
                </span>
              </div>

              {/* btn */}
              <div className="w-full flex justify-between items-center gap-2.5 my-4">
                <Button
                  className="w-3/4 h-[60px] text-xl font-bold text-white bg-[#ee4949]"
                  variant={'default'}
                >
                  Mua ngay
                </Button>
                <Button
                  className="w-1/4 h-[60px] bg-white text-[#ee4949] border border-[#ee4949] border-solid rounded-md hover:bg-white"
                  variant={'default'}
                >
                  Thêm giỏ hàng
                </Button>
              </div>

              {/* Ưu đãi thêm */}
              <div className="w-full">
                <div className="w-full h-[40px] bg-slate-300 font-bold uppercase flex items-center p-2.5 rounded-t-md">
                  Ưu đãi thêm
                </div>
                <ul className="w-full h-auto bg-white rounded-b-md">
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2 text-xs">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Xem chính sách ưu đãi dành cho thành viên Smember
                    </Link>
                  </li>
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Nhận E-Voucher 600K khi mở thẻ tín dụng VIB
                    </Link>
                  </li>
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Giảm đến 500K khi thanh toán qua VNPAY-QR
                    </Link>
                  </li>
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Nhận e-voucher đến 2.5 triệu khi mở thẻ tín dụng HSBC
                    </Link>
                  </li>
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Nhập mã CPSMM giảm 2% - Tối đa 200.000 đồng
                    </Link>
                  </li>
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Giảm thêm 5% tối đa 200.000đ khi thanh toán qua Kredivo
                    </Link>
                  </li>
                  <li className="px-2 py-3 flex items-center">
                    <span className="text-green-500 mr-2">
                      <CircleCheck />
                    </span>
                    <Link href={''} className="text-sm">
                      Nhập mã `SPPCPST4` Giảm ngay 50.000đ cho đơn từ 2.000.000 đồng
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Thông số kỹ thuật */}
              <div className="w-full h-[550px] relative bg-white">
                <TableSpecification />
                <DialogSpecification productData={product} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailProductPage;
