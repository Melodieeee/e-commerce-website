import { Types } from 'mongoose';
export interface IProductType {
    typeId: Types.ObjectId;
    typeName: string;
    description: string;
}