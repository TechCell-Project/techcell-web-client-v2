import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Cart as CartDto, UpdateCartDto } from '@techcell/node-sdk';
import { MessageResType } from '@/validationSchemas';

const ApiPrefix = ApiTags.Cart;

export const cartApiRequest = {
  getCarts: (sessionToken: string) =>
    http.get<CartDto>(`${ApiPrefix}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  getCartsFromNextClientToServer: () => http.get<CartDto>(ApiPrefix),

  addProductToCart: (payload: UpdateCartDto, sessionToken: string) =>
    http.post<MessageResType>(ApiPrefix, payload, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),

  addToCartClient: (payload: UpdateCartDto) => http.post<MessageResType>(ApiPrefix, payload),

  updateCartClient: (payload: UpdateCartDto) => http.post<MessageResType>(ApiPrefix, payload),
};
