import {model, models, Schema} from 'mongoose';
import { ICustomChoice } from '../interfaces/ICustomChoice';

const CustomChoiceSchema = new Schema<ICustomChoice>({
  attributeName: { type: String, required: true },
  selectionName: { type: String, required: true }
});

const CustomChoice = models.CustomChoice || model('CustomChoice', CustomChoiceSchema);
export default CustomChoice;