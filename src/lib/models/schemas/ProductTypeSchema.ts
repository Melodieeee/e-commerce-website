import {model, models, Schema} from 'mongoose';
import { IProductType } from '../interfaces/IProductType';

const ProductTypeSchema = new Schema<IProductType>({
  typeName: { type: String, required: true },
  description: { type: String }
});

const ProductType = models.ProductType || model('ProductType', ProductTypeSchema);
export default ProductType;