import OrderDetailComponent from "@/components/order/order-detail";
import OrderListProduct from "@/components/order/order-list-product";

const OrderDetail = () => {
    return (
        <>
            <OrderListProduct />
            <OrderDetailComponent />
        </>
    );
};

export default OrderDetail;