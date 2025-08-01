"use client";

import React, { useEffect, useState } from "react";
import { DiscussionInfo } from "@/Type/discussion";
import DiscussionCard from "../DiscussionPodcast/DiscussionCard";
import PodcastCard from "../DiscussionPodcast/PodcastCard";
import axiosInstance from "@/utils/axiosInstance";
import DiscussionCardSkeleton from "../DiscussionPodcast/DiscussionCardSkeleton";
import ClubTabs from "./ClubTabs";
import StickyWraper from "../Common/StickyWraper";
import Divider from "../Common/Divider";

export default function ClubDiscussionPodcastManager() {
  const [feeds, setFeeds] = useState<DiscussionInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const response = await axiosInstance.get("club/feed/all");
        if (response.data.success) {
          setFeeds(response.data.feeds);
        }
      } catch (err) {
        setError("Failed to fetch feeds");
        console.error("Error fetching feeds:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  if (loading) {
    return (
      <div>
        {[...Array(5)].map((_, index) => (
          <DiscussionCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <StickyWraper>
        <ClubTabs />
        <Divider />
      </StickyWraper>
      {feeds.map((feed) => (
        <div key={feed._id}>
          <DiscussionCard discussion={feed} />
        </div>
      ))}
    </div>
  );
}
