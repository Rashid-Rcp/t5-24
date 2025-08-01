"use client";
import React, { useEffect, useState } from "react";
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
import { DiscussionInfo as DiscussionInfoType } from "@/Type/discussion";
import ButtonIcon from "../Common/ButtonIcon";
import { IoInformationCircleOutline } from "react-icons/io5";
import DiscussionInfo from "./DiscussionInfo";
import { useRouter } from "next/navigation";

type DiscussionCardProps = {
  discussion?: DiscussionInfoType;
  type?: "manage" | "participant" | "interested" | "normal";
};


export default function DiscussionCard({
  discussion,
  type = "normal",
}: DiscussionCardProps) {
  const router = useRouter();
  const [showInfo, setShowInfo] = useState(false);
  const checkUpcoming = (date: Date) => {
    const now = new Date();
    return date > now;

  };

  const formatToPast = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(date.getTime() - now.getTime());

    const minutes = Math.floor(diffTime / (1000 * 60));
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} ${years === 1 ? "year" : "years"} ago`;
    if (months > 0) return `${months} ${months === 1 ? "month" : "months"} ago`;
    if (weeks > 0) return `${weeks} ${weeks === 1 ? "week" : "weeks"} ago`;
    if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ago`;
    if (hours > 0) return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
    if (minutes > 0)
      return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
    return "just now";
  };

  const formatDate = (date: Date, isUpcoming: boolean) => {
    if (isUpcoming) {
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return formatToPast(date);
  };

  const handleManage = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('handleManage')
    router.push(`/manageDiscussion/${discussion?._id}`);
  };

  const handleAccept = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle accept logic
  };

  const handleInterested = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Handle interested logic
  };

  const handleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(true);
    console.log('handleInfo')
  };

  const handleInfoClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(false);
  };

  const isUpcoming = discussion?.scheduleDate
    ? checkUpcoming(new Date(discussion.scheduleDate))
    : false;
  const when = discussion?.scheduleDate
    ? formatDate(new Date(discussion.scheduleDate), isUpcoming)
    : "";

  return (
    <div className="bg-t5-white-lite rounded-xl p-4 my-2 disccussion-card border"
      onClick={() => {router.push(`/discussion/${discussion?._id}`)}}>
      <div className="flex flex-row justify-between items-center">
        <p className="text-xs">@Lean Startup</p>
        <p className="text-xs">{when}</p>
      </div>
      <h1 className="text-base font-medium my-2">{discussion?.title}</h1>
      <div className="my-0">
        <Player audioUrl={discussion?.description || null} />
      </div>
      <Subtile title={`${type === "manage" ? "Moderator & Participants" : "Participants"}`} />
      <div className="flex justify-between items-center">
        <div className="flex flex-row gap-1 mt-2">
          {
            type === "manage" && (
              <ParticipantHolder>
                <Dp url={discussion?.moderator?.profileImage || null} size="sm" />
                <UserName name={discussion?.moderator?.fullName || ""} size="sm" />
              </ParticipantHolder>
            )
          }
          
          {
            discussion?.participants?.map((participant) => (
              <ParticipantHolder key={participant._id}>
                <Dp url={participant.profileImage || null} size="sm" />
                <UserName name={participant.fullName || ""} size="sm" />
              </ParticipantHolder>
            ))
          }

        </div>
        <div className="flex gap-3">
          {isUpcoming === true && (
            <div className="flex flex-col gap-2 items-end">
              <p className="text-xs text-t5-black">500 Interested</p>
              <div className="flex flex-row gap-2 items-center">
              {type === "manage" && (
                  <ButtonSolid text="Manage" size="md" onClick={handleManage} />
              )}
              {type === "participant" && (
                <ButtonSolid text="Accept" size="sm" onClick={handleAccept} />
              )}
              {type === "interested" && (
                <ButtonSolid text="Interested" size="md" onClick={handleInterested} />
              )}
                <ButtonIcon icon={<IoInformationCircleOutline size={20} />} onClick={handleInfo} />
              </div>
            </div>
            ) }
            {isUpcoming === false && (
              <>
              <Discussion chats={10}/>
              <Listens listens={100} />
              <Comments comments={100} />
            </>
            )}

        </div>
      </div>
      {showInfo && <DiscussionInfo discussion={discussion} onClose={handleInfoClose} />}
    </div>
  );
}
