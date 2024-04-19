'use client';

import Link from "next/link";
import Image from "next/image";
import ImageEmpty from "@/public/cart-empty.png";
import { Button } from "../ui/button";

const CartEmpty = () => {
    return (
        <div className="flex flex-col justifu-center items-center">
            <div className="flex flex-col items-center">
                <Image src={ImageEmpty} alt="logo" width={400} className="h-full w-auto" />
                <span className="text-[18px] font-semibold">Giỏ hàng của bạn đang trống</span>
                <span className="text-[18px] font-semibold">Hãy chọn thêm sản phẩm để mua sắm nhé</span>
            </div>
            <div className="py-[62px]">
                <Link href="/">
                    <Button className="text-[18px] w-[400px] h-[50px] hover:underline" >
                        Quay lại trang chủ
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CartEmpty;