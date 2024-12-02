import { Types } from 'mongoose';
import { ICustomChoice } from './ICustomChoice';
import { IProduct } from './IProduct';
import { ISelection } from './ISelection';

// export interface ICartItem {
//   productId: Types.ObjectId;
//   quantity: number;
//   unitCost: number;
//   subtotal: number;
//   customChoices: ICustomChoice[];
//   customPic: string;
//   specificInstruction: string;
// }

export interface ICartItem {
  cartItemId: Types.ObjectId;
  addTime: Date;
  product: IProduct;
  unitPrice: number;
  quantity: number;
  promoPercentageOff: number;
  bulkDiscountPercentageOff: number;
  subtotal: number; // unitPrice * quantity * (1 - promoPercentageOff) / 100 * (1 - bulkDiscountPercentageOff) / 100
  customChoices: { [ key: string ]: ISelection };
  //customPics: File[];
  customPics: { name: string; url: string }[]; // Updated customPics property
  specificInstruction: string;
}

export const getBulkDiscountFromQuantity = ( product: IProduct, quantity: number) 
: { index: number; bulkDiscountPercentageOff: number } => {

  // Find the last index of bulk discounts array
  let lastIndex = -1;
  product.bulkDiscounts.forEach((bulkDiscount, currentIndex) => {
    if (quantity >= bulkDiscount.quantity) {
      lastIndex = currentIndex;
    }
  });

  if (lastIndex === -1) {
    return { index: -1, bulkDiscountPercentageOff: 0 };
  } else {
    return {
      index: lastIndex,
      bulkDiscountPercentageOff: product.bulkDiscounts[lastIndex].percentageOff,
    };
  }
};

export const calculateCartItemSubtotal = (item: ICartItem): number => {
  return parseFloat(
    (
      item.unitPrice *
      item.quantity *
      (1 - item.promoPercentageOff / 100) *
      (1 - item.bulkDiscountPercentageOff / 100)
    ).toFixed(2)
  );
};

