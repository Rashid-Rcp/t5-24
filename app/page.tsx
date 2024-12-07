import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import ClubsHomeCard from "@/components/Clubs/ClubsList";
import SectionWrapper from "@/components/Sesction/SectionWraper";
import SectionTitle from "@/components/Sesction/SectionTitle";
import AudioRecorder from "@/components/Audio/Recorder";
import DiscussionCard from "@/components/DiscussionPodcast/DiscussionCard";
import PodcastCard from "@/components/DiscussionPodcast/PodcastCard";
import SectionItemsHolder from "@/components/Sesction/SectionItemsHolder";
import ShowMore from "@/components/Common/ShowMore";
import LeftBar from "@/components/Common/LeftBar";
import MainContentHolder from "@/components/Sesction/MainContentHolder";
import RightBar from "@/components/Common/RightBar";
import ClubCard from "@/components/Clubs/ClubCard";
import ClubSlides from "@/components/Clubs/ClubSlides";
import ActivityCard from "@/components/Clubs/ActivityCard";
export default function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <LeftBar />

        <MainContentHolder>
          <SectionWrapper extraPadding={true}>
            <SectionTitle title="New Feeds" />
            <DiscussionCard />
            <PodcastCard />
            <DiscussionCard />
            <DiscussionCard />
            <DiscussionCard />
            <PodcastCard />
            <PodcastCard />
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
