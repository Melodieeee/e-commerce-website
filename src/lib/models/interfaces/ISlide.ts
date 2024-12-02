import { Types } from 'mongoose';
export interface ISlide {
    slideId: Types.ObjectId;
    slideName: string;
    slidePic: string;
    slideDesc: string;
}
