import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Cart } from '@/components/cart/models';
import { ProductCartSchema } from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Cart;

export const cartApi = {

    getListCarts: (sessionToken: string) => http.get<{data: Cart}>(`${ApiPrefix}`, {
        headers: {
            Authorization: `Bearer ${sessionToken}`,
        },
    }),

};