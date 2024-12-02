import { Types } from 'mongoose';
import { ICartItem } from './ICartItem';

export interface IShoppingCart {
  cartId: Types.ObjectId;
  quantity: number;
  dateAdded: Date;
  cartItems: ICartItem[];
}
