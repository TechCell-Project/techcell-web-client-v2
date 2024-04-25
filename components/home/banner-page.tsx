import Image from "next/image"
import Link from "next/link"
import "../../styles/banner.css"
import { ArrowRight } from 'lucide-react';


const BannerSection = () =>{
    return(
        <>
         <section className="home_banner py-4">
            <div className="home_banner_left">
                <Image src="/banner/image.png" alt='apple banner' fill={true} objectFit="cover" />
                <div className="home_banner_left_content">
                    <span>Apple</span>
                    <h4>
                        Đặc quyền sinh viên <br /> giảm thêm 5% tối đa 300k
                    </h4>
                    <Link href={''}>
                        Khám phá ngay <ArrowRight />
                    </Link>
                </div>
            </div>
            <div className="home_banner_right">
                <div>
                    <Image src="/banner/product-bg.jpg" alt='samsung banner' fill={true} objectFit="cover" />
                    <div className="home_banner_right_content">
                        <span className="mt-5">SAMSUNG</span>
                        <h4>
                            Tưng bừng lễ hội <br /> nhập hội galaxy tab series
                        </h4>
                        <Link href={''}>
                            Khám phá ngay <ArrowRight />
                        </Link>
                    </div>
                </div>
                <div>
                    <Image src="/banner/samsung-bg.jpg" alt='product banner' fill={true} objectFit="cover" />
                    <div className="home_banner_right_content">
                        <span className="mt-5">Sản phẩm, Phụ kiện</span>
                        <h4>
                            Mua ngay, săn deal <br /> hời với Techcell
                        </h4>
                        <Link href={''}>
                            Khám phá ngay <ArrowRight />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default BannerSection;