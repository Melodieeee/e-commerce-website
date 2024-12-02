import {models, model, Schema} from 'mongoose';
import {IAdministrator} from '../interfaces/IAdministrator';

const AdministratorSchema = new Schema<IAdministrator>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isLogin: { type: Boolean, required: true },
  registerDate: { type: Date, required: true },
  adminName: { type: String, required: true }
}, { timestamps: true });

const Administrator = models.Administrator || model('Administrator', AdministratorSchema);
export default Administrator;