import { model, models, Schema } from 'mongoose';
import { IProduct } from '../interfaces/IProduct';
import Attribute from './AttributeSchema';
import BulkDiscount from './BulkDiscountSchema';

const ProductSchema = new Schema<IProduct>({
  sku: { type: String, required: true },
  //productTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductType' },
  defaultCategoryIds: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  categoryIds: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
  productName: { type: String, required: true },
  productCoverPic: { type: String, required: true },
  productPics: [{ type: String }],
  description: { type: String, required: true },
  //accessories: [{ type: mongoose.Schema.Types.ObjectId }],
  attributes: { type: [Attribute], required: true },
  minSelection: { type:[String, Number]},
  bulkDiscounts: {type: [BulkDiscount], required: true},
  promoPercentageOff: { type: Number, required: true },
  isUploadFiles: { type: Boolean}
});

const Product = models.Product || model('Product', ProductSchema);
export default Product;