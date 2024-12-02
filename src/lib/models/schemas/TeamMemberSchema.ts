import {model, models, Schema} from 'mongoose';
import { ITeamMember } from '../interfaces/ITeamMember';

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  profilePic: { type: String },
  phone: { type: String },
  position: { type: String },
  title: { type: String }
});

const TeamMember = models.TeamMember || model('TeamMember', TeamMemberSchema);
export default TeamMember;