import {model, models, Schema} from 'mongoose';
import {ISelection} from '../interfaces/ISelection';

const SelectionSchema = new Schema<ISelection>({
  selectionName: { type: String, required: true },
  price: { type: Number, required: true },
  hasExplainPic: { type: Boolean, required: true },
  explainPic: { type: String, required: false },
  customChoice: { type: String, required: false }
});

const Selection = models.Selection || model('Selection', SelectionSchema);
export default Selection;