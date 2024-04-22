import http from '@/lib/http';
import { Brand } from '@/components/brands/models';
import { ApiTags } from '@/constants';

const ApiPrefix = ApiTags.Brand;

export const brandApi = {

    getListBrands: () => http.get<{ data: Brand[]; hasNextPage: boolean }>(`${ApiPrefix}`),


};