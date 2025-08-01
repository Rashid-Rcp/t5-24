import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import SectionWrapper from "@/components/Sesction/SectionWraper";
import SectionTitle from "@/components/Sesction/SectionTitle";
import DiscussionCard from "@/components/DiscussionPodcast/DiscussionCard";
import PodcastCard from "@/components/DiscussionPodcast/PodcastCard";
import LeftBar from "@/components/Common/LeftBar";
import MainContentHolder from "@/components/Sesction/MainContentHolder";
import RightBar from "@/components/Common/RightBar";
import ClubSlides from "@/components/Clubs/ClubSlides";
import ActivityCard from "@/components/Clubs/ActivityCard";
import Preference from "@/components/DiscussionPodcast/Preference";
import axiosInstance from "@/utils/axiosInstance";
import { cookies } from "next/headers";
import DiscussionCardSkeleton from "@/components/DiscussionPodcast/DiscussionCardSkeleton";
import Link from "next/link";

export default async function Home() {
  const cookieStore = await cookies();
  const feeds = await axiosInstance.get("/feed/all", {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  console.log(feeds.data);
  return (
    <>
      <Header />
      {/* {feeds.data?.preferencesFound === false && <Preference />} */}
      <MainContainer>
        <LeftBar />
        <MainContentHolder>
          <SectionWrapper extraPadding={true}>
            <SectionTitle title="New Feeds" />

            {/* {feeds.data?.feed?.map((feed: any) => (
              <DiscussionCard key={feed.id} />
            ))} */}

            {/* {feeds.data.preferencesFound === false && (
              [1,2,3,4,5].map((item: any) => (
                <DiscussionCardSkeleton key={item} />
              ))
            )} */}

            {
              feeds.data.discussions.map((discussion: any) => (
                  <DiscussionCard key={discussion._id} discussion={discussion} type="manage" />
              ))
            }

            {/* <PodcastCard />
            <DiscussionCard />
            <DiscussionCard />
            <DiscussionCard />
            <PodcastCard />
            <PodcastCard /> */}
          </SectionWrapper>
        </MainContentHolder>

        <RightBar>
          <ClubSlides />
          <div className="h-2"></div>
          <SectionTitle title="Club Activiteis" />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
          <ActivityCard />
        </RightBar>
      </MainContainer>
    </>
  );
}
