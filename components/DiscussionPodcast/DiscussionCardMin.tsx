import React from "react";
import { PiPlayCircleThin } from "react-icons/pi";
import Player from "../Audio/Player";
import Subtile from "../Common/Subtile";
import Dp from "../Common/Dp";
import UserName from "../Common/UserName";
import ParticipantHolder from "./ParticipantHolder";
import Comments from "../Common/Comments";
import Listens from "../Common/Listens";
import Discussion from "../Common/Discussion";
import ButtonSolid from "../Common/ButtonSolid";
type disccssion = {
  id: number;
  username: string;
  message: string;
  createdAt: string;
  replies: Array<disccssion>;
};
type DiscussionCardProps = {
  discussion?: disccssion;
  upComing?: boolean;
};

export default function DiscussionCard({
  discussion,
  upComing = false,
}: DiscussionCardProps) {
  return (
    <div className="bg-t5-white-lite rounded-xl p-4 my-2 disccussion-card border">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">@Lean Startup</p>
        <p className="text-xs">20 mins ago</p>
      </div>
      <h2 className="text-base font-medium my-2 truncate">
        What is the cost of a Zudio franchise in India?
      </h2>
      <div className="my-0">
        <Player audioUrl="/audio/demo/file_example_OOG_1MG.ogg" />
      </div>
    </div>
  );
}
