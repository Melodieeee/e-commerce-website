//import { IAttribute } from './IAttribute';
//import { IBulkDiscount } from './IBulkDiscount';

// export interface IProduct {
//   productId: string;
//   sku: string;
//   productTypeId: string;
//   productCategoryId: string;
//   productName: string;
//   productPics: string[];
//   description: string;
//   accessories: string[];
//   attributes: IAttribute[];
//   bulkDiscounts: IBulkDiscount[];
//   promoPercentageOff: number;
// }

export interface IProduct {
  productId: string;
  sku: string;
  defaultCategoryIds: string[];
  categoryIds: string[];
  productName: string;
  productCoverPic: string;
  productPics: string[];
  description: string;
  attributes: {
    optionName: string;
    selections: {
      selectionName: string;
      price: number;
      hasExplainPic: boolean;
      explainPic: string | undefined;
      customChoice: string;
    }[];
  }[];
  minSelection: [string, number];
  bulkDiscounts: {
    quantity: number;
    percentageOff: number;
  }[];
  promoPercentageOff: number;
  isUploadFiles: boolean;
}

