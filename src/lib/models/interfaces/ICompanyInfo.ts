import { Types } from 'mongoose';
export interface ICompanyInfo {
    companyId: Types.ObjectId;
    companyName: string;
    address: string;
    email: string;
    phone: string;
}