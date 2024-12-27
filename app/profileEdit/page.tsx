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
import {
  IoAddCircleOutline,
  IoChevronBack,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import Subtile from "@/components/Common/Subtile";
import ButtonSolid from "@/components/Common/ButtonSolid";
import Spacer from "@/components/Common/Spacer";
import UserSelect from "@/components/Common/UserSelect";
import { FaFacebook, FaGlobe } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

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
              <SectionTitle title="Edit Your Profile" />
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
                  <Subtile title="Full Name" />
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                  />
                </div>
                <div className="w-full">
                  <Subtile title="Email" />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter Email"
                      className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-[70%]"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-10 h-5 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-t5-black peer-checked:bg-t5-black transition"></div>
                        <div className="w-4 h-4 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition"></div>
                      </div>
                      <span className="text-xs">Make Public</span>
                    </label>
                  </div>
                </div>
                <div className="w-full">
                  <Subtile title="Phone" />
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter Phone"
                      className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-[70%]"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-10 h-5 bg-gray-200 rounded-full peer-focus:ring-2 peer-focus:ring-t5-black peer-checked:bg-t5-black transition"></div>
                        <div className="w-4 h-4 bg-white rounded-full shadow-md absolute top-0.5 left-0.5 peer-checked:translate-x-5 transition"></div>
                      </div>
                      <span className="text-xs">Make Public</span>
                    </label>
                  </div>
                </div>

                <div className="w-full">
                  <Subtile title="Social Media" />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <FaFacebook size={20} />
                      <input
                        type="text"
                        placeholder="Facebook URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTwitter size={20} />
                      <input
                        type="text"
                        placeholder="Twitter URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaInstagram size={20} />
                      <input
                        type="text"
                        placeholder="Instagram URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaLinkedin size={20} />
                      <input
                        type="text"
                        placeholder="LinkedIn URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaYoutube size={20} />
                      <input
                        type="text"
                        placeholder="YouTube URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <FaGlobe size={20} />
                      <input
                        type="text"
                        placeholder="Website URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <Subtile title="Other Links" />
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Title"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Title"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Title"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
           
            <Spacer size="sm" />
            <div className="w-full">
              <Subtile title="About" />
              <textarea
                placeholder="Tell about your self"
                className="w-full border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent"
              ></textarea>
            </div>
            <Spacer size="sm" />

            <div className="flex items-center gap-2 justify-end">
              <ButtonSolid text="Cancel" onClick={() => {}} />
              <ButtonSolid text="Update" onClick={() => {}} />
            </div>
            {/* <Spacer size="sm" /> */}
          </SectionWrapper>
        </MainContentHolder>
      </MainContainer>
    </>
  );
}
