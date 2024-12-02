import { Types } from 'mongoose';
export interface IUPSInfo {
    shippingInfoId: Types.ObjectId;
    UPSNumber: string;
    shippingAddress: string;
    shippingCost: number;
    shippingNote: string;
}