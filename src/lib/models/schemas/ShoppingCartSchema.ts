import mongoose from 'mongoose';
import { CartItem } from './CartItemSchema';

const ShoppingCartSchema = new mongoose.Schema({
  cartId: { type: String, required: true, unique: true },
  quantity: { type: Number, required: true },
  dateAdded: { type: Date, required: true },
  cartItems: { type: [CartItem], required: true }
});

const ShoppingCart = mongoose.model('ShoppingCart', ShoppingCartSchema);
export default ShoppingCart;