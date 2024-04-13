import { Facebook, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Logo from '@/public/logo-red.png';
import { Button } from "@/components/ui/button";
import Link from "next/link";

const links = [
  {
    title: 'Dịch vụ',
    children: [
      { title: 'Quy chế hoạt động', href: '' },
      { title: 'Ưu đãi thanh toán', href: '' },
      { title: 'Bảo hành điện thoại', href: '' },
      { title: 'Bảo hành mở rộng', href: '' },
      { title: 'Chính sách bảo hành', href: '' },
    ],
  },
  {
    title: 'Sản phẩm',
    children: [
      { title: 'Smart Phone', href: '' },
      { title: 'Phụ kiện', href: '' },
    ],
  },
  {
    title: 'Liên hệ',
    children: [
      { title: 'Mail: teams@techcell.cloud', href: '' },
      { title: 'Hotline: 0019 8942', href: '' },
    ],
  },
];

const socialsIcon = [Facebook, Github, Linkedin];


const Footer = () => {
  return (
    <div className="pt-12 px-[100px]">
      <div className="flex flex-row">
        <div className="basis-3/6">
          <Image src={Logo} alt="logo" width={150} height={54} />
          <article className="text-sm pr-[90px] py-3">
            Tận hưởng Cuộc Sống Kỹ Thuật Số với Techcell - Nơi Nâng Tầm Trải Nghiệm
            Điện Thoại. Sự hoàn hảo gặp gỡ thiết kế đẳng cấp, để mỗi cuộc gọi, mỗi
            cử chỉ đều trở thành một trải nghiệm không thể quên. Khám phá ngay với
            Techcell - Nơi Thăng Hoa Công Nghệ!
          </article>

          {socialsIcon.map((Icon, i) => (
            <Button key={i} className="mr-2">
              <Icon />
            </Button>
          ))}

        </div>
        {links.map((link) => (
          <div className="basis-1/6" key={link.title}>
            <div className="py-3 text-lg font-semibold">
              {link.title}
            </div>
            <ul>
              {link.children.map((item) => (
                <li key={item.href} className="hover:text-[#ee4949]">
                  <Link href={item.href} >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <hr className="my-6" />
      <div className="flex justify-between pb-5">
        <span className="text-sm"> © 2023, made with ❤️ by <b>Techcell Team</b></span>
        <div className="flex flex-row gap-5">
          <Link
            href='https://admin.techcell.cloud'
            target='_blank'
            style={{ fontWeight: 600, fontSize: '14px' }}
          >
            Admin
          </Link>
          <Link
            href='https://docs.techcell.cloud'
            target='_blank'
            style={{ fontWeight: 600, fontSize: '14px' }}
          >
            Documentation
          </Link>
          <Link
            href='mailto:teams@techcell.cloud'
            style={{ fontWeight: 600, fontSize: '14px' }}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;