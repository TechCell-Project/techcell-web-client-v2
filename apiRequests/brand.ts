import { Brand } from '@/components/brands/models';
import { ApiTags } from '@/constants';
import http from '@/lib/http';

export const getListBrandApi = () => http.get<Brand>(`${ApiTags.Brand}`);
