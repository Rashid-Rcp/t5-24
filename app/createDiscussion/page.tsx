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
  IoFileTrayOutline,
  IoInformationCircleOutline,
  IoMicOutline,
} from "react-icons/io5";
import { RiImageAddLine } from "react-icons/ri";
import Subtile from "@/components/Common/Subtile";
import ButtonSolid from "@/components/Common/ButtonSolid";
import Spacer from "@/components/Common/Spacer";
import EnableFeature from "@/components/DiscussionPodcast/EnableFeature";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import TextField from "@mui/material/TextField";
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";
import UserSelect from "@/components/Common/UserSelect";

export default function CreateDiscussionPage() {
  const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(null);
  const [moderator, setModerator] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>([]);

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
              <SectionTitle title="Create Discussion" />
            </div>
            <Divider />

            <div className="flex flex-col gap-6 w-full">
              <div className="w-full">
                <Subtile title="Title" />
                <input
                  type="text"
                  placeholder="Enter Discussion Title"
                  className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full"
                />
              </div>
              <div>
                <Subtile title="Description" />
                <div className="flex items-center gap-2 mt-2">
                  <button className="flex items-center gap-2 border border-t5-gray-200 rounded-full px-4 py-2">
                    <IoMicOutline size={20} />
                    <span className="text-t5-gray-400 text-sm">
                      Record an audio
                    </span>
                  </button>
                  <span className="text-t5-gray-400 text-sm">Or</span>
                  <button className="flex items-center gap-2 border border-t5-gray-200 rounded-full px-4 py-2">
                    <IoFileTrayOutline size={20} />
                    <span className="text-t5-gray-400 text-sm">
                      Upload an audio
                    </span>
                  </button>
                </div>
              </div>
              <div>
                <Subtile title="Moderator" />
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <ParticipantHolder>
                      <Dp url="/img/demo/bg-placeholder.webp" size="sm" />
                    </ParticipantHolder>
                  </div>
                  <div className="max-w-60">
                    <UserSelect
                      onSelect={() => {}}
                      selectedUsers={[]}
                      placeholder="Select a moderator..."
                    />
                  </div>
                </div>
              </div>
              <div>
                <Subtile title="Participants" />
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-2">
                    <ParticipantHolder>
                      <Dp url="/img/demo/bg-placeholder.webp" size="sm" />
                    </ParticipantHolder>
                  </div>
                  <div className="max-w-60">
                    <UserSelect
                      onSelect={() => {}}
                      selectedUsers={[]}
                      placeholder="Select participants..."
                    />
                  </div>
                </div>
              </div>
              <div>
                <Subtile title="Schedule Date" />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    value={dateTime}
                    onChange={(newValue) => setDateTime(newValue)}
                    slotProps={{
                      textField: {
                        variant: "standard",
                        label: "",
                        sx: {
                          "& .MuiInputBase-root": {
                            fontSize: "0.775rem",
                            color: "#282828",
                            "&::before": {
                              borderBottom: "1px solid #e5e7eb",
                            },
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
              <div>
                <Subtile title="Duration" />
                <select className="border-b border-t5-gray-200 focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full px-1 max-w-40 rounded-sm">
                  <option value="1">1 Hour</option>
                  <option value="2">2 Hours</option>
                  <option value="3">3 Hours</option>
                </select>
              </div>

              <div className="flex items-center gap-2 flex-wrap w-full">
                <EnableFeature
                  title="Reactions"
                  description="Allow participants to react to the discussion."
                  checked={false}
                  onChange={() => {}}
                />
                <EnableFeature
                  title="Comments"
                  description="Allow participants to comment on the discussion."
                  checked={false}
                  onChange={() => {}}
                />
                <EnableFeature
                  title="Votes"
                  description="Allow participants to vote on the discussion."
                  checked={false}
                  onChange={() => {}}
                />
              </div>
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
