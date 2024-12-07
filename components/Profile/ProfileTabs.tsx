import React from "react";

type ProfileTabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export default function ProfileTabs({ activeTab, setActiveTab }: ProfileTabsProps) {
  return (
    <div className="flex justify-between gap-2 items-center">
      <div className="flex gap-4">
        <button
          className={`text-t5-black text-sm ${activeTab === 'participation' ? 'font-bold' : 'font-medium'}`}
          onClick={() => setActiveTab('participation')}
        >
          Participation
        </button>
        <button
          className={`text-t5-black text-sm ${activeTab === 'clubs' ? 'font-bold' : 'font-medium'}`}
          onClick={() => setActiveTab('clubs')}
        >
          Clubs
        </button>
        <button
          className={`text-t5-black text-sm ${activeTab === 'about' ? 'font-bold' : 'font-medium'}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </div>
    </div>
  );
}
