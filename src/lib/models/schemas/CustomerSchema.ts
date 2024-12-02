import {model, models, Schema} from 'mongoose';
import { ICustomer } from '../interfaces/ICustomer';
import Address from './AddressSchema';
import ShoppingCart from './ShoppingCartSchema';

const CustomerSchema = new Schema<ICustomer>({
  customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isLogin: { type: Boolean, required: true },
  registerDate: { type: Date, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  addresses: { type: [Address], required: true },
  phone: { type: String, required: true },
  birthday: { type: Date, required: true },
  emailVerified: { type: Boolean, required: true },
  phoneVerified: { type: Boolean, required: true },
  shoppingCart: { type: ShoppingCart, required: true }
}, { timestamps: true });

const Customer = models.Custom || model('Customer', CustomerSchema);
export default Customer;