'use client';

import { PHONE_TEST } from "@/constants/phone-test";
import Image from 'next/image';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

const ListProductCart = async () => {

    return (
        <div className="flex flex-col w-full sm:w-[600px]">
            <div className="flex flex-row items-center mb-2 ml-[1px] p-2">
                <Checkbox />
                <p className="ml-2 text-[16px] sm:text-[20px]">Chọn tất cả</p>
            </div>
            {PHONE_TEST.map((phone) => (
                <div key={phone.name} className="w-full h-full">
                    <div className="flex flex-row mb-1 p-2 bg-white items-center rounded-xl">
                        <Checkbox className="mr-2"/>
                        <div className="w-[200px] h-[120px] sm:w-[160px] sm:h-[160px]">
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
                        <div className="flex flex-row justify-between w-[443px] items-center">
                            <div className="flex flex-col ml-4">
                                <span className="text-[14px] sm:text-[18px] font-semiblod">{phone.name}</span>
                                <span className="my-2 text-[#ee4949] text-[14px] sm:text-[18px] font-semiblod">
                                    {phone.price[0].special}đ
                                    <span className="ml-2 text-slate-500 text-[14px] sm:text-[18px] line-through">
                                        {phone.price[0].base}đ
                                    </span>
                                </span>
                                <div className="flex flex-row">
                                    <Button variant="outline" size="icon">
                                        <Minus className="h-2 w-2 sm:h-4 sm:w-4" />
                                    </Button>
                                    <span className="mx-4 text-[14px] sm:text-[18px]">1</span>
                                    <Button variant="outline" size="icon">
                                        <Plus className="h-2 w-2 sm:h-4 sm:w-4" />
                                    </Button>
                                </div>

                            </div>
                            <div className="cursor-pointer">
                                <Trash2 />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex flex justify-between items-center bg-white h-[100px] p-2 rounded-xl mb-1">
                <span className="text-lg">Tạm tính:</span>
                <Button>
                    <span>Thanh toán</span>
                </Button>
            </div>
        </div>
    );
}

export default ListProductCart;