import {model, models, Schema} from 'mongoose';
import { IBlogCategory } from '../interfaces/IBlogCategory';

const BlogCategorySchema = new Schema<IBlogCategory>({
  categoryName: { type: String, required: true },
  totalArticle: { type: Number, default: 0 }
});

const BlogCategory = models.BlogCategory || model('BlogCategory', BlogCategorySchema);
export default BlogCategory;