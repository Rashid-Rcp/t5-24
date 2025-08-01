import { ClubBase } from "./club";
import { UserInfo } from "./user";

export type ParticipantInfo = UserInfo & {
  status: 'accepted' | 'pending' | 'rejected';
};

export type DiscussionInfo = {
  _id: string;
  title: string;
  slug: string;
  scheduleDate: string;
  duration: number;
  description: string;
  createdAt: string;
  updatedAt: string;
  participants: ParticipantInfo[];
  moderator: UserInfo;
  createdBy: UserInfo;
  comments?: boolean;
  commnetsCount?: number;
  votes?: boolean;
  votesCount?: number;
  listensCount?: number;
  isUpcoming?: boolean;
  club: ClubBase;
  acceptedBy?: UserInfo[];
  rejectedBy?: UserInfo[];
};
