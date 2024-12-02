import {model, models, Schema} from 'mongoose';
import { ICompanyInfo } from '../interfaces/ICompanyInfo';

const CompanyInfoSchema = new Schema<ICompanyInfo>({
  companyName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
});

const CompanyInfo = models.CompanyInfo || model('CompanyInfo', CompanyInfoSchema);
export default CompanyInfo;