import {model, models, Schema} from 'mongoose';
import { IUPSInfo } from '../interfaces/IUPSInfo';

const UPSInfoSchema = new Schema<IUPSInfo>({
  shippingInfoId: { type: mongoose.Schema.Types.ObjectId, ref: 'ShippingInfo', required: true },
  UPSNumber: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  shippingCost: { type: Number, required: true },
  shippingNote: { type: String }
});

const UPSInfo = models.UPSInfo || model('UPSInfo', UPSInfoSchema);
export default UPSInfo;