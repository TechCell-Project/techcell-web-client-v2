import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Cart } from '@/components/cart/models';
import { Cart as CartDto, ProductCartSchema, UpdateCartDto } from '@techcell/node-sdk';
import { MessageResType } from '@/validationSchemas';
import { revalidateRequest } from '.';


const ApiPrefix = ApiTags.Cart;

export const cartApiRequest = {
  getCarts: () => http.get<CartDto>(ApiPrefix),

  getCartsWithToken: (sessionToken: string) =>
    http.get<Cart>(`${ApiPrefix}`, {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
      cache: 'no-store',
      next: revalidateRequest,
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
