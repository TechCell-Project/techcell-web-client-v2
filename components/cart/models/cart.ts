import { Timestamp } from '@/common/model';
import { Cart as CartDto, ProductCartSchema } from '@techcell/node-sdk';

export class Cart extends Timestamp implements CartDto {
    _id: string = '';
    userId: string = '';
    products: ProductCartSchema[] = [];
}
