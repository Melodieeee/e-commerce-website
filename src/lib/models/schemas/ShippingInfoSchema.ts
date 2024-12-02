import {model, models, Schema} from 'mongoose';
import { IShippingInfo } from '../interfaces/IShippingInfo';

const ShippingInfoSchema = new Schema<IShippingInfo>({
  shippingInfoId: { type: mongoose.Schema.Types.ObjectId, required: true },
  shippingMethod: { type: String, required: true }
});

const ShippingInfo = models.ShippingInfo || model('ShippingInfo', ShippingInfoSchema);
export default ShippingInfo;