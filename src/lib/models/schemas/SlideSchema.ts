import {model, models, Schema} from 'mongoose';
import { ISlide } from '../interfaces/ISlide';

const SlideSchema = new Schema<ISlide>({
  slideName: { type: String, required: true },
  slidePic: { type: String, required: true },
  slideDesc: { type: String }
});

const Slide = mongoose.model('Slide', SlideSchema);
export default Slide;