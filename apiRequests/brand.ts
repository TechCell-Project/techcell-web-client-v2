import http from '@/lib/http';
import { Brand } from '@/components/brands/models';
import { ApiTags } from '@/constants';
import { BrandInfinityPaginationResult } from '@techcell/node-sdk';


const ApiPrefix = ApiTags.Brand;

export const brandApi = {
    getListBrands: () => http.get<{ data: Brand[]; hasNextPage: boolean }>(`${ApiPrefix}`),
};

export const brandApiRequest = {
    getListBrand: () => http.get<BrandInfinityPaginationResult>(`${ApiBrand}?limit=20`),
}
