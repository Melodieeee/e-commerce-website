import { Types } from 'mongoose';
export interface IPickupInfo {
    shippingInfoId: Types.ObjectId;
    dateToPickup: Date;
    pickupNote: string;
}