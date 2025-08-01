import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import LeftBar from "@/components/Common/LeftBar";
import MainContentHolder from "@/components/Sesction/MainContentHolder";
import RightBar from "@/components/Common/RightBar";
import SectionWrapper from "@/components/Sesction/SectionWraper";
import SectionTitle from "@/components/Sesction/SectionTitle";
import SmallText from "@/components/Common/SmallText";
import Player from "@/components/Audio/Player";
import Listens from "@/components/Common/Listens";
import ParticipantHolder from "@/components/DiscussionPodcast/ParticipantHolder";
import Dp from "@/components/Common/Dp";
import UserName from "@/components/Common/UserName";
import ChatSectionWrapper from "@/components/Sesction/ChatSectionWraper";
import ChatCard from "@/components/DiscussionPodcast/ChatCard";
import Divider from "@/components/Common/Divider";
import ButtonSolid from "@/components/Common/ButtonSolid";
import { FiMoreHorizontal } from "react-icons/fi";
import ButtonIcon from "@/components/Common/ButtonIcon";
import CommentBox from "@/components/DiscussionPodcast/CommentBox";
import Spacer from "@/components/Common/Spacer";
import Comment from "@/components/DiscussionPodcast/Comment";
import ClubCard from "@/components/Clubs/ClubCard";
import DiscussionCard from "@/components/DiscussionPodcast/DiscussionCard";
import CommentVoteSection from "@/components/DiscussionPodcast/CommentVoteSection";
export default function DiscussionPage() {
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
                <Player audioUrl="/audio/demo/file_example_OOG_1MG.ogg" />
              </div>
              <div>
                <Listens listens={100} />
              </div>
            </div>

            <div className="flex flex-row gap-1 mt-1">
              <ParticipantHolder>
                <Dp url="/img/demo/profilepic.png" size="sm" />
                <UserName name="Rashid" size="sm" />
              </ParticipantHolder>

              <ParticipantHolder>
                <Dp url="/img/demo/profilepic.png" size="sm" />
                <UserName name="Jeffry Thomas" size="sm" />
              </ParticipantHolder>

              <ParticipantHolder>
                <Dp url="/img/demo/profilepic.png" size="sm" />
                <UserName name="Nadia" size="sm" />
              </ParticipantHolder>
            </div>
            <ChatSectionWrapper>
              <ChatCard
                audioUrl="/audio/demo/file_example_OOG_1MG.ogg"
                participant={{
                  name: "Rashid Rcp",
                  dpUrl: "/img/demo/profilepic.png",
                }}
              />
              <ChatCard
                audioUrl="/audio/demo/file_example_OOG_1MG.ogg"
                participant={{
                  name: "Nadia",
                  dpUrl: "/img/demo/profilepic.png",
                }}
              />
              <ChatCard
                audioUrl="/audio/demo/file_example_OOG_1MG.ogg"
                participant={{
                  name: "Jeffry Thomas",
                  dpUrl: "/img/demo/profilepic.png",
                }}
              />
            </ChatSectionWrapper>
           
            <Divider />

            <CommentVoteSection/>


          </SectionWrapper>
        </MainContentHolder>

        <RightBar>
          <ClubCard
            showExtraDetails={true}
          />
          <Divider />
          <SectionTitle title="Related" />
          <DiscussionCard />
          <DiscussionCard />
          <DiscussionCard />
        </RightBar>
      </MainContainer>
    </>
  );
}
