import React from "react";

export default function ClubCard() {
  return (
    <div className="bg-t5-white-lite rounded-xl px-2 py-2 my-2 border">
      <div className="flex items-center gap-2 mb-2">
        <img
          src="/img/demo/What-is-M.Tech-in-Artificial-Intelligence_AI.jpg.optimal.jpg"
          className="h-14 w-14 rounded-full object-cover"
        />
        <p className="text-base font-medium line-clamp-2">The Lean Startup</p>
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
