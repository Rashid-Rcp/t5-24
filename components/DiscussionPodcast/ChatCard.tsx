import React from "react";
import Player from "../Audio/Player";
import Dp from "../Common/Dp";
import UserName from "../Common/UserName";
import ParticipantHolder from "./ParticipantHolder";
import Reactions from "./Reactions";


type ChatCardProps = {
  audioUrl: string;
  participant: {
    name: string;
    dpUrl: string;
  };
};

export default function ChatCard({ audioUrl, participant }: ChatCardProps) {
  return (
    <div className="flex items-start justify-between mt-2 mb-4 gap-1">
      <div className="">
        <ParticipantHolder>
          <Dp url={participant.dpUrl} size="sm" />
        </ParticipantHolder>
      </div>
      <div className="relative flex-1 bg-t5-white-lite rounded-tr-xl rounded-bl-xl rounded-br-xl border my-0 min-h-[100px] p-2 before:content-[''] before:absolute before:-left-[10px] before:top-3 before:w-0 before:h-0 before:border-[10px] before:border-transparent before:border-r-t5-white-lite">
        <UserName name={participant.name} size="md" />
        <Player audioUrl={audioUrl} />
        <div className="absolute bottom-2 left-4">
          <Reactions/>
        </div>
      </div>
    </div>
  );
}
