import { ApiTags, DEFAULT_LIMIT } from '@/constants';
import http from '@/lib/http';
import {
  CreateOrderDto,
  Order,
  OrderInfinityPaginationResult,
  OrdersApiOrdersControllerGetOrdersRequest,
  PreviewOrderDto,
  PreviewOrderResponseDto,
} from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Order;

export const orderApiRequest = {
  previewOrder: (payload: PreviewOrderDto) =>
    http.post<PreviewOrderResponseDto>(`${ApiPrefix}/preview`, payload),

  createOrder: (payload: CreateOrderDto) => http.post<Order>(ApiPrefix, payload),

  getOrders: (payload: OrdersApiOrdersControllerGetOrdersRequest) => {
    const { page, limit, filters, sort } = payload;

    let url = `${ApiPrefix}`;

    url += `?limit=${limit ?? DEFAULT_LIMIT}`;

    if (page || filters || sort) {
      if (page) {
        url += `&page=${page}`;
      }
      if (filters) {
        url += `&filters=${filters}`;
      }
      if (sort) {
        url += `&sort=${sort}`;
      }
    }

    return http.get<OrderInfinityPaginationResult>(url);
  },

  getOrderById: (orderId: string) => http.get<Order>(`${ApiPrefix}/${orderId}`),
};
