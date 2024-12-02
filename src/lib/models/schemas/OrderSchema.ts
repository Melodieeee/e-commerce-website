import {model, models, Schema} from 'mongoose';
import { IOrder } from '../interfaces/IOrder';

const OrderSchema = new Schema<IOrder>({
  shippingInfoId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingInfo', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  dateCreated: { type: Date, required: true },
  dateCompleted: { type: Date },
  customerName: { type: String, required: true },
  status: { type: String, required: true },
  guestEmail: { type: String },
  priceTotalBfTax: { type: Number, required: true },
  tax: { type: Number, required: true },
  payment: { type: String, required: true },
  billingAddress: { type: String, required: true }
}, { timestamps: true });

const Order = models.Order || model('Order', OrderSchema);
export default Order;