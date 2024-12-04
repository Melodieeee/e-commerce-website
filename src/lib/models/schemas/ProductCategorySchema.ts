import {model, models, Schema} from 'mongoose';
import { IProductCategory } from '../interfaces/IProductCategory';

const ProductCategorySchema = new Schema<IProductCategory>({
  name: { type: String, required: true },
  description: { type: String },
  children: { type: [String]}
});

const ProductCategory = models.ProductCategory || model('ProductCategory', ProductCategorySchema);
export default ProductCategory;