import { Types } from 'mongoose';
export interface ITeamMember {
    teamMemberId: Types.ObjectId;
    name: string;
    profilePic: string;
    phone: string;
    position: string;
    title: string;
}