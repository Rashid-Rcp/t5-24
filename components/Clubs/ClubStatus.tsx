import React from "react";
import { CiGlobe, CiLock } from "react-icons/ci";

export default function ClubStatus({ isPrivate }: { isPrivate: boolean }) {
  return (
    <span className="flex items-center gap-0.5 text-xs text-t5-black">
      {isPrivate ? <CiLock size={14} /> : <CiGlobe size={14} />}
      {isPrivate ? "Private" : "Public"}
    </span>
  );
}
