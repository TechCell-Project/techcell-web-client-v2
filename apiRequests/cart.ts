import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Cart } from '@/components/cart/models';
import { Cart as CartDto, ProductCartSchema, UpdateCartDto } from '@techcell/node-sdk';
import { MessageResType } from '@/validationSchemas';

const ApiPrefix = ApiTags.Cart;

export const cartApiRequest = {
  getCartsFromNextServerToServer: (sessionToken: string) =>
    http.get<{ data: Cart }>(`${ApiPrefix}`, {
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
};
