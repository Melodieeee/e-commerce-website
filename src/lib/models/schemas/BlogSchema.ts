import {model, models, Schema} from 'mongoose';
import { IBlog } from '../interfaces/IBlog';

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  publishDate: { type: Date, required: true },
  isDeleted: { type: Boolean, default: false },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogCategory' }
});

export const Blog = models.Blog || model('Blog', BlogSchema);