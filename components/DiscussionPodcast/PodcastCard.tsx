import React from "react";
import { PiPlayCircleThin } from "react-icons/pi";
import Player from "../Audio/Player";
import Subtile from "../Common/Subtile";
import Dp from "../Common/Dp";
import UserName from "../Common/UserName";
import ParticipantHolder from "./ParticipantHolder";
import Comments from "../Common/Comments";
import Listens from "../Common/Listens";
import Podcast from "../Audio/Podcast";

export default function () {
  return (
    <div className="bg-t5-white-lite rounded-xl p-4 my-2 disccussion-card border">
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">@Lean Startup</p>
        <p className="text-xs">20 mins ago</p>
      </div>
      <h1 className="text-base font-medium my-2">
        {" "}
        What is the cost of a Zudio franchise in India?{" "}
      </h1>
      <div className="my-0">
        <Podcast />
      </div>
      <Subtile title="Podcast by" />
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-1 mt-2">
          <ParticipantHolder>
            <Dp url="/img/demo/profilepic.png" size="sm" />
            <UserName name="Rashid csdidufsd nfij" size="sm" />
          </ParticipantHolder>
        </div>
        <div className="flex gap-3">
          <Listens listens={400} />
          <Comments comments={200} />
        </div>
      </div>
    </div>
  );
}
