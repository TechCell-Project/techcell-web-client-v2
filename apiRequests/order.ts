import { ApiTags, DEFAULT_LIMIT } from '@/constants';
import http from '@/lib/http';
import { MessageResType } from '@/validationSchemas';
import {
  CreateOrderDto,
  Order,
  OrderInfinityPaginationResult,
  OrdersApiOrdersControllerGetOrdersRequest,
  PreviewOrderDto,
  PreviewOrderResponseDto,
} from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Order;

const handleGetUrl = (payload: OrdersApiOrdersControllerGetOrdersRequest) => {
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

  return url;
};

export const orderApiRequest = {
  previewOrder: (payload: PreviewOrderDto) =>
    http.post<PreviewOrderResponseDto>(`${ApiPrefix}/preview`, payload),

  createOrder: (payload: CreateOrderDto) => http.post<Order>(ApiPrefix, payload),

  getOrdersServer: (payload: OrdersApiOrdersControllerGetOrdersRequest, accessToken: string) =>
    http.get<OrderInfinityPaginationResult>(handleGetUrl(payload), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getOrdersClient: (payload: OrdersApiOrdersControllerGetOrdersRequest) =>
    http.get<OrderInfinityPaginationResult>(handleGetUrl(payload)),

  getOrderByIdServer: (orderId: string, accessToken: string) =>
    http.get<Order>(`${ApiPrefix}/${orderId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getOrderById: (orderId: string) => http.get<Order>(`${ApiPrefix}/${orderId}`),

  cancelOrder: (orderId: string, reason: string) =>
    http.patch<MessageResType>(`${ApiPrefix}/${orderId}/cancel`, {
      reason,
    }),
};
