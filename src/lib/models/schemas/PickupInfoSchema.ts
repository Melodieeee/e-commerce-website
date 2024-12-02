import {model, models, Schema} from 'mongoose';
import { IPickupInfo } from '../interfaces/IPickupInfo';

const PickupInfoSchema = new Schema<IPickupInfo>({
  shippingInfoId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingInfo', required: true },
  dateToPickup: { type: Date, required: true },
  pickupNote: { type: String }
});

const PickupInfo = models.PickupInfo || model('PickupInfo', PickupInfoSchema);
export default PickupInfo;