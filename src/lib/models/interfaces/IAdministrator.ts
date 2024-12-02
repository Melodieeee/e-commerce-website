import { Types } from 'mongoose';

export interface IAdministrator {
  adminId: Types.ObjectId;
  email: string;
  password: string;
  isLogin: boolean;
  registerDate: Date;
  adminName: string;
}

