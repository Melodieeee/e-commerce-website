import { Types } from 'mongoose';

export interface IBlogCategory {
    categoryId: Types.ObjectId;
    categoryName: string;
    totalArticle: number;
}