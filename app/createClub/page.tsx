"use client";
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
import { IoAddCircleOutline, IoChevronBack, IoInformationCircleOutline } from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import Subtile from "@/components/Common/Subtile";
import ButtonSolid from "@/components/Common/ButtonSolid";
import Spacer from "@/components/Common/Spacer";
import UserSelect from "@/components/Common/UserSelect";

export default function CreateClubPage() {
  return (
    <>
      <Header />
      <MainContainer>
        <LeftBar />
        <MainContentHolder>
          <SectionWrapper extraPadding={true}>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full border mb-2">
                <IoChevronBack size={20} />
              </div>
              <SectionTitle title="Create Your Club" />
            </div>
            <div className="w-full h-40 rounded-lg overflow-hidden relative">
              <img
                src="/img/demo/bg-placeholder.webp"
                alt="club"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2">
                <button className="flex items-center gap-2 bg-t5-white border w-fit px-2 py-1 rounded-full">
                  <RiImageAddLine size={20} />
                  <p className="text-t5-black text-sm">Add Cover Photo</p>
                </button>
              </div>
            </div>
            <Spacer size="sm" />
            <div className="flex gap-6">
              <div className="relative w-20 h-20">
                <img
                  src="/img/demo/bg-placeholder.webp"
                  alt="dp"
                  className="w-20 h-20 rounded-full object-cover"
                />
                <button className="absolute bottom-0 right-0">
                  <IoAddCircleOutline size={25} />
                </button>
              </div>

              <div className="flex-1 flex flex-col gap-6 max-w-lg">
                <div className="w-full">
                  <Subtile title="Name" />
                  <input
                    type="text"
                    placeholder="Enter Club Name"
                    className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                  />
                </div>
                <div>
                  <Subtile title="Tag Line" />
                  <input
                    type="text"
                    placeholder="Enter Club Tag Line"
                    className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                  />
                </div>
                <div>
                  <Subtile title="Contributors" />
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <ParticipantHolder>
                        <Dp url="/img/demo/profilepic.png" size="sm" />
                        <UserName name="You" size="sm" />
                      </ParticipantHolder>
                    </div>
                    <div className="max-w-60 mb-4">
                      <UserSelect onSelect={() => {}} selectedUsers={[]} placeholder="Select contributors..." />
                    </div>
                  </div>
                </div>
                <div>
                  <Subtile title="Private" />
                  <div className="flex items-center justify-start gap-2 mt-2">
                    <div className="flex items-center gap-2">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-t5-gray-200 peer-focus:outline-none rounded-full border peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-t5-black"></div>
                        <span className="text-sm text-t5-black ms-2">Make this club private</span>

                      </label>
                    </div>
                    <button className="group relative">
                      <IoInformationCircleOutline className="text-t5-gray-400" size={20} />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-t5-black text-t5-white text-xs rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                        Private clubs are only visible to invited members. Content and discussions remain exclusive to the club members.
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Spacer size="sm" />
            <div className="w-full">
              <Subtile title="About" />
              <textarea
                placeholder="Tell about your club"
                className="w-full border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent"
              ></textarea>
            </div>
            <Spacer size="sm" />

            <div className="flex items-center gap-2 justify-end">
              <ButtonSolid text="Clear" onClick={() => {}} />
              <ButtonSolid text="Create" onClick={() => {}} />
            </div>
            {/* <Spacer size="sm" /> */}
          </SectionWrapper>
        </MainContentHolder>
      </MainContainer>
    </>
  );
}
