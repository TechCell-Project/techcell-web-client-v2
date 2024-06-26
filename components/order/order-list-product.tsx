import Image from 'next/image';
import { ProductSchema } from '@techcell/node-sdk';

import AlternativeImg from '@/public/phone-test/15-promax.jpg';
import { currencyFormat } from '@/utilities/func.util';

interface OrderListProductProps {
  products: ProductSchema[];
}

export const OrderListProduct = ({ products }: OrderListProductProps) => {
  return (
    <div className="w-auto sm:w-[full] h-auto m-auto bg-white my-3 p-4 sm:p-0 sm:py-4">
      <div className="">
        <div className="text-center">
          <div className="text-[20px] font-bold ml-2">Tất cả sản phẩm</div>
        </div>
        <div className="flex flex-col">
          {products.map((phone) => (
            <div key={phone.skuId} className="w-full h-full">
              <div className="flex flex-row mb-1 pt-5 bg-white items-center rounded-xl">
                <div className="w-[115px] h-[75px] sm:w-[100px] sm:h-[100px]">
                  <Image
                    src={phone.image?.url ?? AlternativeImg.src}
                    alt={phone.productName}
                    width={200}
                    height={200}
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
                <div className="flex flex-row justify-between w-full items-center">
                  <div className="flex flex-col ml-4">
                    <span className="text-lg font-semiblod">{phone.productName}</span>
                    <span>{phone.productType}</span>
                    <span className="text-[#ee4949] text-lg font-semiblod">
                      {currencyFormat(
                        phone.unitPrice.special !== 0
                          ? phone.unitPrice.special
                          : phone.unitPrice.base,
                      )}
                      đ
                      {phone.unitPrice.special !== 0 && (
                        <span className="ml-2 text-slate-500 text-base line-through">
                          {phone.unitPrice.base}đ
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="">
                    <span className="text-xs sm:text-lg ">Số lượng : {phone.quantity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};