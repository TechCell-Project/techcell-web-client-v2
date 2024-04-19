'use client';

import { PHONE_TEST } from "@/constants/phone-test";
import Image from "next/image";

const CartSuggest = () => {
    return (
        <div className="flex flex-col py-[50px]">
            <span className="text-xl font-semibold pb-[25px] uppercase">Có thể bạn sẽ thích</span>
            <div className="grid grid-cols-4 gap-2">
                {PHONE_TEST.map((phone) => (
                    <div key={phone.name} className="flex flex-col bg-white p-2 justify-center items-center  rounded-xl">
                        <div className="w-[180px] h-[180px]">
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
                        <span>{phone.name}</span>
                        {/* <div className="flex flex-row justify-between">
                            <span className=" text-[#ee4949] text-lg font-semiblod">
                                {phone.price[0].special}đ
                            </span>
                            <span className="text-slate-500 text-base line-through">
                                {phone.price[0].base}đ
                            </span>
                        </div> */}
                        <span className="my-2 text-[#ee4949] text-lg font-semiblod">
                            {phone.price[0].special}đ
                            <span className="ml-2 text-slate-500 text-base line-through">
                                {phone.price[0].base}đ
                            </span>
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CartSuggest;