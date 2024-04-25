import http from '@/lib/http';
import { ApiTags } from '@/constants';
import { Brand, BrandInfinityPaginationResult } from '@techcell/node-sdk';

export const getListBrandApi = () => http.get<Brand>(`${ApiTags.Brand}`);

const ApiBrand = ApiTags.Brand;

export const brandApiRequest = {
  getListBrand: () => http.get<BrandInfinityPaginationResult>(`${ApiBrand}?limit=20`),

  getBrandById: (brandId: string) => http.get<Brand>(`${ApiBrand}/${brandId}`),
};
