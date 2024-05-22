import OrderListProduct from "@/components/order/order-list-product";
import { List_Order } from "@/constants/common";

const CompleteOrderPage = () => {
    return (
        <>
            {List_Order.filter(product => product.payment.status === "completed").map((product) => (
                <OrderListProduct key={product.skuId} product={product} />
            ))}
        </>
    );
}

export default CompleteOrderPage;