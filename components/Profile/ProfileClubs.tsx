import React from "react";
import ClubCard from "../Clubs/ClubCard";
import ClubsList from "../Clubs/ClubsList";
export default function ProfileClubs() {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-t5-white-lite rounded-lg border border-t5-white-lite-2">
        <ClubCard showExtraDetails={true} showRole={true} />
      </div>
      <div className="p-4 bg-t5-white-lite rounded-lg border border-t5-white-lite-2">
        <ClubCard showExtraDetails={true} showRole={true} />
      </div>
      <div className="p-4 bg-t5-white-lite rounded-lg border border-t5-white-lite-2">
        <ClubCard showExtraDetails={true} showRole={true} />
      </div>
    </div>
  );
}
