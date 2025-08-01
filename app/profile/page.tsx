import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import LeftBar from "@/components/Common/LeftBar";
import RightBar from "@/components/Common/RightBar";
import Divider from "@/components/Common/Divider";
import DiscussionCard from "@/components/DiscussionPodcast/DiscussionCard";
import Subtile from "@/components/Common/Subtile";
import ProfileCover from "@/components/Profile/ProfileCover";
import ProfileTabs from "@/components/Profile/ProfileTabs";
import DiscussionCardMin from "@/components/DiscussionPodcast/DiscussionCardMin";
import PodcastCardMin from "@/components/DiscussionPodcast/PodcastCardMin";
import StickyWraper from "@/components/Common/StickyWraper";
import ProfileTabSection from "../../components/Profile/ProfileTabSection";

export default function ProfilePage() {

  return (
    <>
      <Header />
      <MainContainer>
        <LeftBar />
        <div className="flex-1 pl-6 overflow-y-scroll hide-scroll pb-24">
          <ProfileCover />
          <div className="w-full flex gap-4 py-4">
            <ProfileTabSection />
            <RightBar>
              <Subtile title="History" />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <DiscussionCardMin />
              <PodcastCardMin />
            </RightBar>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
