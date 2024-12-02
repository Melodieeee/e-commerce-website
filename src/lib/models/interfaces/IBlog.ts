import { Types } from 'mongoose';

export interface IBlog {
    blogId: Types.ObjectId;
    title: string;
    content: string;
    author: string;
    publishDate: Date;
    isDeleted: boolean;
    category: string;
}