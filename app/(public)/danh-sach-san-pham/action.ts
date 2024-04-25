"use server";

import { productApiRequest } from "@/apiRequests/product";
import { ProductsApiProductsControllerGetProductsRequest } from "@techcell/node-sdk";

export async function getProducts({ page, filters, sort, limit }: ProductsApiProductsControllerGetProductsRequest) {
    const { payload } = await productApiRequest.getProducts({ page, filters, sort, limit });

    return payload;
}