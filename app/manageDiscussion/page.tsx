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

export default async function ManageDiscussion() {
  const cookieStore = await cookies();
  const discussions = await axiosInstance.get("/discussion/manage/all?page=1&limit=10&sort=createdAt:desc", {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  return (
    <>
      <Header />
      {/* {feeds.data?.preferencesFound === false && <Preference />} */}
      <MainContainer>
        <LeftBar />
        <MainContentHolder>
          <SectionWrapper extraPadding={true}>
            <SectionTitle title="Discussions" />
           {
            discussions.data.discussions.map((discussion: any) => {
              let type: "normal" | "manage" | "participant" = "normal"
              if(discussion.moderator._id ===  discussions.data.user.userId) type = "manage"
              if(discussion.createdBy._id ===  discussions.data.user.userId) type = "manage"
              if(discussion.participants.some((participant: any) => participant._id ===  discussions.data.user.userId)) type = "participant"
              return (
              <DiscussionCard type={type} discussion={discussion} key={discussion._id} />
            )})
           }
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
