import { ApiTags, DEFAULT_LIMIT } from '@/constants';
import http from '@/lib/http';
import {
  ProductDto,
  ProductInfinityPaginationResult,
  ProductsApiProductsControllerGetProductByIdRequest,
  ProductsApiProductsControllerGetProductsRequest,
} from '@techcell/node-sdk';
import { publicHeaders, revalidateRequest } from '@/apiRequests';

const ApiProduct = ApiTags.Products;

export const productApiRequest = {
  getProducts: (payload: ProductsApiProductsControllerGetProductsRequest) => {
    const { page, limit, filters, sort } = payload;

    let url = `${ApiProduct}`;
    const params = new URLSearchParams();

    // url += `?limit=${limit ?? DEFAULT_LIMIT}`;

    // if (page || filters || sort) {
    //   if (page) {
    //     url += `&page=${page}`;
    //   }
    //   if (filters) {
    //     url += `&filters=${filters}`;
    //   }
    //   if (sort) {
    //     url += `&sort=${sort}`;
    //   }
    // }
    Object.entries({page, limit, filters, sort}).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      params.set(key, String(value));
    })

    url += `?${params.toString()}`;

    return http.get<ProductInfinityPaginationResult>(url, {
      headers: publicHeaders,
      cache: 'no-store',
    });
  },

  getProductById: (payload: ProductsApiProductsControllerGetProductByIdRequest) =>
    http.get<ProductDto>(`${ApiProduct}/${payload.productId}`, {
      headers: publicHeaders,
      next: revalidateRequest,
    }),

  getProductInCart: (payload: ProductsApiProductsControllerGetProductByIdRequest) =>
    http.get<ProductDto>(`${ApiProduct}/${payload.productId}`, {
      headers: publicHeaders,
      cache: 'no-store',
    }),
};
