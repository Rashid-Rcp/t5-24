"use client";
import React from 'react';
import ModalWraper from '../Modal/ModalWraper';
import Subtile from '../Common/Subtile';
import Dp from '../Common/Dp';
import UserName from '../Common/UserName';
import { DiscussionInfo as DiscussionInfoType } from '@/Type/discussion';
import Button from '@mui/material/Button';

interface DiscussionInfoProps {
  discussion?: DiscussionInfoType;
  onClose: () => void;
}

const DiscussionInfo: React.FC<DiscussionInfoProps> = ({ discussion, onClose }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };


  return (
    <ModalWraper width="w-1/3" close={true} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <Subtile title="Created By" />
          <div className="flex items-center gap-2 mt-2">
            <Dp url={discussion?.createdBy?.profileImage || null} size="sm" />
            <UserName name={discussion?.createdBy?.fullName || ""} size="sm" />
          </div>
        </div>

        <div>
          <Subtile title="Schedule Date" />
          <p className="text-sm mt-2">
            {discussion?.scheduleDate ? formatDate(discussion.scheduleDate) : "Not scheduled"}
          </p>
        </div>

        <div>
          <Subtile title="Duration" />
          <p className="text-sm mt-2">{discussion?.duration || 0} minutes</p>
        </div>

        <div>
          <Subtile title="Moderator" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mt-2">
              <Dp url={discussion?.moderator?.profileImage || null} size="sm" />
              <UserName name={discussion?.moderator?.fullName || ""} size="sm" />
            </div>
            <span className={`text-xs px-2 py-1 rounded capitalize ${
                 discussion?.acceptedBy?.some((acceptedBy: any) => acceptedBy._id === discussion?.moderator._id)
                    ? 'bg-green-100 text-green-600'
                    : discussion?.rejectedBy?.some((rejectedBy: any) => rejectedBy._id === discussion?.moderator._id)
                    ? 'bg-red-100 text-red-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {discussion?.acceptedBy?.some((acceptedBy: any) => acceptedBy._id === discussion?.moderator._id) ? "Accepted" : discussion?.rejectedBy?.some((rejectedBy: any) => rejectedBy._id === discussion?.moderator._id) ? "Rejected" : "Pending"}
                </span>
          </div>
        </div>

        <div>
          <Subtile title="Participants" />
          <div className="flex flex-col gap-2 mt-2">
            {discussion?.participants?.map((participant) => {
              let participant_status = "pending"
              if(discussion.acceptedBy?.some((acceptedBy: any) => acceptedBy._id === participant._id)) participant_status = "accepted"
              if(discussion.rejectedBy?.some((rejectedBy: any) => rejectedBy._id === participant._id)) participant_status = "rejected"

              return (
              <div key={participant._id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Dp url={participant.profileImage || null} size="sm" />
                  <UserName name={participant.fullName || ""} size="sm" />
                </div>
                <span className={`text-xs px-2 py-1 rounded capitalize ${
                  participant_status === 'accepted' 
                    ? 'bg-green-100 text-green-600'
                    : participant_status === 'pending'
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {participant_status}
                </span>
              </div>
            )})}
          </div>
        </div>
      </div>
    </ModalWraper>
  );
};

export default DiscussionInfo;
