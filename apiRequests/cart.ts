import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Cart } from '@techcell/node-sdk';

const ApiPrefix = ApiTags.Cart;

export const cartApi = {

    getListCarts: (sessionToken: string) => http.get<Cart>(`${ApiPrefix}`, {
        headers: {
            Authorization: `Bearer ${sessionToken}`,
        },
    }),

};