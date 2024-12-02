import { IAddress } from './IAddress'
import { IShoppingCart } from './IShoppingCart'
import { Types, Document } from 'mongoose'

export interface ICustomer extends Document {
    customerId: Types.ObjectId;
    email: string;
    password: string;
    isLogin: boolean;
    registerDate: Date;
    firstName: string;
    lastName: string;
    addresses: IAddress[];
    phone: string;
    birthday: Date;
    emailVerified: boolean;
    phoneVerified: boolean;
    shoppingCart: IShoppingCart;
  }
