"use client";
import React, { useState } from "react";

import {
  BsHeart,
  BsHeartFill,
  BsHandThumbsUp,
  BsHandThumbsUpFill,
  BsHandThumbsDown,
  BsHandThumbsDownFill,
} from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";

type ReactionType = "like" | "dislike" | "love" | null;

type ReactionProps = {
  initialCounts?: {
    like: number;
    dislike: number;
    love: number;
  };
};

export default function Reactions({
  initialCounts = { like: 0, dislike: 0, love: 0 },
}: ReactionProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>(null);
  const [counts, setCounts] = useState(initialCounts);

  const reactions = {
    like: 10,
    dislike: 5,
    love: 20,
  };

  const handleReactionClick = (reaction: ReactionType) => {
    if (selectedReaction === reaction) {
      setSelectedReaction(null);
      setCounts((prev) => ({
        ...prev,
        [reaction]: prev[reaction] - 1,
      }));
    } else {
      if (selectedReaction) {
        setCounts((prev) => ({
          ...prev,
          [selectedReaction]: prev[selectedReaction] - 1,
        }));
      }
      setSelectedReaction(reaction);
      setCounts((prev) => ({
        ...prev,
        [reaction]: prev[reaction] + 1,
      }));
    }
    setShowOptions(false);
  };

  return (
    <div className="relative flex">
      {Object.entries(reactions).map(([reaction, count]) => (
        <button
          key={reaction}
          onClick={() => handleReactionClick(reaction as ReactionType)}
          className="text-t5-black hover:text-gray-700 focus:outline-none me-2 flex flex-row items-center justify-center"
        >
          {reaction === "like" && <BsHandThumbsUp size={15} />}
          {reaction === "dislike" && <BsHandThumbsDown size={15} />}
          {reaction === "love" && <BsHeart size={15} />}
          <span className="text-xs">{count}</span>
        </button>
      ))}
      <button
        onClick={() => setShowOptions(!showOptions)}
        className="text-t5-black hover:text-gray-700 focus:outline-none"
      >
        <MdEmojiEmotions color="gray" size={15} />
      </button>

      {showOptions && (
        <div className="absolute bottom-full mb-2 bg-white rounded-lg shadow-lg p-2 flex gap-3 z-50">
          <button
            onClick={() => handleReactionClick("like")}
            className="hover:scale-110 transition-transform"
          >
            <BsHandThumbsUp size={18} />
          </button>
          <button
            onClick={() => handleReactionClick("dislike")}
            className="hover:scale-110 transition-transform"
          >
            <BsHandThumbsDown size={18} />
          </button>
          <button
            onClick={() => handleReactionClick("love")}
            className="hover:scale-110 transition-transform"
          >
            <BsHeart size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
