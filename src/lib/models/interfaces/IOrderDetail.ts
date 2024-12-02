import { Types } from 'mongoose';
import { ICustomChoice } from './ICustomChoice';

export interface IOrderDetail {
  orderId: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  unitCost: number;
  subtotal: number;
  customChoices: ICustomChoice[];
  customPic: string;
  specificInstruction: string;
}