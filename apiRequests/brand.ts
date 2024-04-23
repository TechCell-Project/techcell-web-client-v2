import http from '@/lib/http';
import { Brand } from '@/components/brands/models';
import { ApiTags } from '@/constants';
import { BrandInfinityPaginationResult } from '@techcell/node-sdk';

export const getListBrandApi = () => http.get<Brand>(`${ApiTags.Brand}`);

const ApiBrand = ApiTags.Brand;

export const brandApiRequest = {
  getListBrand: () => http.get<BrandInfinityPaginationResult>(`${ApiBrand}?limit=20`),
};
