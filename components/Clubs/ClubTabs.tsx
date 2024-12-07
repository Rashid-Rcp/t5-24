import React from "react";
import { CiCirclePlus } from "react-icons/ci";

export default function ClubTabs() {
  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="flex gap-4">
        <span className="text-t5-black font-medium text-sm">All </span>
        <span className="text-t5-black font-medium text-sm">Discussion</span>
        <span className="text-t5-black font-medium text-sm">Podcast</span>
        <span className="text-t5-black font-medium text-sm">Upcoming</span>
      </div>

      <button className="border border-t5-gray rounded-full px-2 py-1 flex items-center gap-1">
        <CiCirclePlus size={25} />
        Create{" "}
      </button>
    </div>
  );
}
