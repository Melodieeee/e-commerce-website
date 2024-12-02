import {model, models, Schema} from 'mongoose';
import {IAttribute} from '../interfaces/IAttribute';
import Selection from './SelectionSchema';

const AttributeSchema = new Schema<IAttribute>({
  optionName: { type: String, required: true },
  selections: { type: [Selection], required: true }
});

const Attribute = models.Attribute || model('Attribute', AttributeSchema);
export default Attribute;