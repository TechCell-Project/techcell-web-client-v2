import OrderListProduct from "@/components/order/order-list-product";
import { List_Order } from "@/constants/common";

const WaitForPayPage = () => {
    return (
        <>
           {List_Order.filter(product => product.payment.status === "wait-for-payment").map((product) => (
                <OrderListProduct key={product.skuId} product={product} />
            ))}
        </>
    );
}

export default WaitForPayPage;