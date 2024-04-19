'use client';

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import CartEmpty from "./cart-empty";
import ListProductCart from "./list-product-cart";
import CartSuggest from "./cart-suggest";

const CartPage = () => {
    return (
        <div className="container">
            < div className=" flex flex-col justifu-center items-center">
                <div className="flex flex-col py-[20px]">
                    <div className="flex flex-row items-center my-2">
                        <Link href="/">
                            <ArrowLeft className="size-[35px]" />
                        </Link>
                        <span className="text-[25px] font-semibold w-[600px] text-center">Giỏ hàng của bạn</span>
                    </div>
                    <Separator />
                </div>
                <CartEmpty />
                <ListProductCart />
            </div>
            <CartSuggest />
        </div>
    );
}

export default CartPage;