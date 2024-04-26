'use client';

import { ListProduct } from "../home/list-product";

const CartSuggest = () => {
    return (
        <div className="flex flex-col container">
            <span className="text-xl font-semibold pt-[50px] uppercase">Có thể bạn sẽ thích</span>
            <div className="py-[20px]">
                <ListProduct />
            </div>
        </div>
    );
}

export default CartSuggest;