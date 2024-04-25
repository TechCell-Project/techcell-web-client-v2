import { Brand, VariationDto } from "@techcell/node-sdk";

export type ProductCart = {
    productId: string;
    productName: string;
    brand: Brand;
    variation: VariationDto;
    quantity: number;
  }