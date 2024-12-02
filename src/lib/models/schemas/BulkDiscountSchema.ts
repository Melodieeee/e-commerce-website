import {model, models, Schema} from 'mongoose';
import { IBulkDiscount } from '../interfaces/IBulkDiscount';

const BulkDiscountSchema = new Schema<IBulkDiscount>({
    quantity: { type: Number, required: true },
    percentageOff: { type: Number, required: true }
});
const BulkDiscount = models.BulkDiscount || model('BulkDiscount', BulkDiscountSchema);
export default BulkDiscount;