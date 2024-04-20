import LoadingPage from "@/app/loading";
import CartPage from "@/components/cart/cart-page";
import { Suspense } from "react";

const Cart = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <CartPage />
        </Suspense>
    );
}

export default Cart;