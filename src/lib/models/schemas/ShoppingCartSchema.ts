import { model, models, Schema } from 'mongoose';
import { CartItem } from './CartItemSchema';

const ShoppingCartSchema = new Schema({
  cartId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  dateAdded: { type: Date, required: true },
  cartItems: { type: [CartItem], required: true }
});

const ShoppingCart = models.ShoppingCart || model('ShoppingCart', ShoppingCartSchema);
export default ShoppingCart;