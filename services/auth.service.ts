import { axiosPublic } from '@/lib/axios';
import { AuthApi } from '@techcell/node-sdk';

export function authApi() {
    return new AuthApi(undefined, undefined, axiosPublic);
}
