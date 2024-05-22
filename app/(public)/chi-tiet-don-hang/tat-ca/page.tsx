import OrderListProduct from "@/components/order/order-list-product";
import { List_Order } from "@/constants/common";


const AllOrderPage = () => {
    return (
        <>
            {List_Order.map((product) => (
                <OrderListProduct key={product.skuId} product={product} />
            ))}
        </>
    );
}

export default AllOrderPage;