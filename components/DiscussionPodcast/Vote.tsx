import React from "react";
import Dp from "../Common/Dp";
import UserName from "../Common/UserName";

type VoteProps = {
  participant: {
    name: string;
    dpUrl: string;
    votes: number;
    votePercentage: number;
  };
  isVotedByCurrentUser?: boolean;
};

export default function Vote({ participant, isVotedByCurrentUser = false }: VoteProps) {
  return (
    <div className={`flex items-center gap-4 mb-4 p-2 rounded-lg ${
      isVotedByCurrentUser ? 'bg-black/10' : ''
    }`}>
      <div className="relative">
        <Dp url={participant.dpUrl} size="sm" />
        <div className="absolute -top-2 -right-2 bg-t5-black text-t5-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {participant.votes}
        </div>
      </div>
      
      <div className="flex-1">
        <UserName name={participant.name} size="md" />
        <div className="relative w-full h-6 bg-t5-white rounded-full mt-1 border">
          <div 
            className="h-full bg-t5-black rounded-full transition-all duration-300 flex items-center justify-center"
            style={{ width: `${participant.votePercentage}%` }}
          >
            {participant.votePercentage > 15 && (
              <span className="text-t5-white text-xs font-medium">
                {participant.votePercentage.toFixed(1)}%
              </span>
            )}
          </div>
          {participant.votePercentage <= 15 && (
            <span className="absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 text-xs text-gray-500">
              {participant.votePercentage.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
