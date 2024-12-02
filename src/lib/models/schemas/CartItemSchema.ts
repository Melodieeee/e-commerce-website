import {model, models, Schema} from 'mongoose';
import { ICartItem } from '../interfaces/ICartItem';
import CustomChoice from './CustomChoiceSchema';

const CartItemSchema = new Schema<ICartItem>({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  addTime: { type: Date, required: true},
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  promoPercentageOff: { type: Number, required: true },
  bulkDiscountPercentageOff: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  customChoices: { type: [CustomChoice], required: true},
  customPics: { type: [String] },
  specificInstruction: { type: String }
});

export const CartItem = models.CartItem || model('CartItem', CartItemSchema);