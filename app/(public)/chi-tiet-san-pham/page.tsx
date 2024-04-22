import LoadingPage from "@/app/loading";
import DetailProductPage from "@/components/product/detail-product-page";
import { Suspense } from "react";

const DetailProduct = () => {
    return (
        <Suspense fallback={<LoadingPage />}>
            <DetailProductPage />
        </Suspense>
    );
}

export default DetailProduct;