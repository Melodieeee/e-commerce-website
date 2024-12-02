import {model, models, Schema} from 'mongoose';
import { IAddress } from '../interfaces/IAddress';

const AddressSchema = new Schema<IAddress>({
  streetAddress: { type: String, required: true },
  streetAddress2: { type: String },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  instructions: { type: String },
  addressType: { type: Number, required: true }
});

const Address = models.Address || model('Address', AddressSchema);
export default Address