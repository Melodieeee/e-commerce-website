import { Types } from 'mongoose';
export interface IShippingInfo {
    shippingInfoId: Types.ObjectId;
    shippingMethod: string;
}