"use client";
import Divider from "@/components/Common/Divider";
import StickyWraper from "@/components/Common/StickyWraper";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import React, { useState } from "react";
import ProfileParticipation from "./ProfileParticipation";
import ProfileClubs from "./ProfileClubs";
import ProfileAbout from "./ProfileAbout";

export default function ProfileTabSection() {
  const [activeTab, setActiveTab] = useState("participation");
  return (
    <div className="flex-1 bg-t5-white rounded-lg px-4 py-4">
      <StickyWraper>
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <Divider />
      </StickyWraper>
      {activeTab === "participation" && <ProfileParticipation />}
      {activeTab === "clubs" && <ProfileClubs />}
      {activeTab === "about" && <ProfileAbout />}
    </div>
  );
}
