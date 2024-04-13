'use client';
import React from 'react';

import Logo from '@/public/logo-red.png';
import Link from 'next/link';
import { RootPath } from '@/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

import { Facebook, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <div className="mt-auto w-full h-full bg-white">
      <div className="container sm:h-full sm:flex sm:justify-between sm:items-center flex flex-wrap">
        <div className="sm:w-2/4 sm:pt-12 sm:pl-4 pl-0 w-full">
          <div className="sm:h-full sm:w-auto sm:mb-4">
            <Link href={RootPath.Home}>
              <Image src={Logo} alt="logo" width={150} height={55} />
            </Link>
          </div>
          <div className="sm:h-full w-auto text-sm font-medium whitespace-normal opacity-90">
            Tận hưởng Cuộc Sống Kỹ Thuật Số với Techcell - Nơi Nâng Tầm Trải Nghiệm Điện Thoại. Sự
            hoàn hảo gặp gỡ thiết kế đẳng cấp, để mỗi cuộc gọi, mỗi cử chỉ đều trở thành một trải
            nghiệm không thể quên. Khám phá ngay với Techcell - Nơi Thăng Hoa Công Nghệ!
          </div>
          <div className="sm:h-full w-auto mt-4">
            <ul className="flex flex-wrap gap-4">
              <li>
                <Button variant="outline" className="p-2 w-10 h-10 rounded-full bg-gray-200">
                  <Facebook />
                </Button>
              </li>
              <li>
                <Button variant="outline" className="p-2 w-10 h-10 rounded-full bg-gray-200">
                  <Github />
                </Button>
              </li>
              <li>
                <Button variant="outline" className="p-2 w-10 h-10 rounded-full bg-gray-200">
                  <Mail />
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="sm:w-2/4 pt-12 sm:pl-12 flex flex-wrap sm:gap-12 gap-4 pl-0 w-full justify-between pb-4">
          <div className="sm:w-1/4 w-2/5">
            <span className="font-bold text-lg">Dịch vụ </span>
            <ul className="text-sm mt-2">
              <li className="py-0.5">
                <Link href={'/'}>Quy chế hoạt động</Link>
              </li>
              <li className="py-0.5">
                <Link href={'/'}>Ưu đãi thanh toán</Link>
              </li>
              <li className="py-0.5">
                <Link href={'/'}>Bảo hành điện thoại</Link>
              </li>
              <li className="py-0.5">
                <Link href={'/'}>Bảo hành mở rộng</Link>
              </li>
              <li className="py-0.5">
                <Link href={'/'}>Chính sách bảo hành</Link>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/4 w-2/5">
            <span className="font-bold text-lg">Sản phẩm </span>
            <ul className="text-sm mt-2">
              <li className="py-0.5">
                <Link href={'/'}>Smart Phone</Link>
              </li>
              <li className="py-0.5">
                <Link href={'/'}>Phụ kiện</Link>
              </li>
            </ul>
          </div>
          <div className="sm:w-1/4 w-2/5">
            <span className="font-bold text-lg">Liên hệ </span>
            <ul className="text-sm mt-2">
              <li className="py-0.5">
                <Link href={'/'}>Mail: teams@techcell.cloud</Link>
              </li>
              <li className="py-0.5">
                <Link href={'/'}>Hotline: 0019 8942</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container w-full h-px bg-slate-200 my-6"></div>

      <div className="container h-2/4 sm:flex sm:justify-between sm:items-center text-center">
        <p className="font-bold">© 2023, made with ❤️ by Techcell Team</p>
        <div>
          <ul className="flex sm:flex-row gap-6 font-bold justify-center pt-4">
            <li>
              <Link href={'/'}>Admin</Link>
            </li>
            <li>
              <Link href={'/'}>Documentation</Link>
            </li>
            <li>
              <Link href={'/'}>Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
