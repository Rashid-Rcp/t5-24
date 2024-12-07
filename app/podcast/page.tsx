import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import LeftBar from "@/components/Common/LeftBar";
import MainContentHolder from "@/components/Sesction/MainContentHolder";
import RightBar from "@/components/Common/RightBar";
import SectionWrapper from "@/components/Sesction/SectionWraper";
import SectionTitle from "@/components/Sesction/SectionTitle";
import SmallText from "@/components/Common/SmallText";
import Listens from "@/components/Common/Listens";
import ParticipantHolder from "@/components/DiscussionPodcast/ParticipantHolder";
import Dp from "@/components/Common/Dp";
import UserName from "@/components/Common/UserName";
import Divider from "@/components/Common/Divider";
import ClubCard from "@/components/Clubs/ClubCard";
import PodcastSectionWrapper from "@/components/Sesction/PodcastSectionWraper";
import PodcastCard from "@/components/DiscussionPodcast/PodcastCard";
import PodcastPlayer from "@/components/Audio/PodcastPlayer";
import CommentVoteSection from "@/components/DiscussionPodcast/CommentVoteSection";
export default function PodcastPage() {
  return (
    <>
      <Header />
      <MainContainer>
        <LeftBar />

        <MainContentHolder>
          <SectionWrapper extraPadding={true}>
            <div className="flex items-center justify-between gap-2 mb-2">
              <SmallText text="@Lean startup" />
              <SmallText text="2 hrs ago" />
            </div>
            <SectionTitle title="Elon Musk publicized the names of government employees he wants to cut. Its terrifying federal workers" />
            <div className="flex items-center justify-around gap-2">
              <div className="flex-1">
                <ParticipantHolder>
                  <Dp url="/img/demo/profilepic.png" size="sm" />
                  <UserName name="Rashid" size="sm" />
                </ParticipantHolder>
              </div>
              <div>
                <Listens listens={100} />
              </div>
            </div>
            <PodcastSectionWrapper>
              <PodcastPlayer />
            </PodcastSectionWrapper>

            <Divider />
            <CommentVoteSection type="podcast" />
          </SectionWrapper>
        </MainContentHolder>

        <RightBar>
          <ClubCard showExtraDetails={true} />
          <Divider />
          <SectionTitle title="Related" />
          <PodcastCard />
          <PodcastCard />
          <PodcastCard />
          <PodcastCard />
        </RightBar>
      </MainContainer>
    </>
  );
}
