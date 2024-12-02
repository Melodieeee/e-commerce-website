import { Types } from 'mongoose';

export interface IOrder {
    orderId: Types.ObjectId;
    shippingInfoId: string;
    customerId: string;
    dateCreated: Date;
    dateCompleted: Date;
    customerName: string;
    status: string;
    guestEmail: string;
    priceTotalBfTax: number;
    tax: number;
    payment: string;
    billingAddress: string;
}