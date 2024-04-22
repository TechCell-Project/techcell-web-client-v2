import { ApiTags } from '@/constants';
import http from '@/lib/http';
import {
  ProductDto,
  ProductInfinityPaginationResult,
  ProductsApiProductsControllerGetProductByIdRequest,
  ProductsApiProductsControllerGetProductsRequest,
} from '@techcell/node-sdk';
import { publicHeaders } from '@/apiRequests';

const ApiProduct = ApiTags.Products;

export const productApiRequest = {
  getProducts: (payload: ProductsApiProductsControllerGetProductsRequest) => {
    const { page, limit, filters, sort } = payload;

    let url = `${ApiProduct}`;

    if (page || limit || filters || sort) {
      url += `?`;
      if (page) {
        url += `page=${page}&`;
      }
      if (limit) {
        url += `limit=${limit}&`;
      }
      if (filters) {
        url += `filters=${filters}&`;
      }
      if (sort) {
        url += `sort=${sort}&`;
      }
    }

    return http.get<ProductInfinityPaginationResult>(url, { headers: publicHeaders });
  },

  getProductById: (payload: ProductsApiProductsControllerGetProductByIdRequest) =>
    http.get<ProductDto>(`${ApiProduct}/${payload.productId}`, { headers: publicHeaders }),
};
