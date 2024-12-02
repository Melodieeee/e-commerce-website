import {model, models, Schema} from 'mongoose';
import { IPromotionBar } from '../interfaces/IPromotionBar';

const PromotionBarSchema = new Schema<IPromotionBar>({
  title: { type: String, required: true }
});

const PromotionBar = models.PromotionBar || model('PromotionBar', PromotionBarSchema);
export default PromotionBar;