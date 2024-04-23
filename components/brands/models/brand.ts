import { Timestamp } from '@/common/model';
import { Brand as BrandDto, BrandStatusEnum } from '@techcell/node-sdk';

export class Brand extends Timestamp implements BrandDto {
  _id: string = '';
  slug: string = '';
  name: string = '';
  description: string = '';
  status = BrandStatusEnum.Active;
}
