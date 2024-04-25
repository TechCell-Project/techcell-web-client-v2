'use client';

import { PHONE_TEST } from "@/constants/phone-test";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { calculateSaleOffPercentage, currencyFormat } from "@/utilities/func.util";

const CartSuggest = () => {
    return (
        <div className="flex flex-col py-10">
            <span className="text-xl font-semibold pb-[20px] uppercase">Có thể bạn sẽ thích</span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
                {PHONE_TEST.map((phone) => (
                    <Link
                        href={''}
                        key={phone.name}
                        className="flex flex-col bg-white p-2 justify-center rounded-xl cursor-pointer hover:scale-105 hover:transition duration-150 ease-in-out"
                    >
                        <div className="w-[100px] h-[100px] sm:w-[180px] sm:h-[180px] m-auto">
                            <Image
                                src={phone.image[0].url}
                                alt={phone.name}
                                width={400}
                                height={400}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover',
                                    display: 'block',
                                }}
                            />
                        </div>
                        <span className="font-bold text-sm pt-4">{phone.modelName}</span>
                        <div className="w-full flex flex-col sm:flex sm:flex-row sm:items-center ">
                            <div className="text-md font-bold sm:text-lg my-2 text-[#ee4949] font-semiblod">
                                {currencyFormat(Number(phone.price[0].special))}
                                <sup>đ</sup>
                            </div>
                            <div className="text-xs mb-2 sm:ml-2 sm:text-sm sm:my-2 text-slate-500 line-through">
                                {currencyFormat(Number(phone.price[0].base))}
                                <sup>đ</sup>
                            </div>
                        </div>

                        {/*  */}
                        <div className="text-xs p-2 rounded-md border border-solid border-slate-[#e5e7eb] bg-[#f3f4f6]">
                            Giảm giá đến :{' '}
                            <span className="text-sm text-[#ee4949] font-bold">
                                {calculateSaleOffPercentage(phone.price[0].base, phone.price[0].special)} %
                            </span>{' '}
                            và nhiều khuyến mại hấp dẫn khác
                        </div>

                        {/*  */}
                        <div className="pb-2 pt-4 flex justify-between items-center">
                            <Button
                                variant="default"
                                className="hidden sm:flex text-[#ee4949] border border-solid border-rose-300 bg-white hover:bg-white items-center"
                            >
                                Thêm giỏ hàng
                            </Button>
                            <Button
                                variant="outline"
                                className="text-white bg-[#ee4949] hover:bg-[#ee4949] hover:text-white"
                            >
                                Mua ngay
                            </Button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CartSuggest;