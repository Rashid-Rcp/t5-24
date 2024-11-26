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
type disccssion = {
  id: number;
  username: string;
  message: string;
  createdAt: string;
  replies: Array<disccssion>;
};

export default function () {
  return (
    <div
      className="bg-t5-white-lite rounded-xl p-4 my-2 disccussion-card border"
    >
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">@Lean Startup</p>
        <p className="text-xs">20 mins ago</p>
      </div>
      <h1 className="text-base font-medium my-2">
        What is the cost of a Zudio franchise in India?
      </h1>
      <div className="my-0">
        <Player audioUrl="/audio/demo/file_example_OOG_1MG.ogg" />
      </div>
      <Subtile title="Participants" />
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-1 mt-2">
          <ParticipantHolder>
            <Dp url="/img/demo/profilepic.png" size="sm" />
            <UserName name="Rashid csdidufsd nfij" size="sm" />
          </ParticipantHolder>

          <ParticipantHolder>
            <Dp url="/img/demo/profilepic.png" size="sm" />
            <UserName name="Rashid csdidufsd nfij" size="sm" />
          </ParticipantHolder>

          <ParticipantHolder>
            <Dp url="/img/demo/profilepic.png" size="sm" />
            <UserName name="Rashid csdidufsd nfij" size="sm" />
          </ParticipantHolder>
        </div>
        <div className="flex gap-3">
          <Discussion />
          <Listens listens={100} />
          <Comments comments={100} />
        </div>
      </div>
    </div>
  );
}
