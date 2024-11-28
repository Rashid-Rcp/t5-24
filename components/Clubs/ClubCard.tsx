import React from "react";
import { CiGlobe, CiLock } from "react-icons/ci";
import { MdCalendarViewDay } from "react-icons/md";
import { ClubInfo } from "@/Type/club";
import JoinButton from "./JoinButton";

interface ClubCardProps {
  showExtraDetails?: boolean;
  clubInfo: ClubInfo;
}


export default function ClubCard({ showExtraDetails = false, clubInfo }: ClubCardProps) {
  return (
    <div className="px-0 py-0 my-0">
      <div className="flex items-center gap-2 mb-2">
        <img
          src="/img/demo/What-is-M.Tech-in-Artificial-Intelligence_AI.jpg.optimal.jpg"
          className="h-14 w-14 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-base font-medium line-clamp-2">The Lean Startup</p>
          {showExtraDetails && (
            <div className="flex items-center justify-between gap-2 text-xs text-t5-black">
              <div className="flex items-center gap-2">
              <span className="flex items-center gap-1">
                <MdCalendarViewDay size={12} />
                {clubInfo.createdDate}
              </span>
              <span className="flex items-center gap-1">
                {clubInfo.private ? <CiLock size={12} /> : <CiGlobe size={12} />}
                {clubInfo.private ? 'Private' : 'Public'}
              </span>
              </div>
              <div>
                <JoinButton size="sm" />
              </div>  
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        <span className="text-xs">50 Contributors</span>
        <span className="text-xs">2.4k Members</span>
        <span className="text-xs">100 Discussions</span>
        <span className="text-xs">300 Podcasts</span>
      </div>
    </div>
  );
}
