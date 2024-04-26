'use client';

import { ListProduct } from "../home/list-product";

const CartSuggest = () => {
    return (
        <div className="flex flex-col container">
            <span className="text-xl font-semibold py-[20px] uppercase">Có thể bạn sẽ thích</span>
            <ListProduct />
        </div>
    );
}

export default CartSuggest;