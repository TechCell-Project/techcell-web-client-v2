import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Cart as CartDto, UpdateCartDto } from '@techcell/node-sdk';
import { MessageResType } from '@/validationSchemas';

const ApiPrefix = ApiTags.Cart;

export const cartApiRequest = {
  getCarts: (accessToken: string) =>
    http.get<CartDto>(`${ApiPrefix}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getCartsFromNextClientToServer: () => http.get<CartDto>(ApiPrefix),

  addProductToCart: (payload: UpdateCartDto, accessToken: string) =>
    http.post<MessageResType>(ApiPrefix, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  addToCartClient: (payload: UpdateCartDto) => http.post<MessageResType>(ApiPrefix, payload),

  updateCartClient: (payload: UpdateCartDto) => http.post<MessageResType>(ApiPrefix, payload),
};
