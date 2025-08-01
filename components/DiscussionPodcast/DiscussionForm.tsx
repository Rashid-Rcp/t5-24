"use client";
import ParticipantHolder from "@/components/DiscussionPodcast/ParticipantHolder";
import Dp from "@/components/Common/Dp";

import { IoClose, IoFileTrayOutline, IoMicOutline } from "react-icons/io5";
import Subtile from "@/components/Common/Subtile";
import ButtonSolid from "@/components/Common/ButtonSolid";
import Spacer from "@/components/Common/Spacer";
import EnableFeature from "@/components/DiscussionPodcast/EnableFeature";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs/AdapterDayjs";
import UserSelect from "@/components/Common/UserSelect";
import Recorder from "@/components/Audio/Recorder";
import FileUploader from "@/components/Audio/FileUploader";
import UserName from "@/components/Common/UserName";
import { UserBase } from "@/Type/user";
import axiosInstance from "@/utils/axiosInstance";
import { DiscussionInfo } from "@/Type/discussion";
import { useQuery, useMutation } from "@tanstack/react-query";
import LoadingOverlay from "@/components/Common/LoadingOverlay";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import ClubStatus from "../Clubs/ClubStatus";
import Select from "react-select";
import { useSearchParams } from "next/navigation";
import Player from "../Audio/Player";

type DiscussionFormProps = {
  discussionId?: string;
};

export default function DiscussionForm({ discussionId }: DiscussionFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clubId = searchParams.get("club");
  const {
    data: discussion,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["discussion", discussionId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/discussion/${discussionId}`);
      return response.data;
    },
    enabled: !!discussionId,
    //staleTime: Infinity,
    refetchOnMount: false,
  });

  const [dateTime, setDateTime] = useState<dayjs.Dayjs | null>(null);
  const [moderator, setModerator] = useState<UserBase | null>(null);
  const [participants, setParticipants] = useState<UserBase[]>([]);
  const [audioMethod, setAudioMethod] = useState<string | null>(null);
  const [recodedAudio, setRecodedAudio] = useState<Blob | null>(null);
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("30");
  const [allowReactions, setAllowReactions] = useState(false);
  const [allowComments, setAllowComments] = useState(false);
  const [allowVotes, setAllowVotes] = useState(false);
  const [clubName, setClubName] = useState("");
  const [clubOptions, setClubOptions] = useState<any>(null);
  const [descriptionUrl, setDescriptionUrl] = useState("");

  const [errors, setErrors] = useState({
    title: "",
    audio: "",
    moderator: "",
    participants: "",
    dateTime: "",
    clubName: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateDiscussionMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.put(
        `/discussion/${discussionId}`,
        formData
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Discussion updated.");
      // router.push(`/discussion/${data.discussion}`);
    },
    onError: (error) => {
      console.error("Error updating discussion:", error);
      toast.error("Error updating discussion", { theme: "colored" });
    },
  });

  const createDiscussionMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await axiosInstance.post(
        "/discussion/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Handle success - you might want to redirect or show a success message
      toast.success("Discussion created successfully");
      router.push(`/discussion/${data.discussion}`);
    },
    onError: (error) => {
      // Handle error - you might want to show an error message
      console.error("Error creating discussion:", error);
      toast.error("Error creating discussion", { theme: "colored" });
    },
  });

  const { data: clubOptionsData } = useQuery({
    queryKey: ["clubOptions"],
    queryFn: async () => {
      const response = await axiosInstance.get(
        "/user/clubs?role=creator,contributor"
      );
      if (response.data.success) {
        return response.data.clubs.map((club: any) => ({
          value: club._id,
          label: club.name,
          handle: `@${club.slug}`,
          isPrivate: club.isPrivate,
        }));
      }
      return [];
    },
  });

  useEffect(() => {
    if (clubOptionsData) {
      setClubOptions(clubOptionsData);
    }
  }, [clubOptionsData]);

  useEffect(() => {
    if (clubId) {
      setClubName(clubId);
    }
  }, [clubId]);

  const validateTitle = (value: string) => {
    if (!value.trim()) {
      return "Title is required";
    }
    if (value.length < 3) {
      return "Title must be at least 3 characters";
    }
    return "";
  };

  const validateAudio = () => {
    if (!audioMethod && !descriptionUrl) {
      return "Please select an audio method";
    }
    if (audioMethod === "record" && !recodedAudio) {
      return "Please record an audio";
    }
    if (audioMethod === "upload" && !uploadedAudio) {
      return "Please upload an audio file";
    }
    return "";
  };

  const validateDateTime = (value: dayjs.Dayjs | null) => {
    if (!value) {
      return "Schedule date is required";
    }
    if (value.isBefore(dayjs())) {
      return "Schedule date must be in the future";
    }
    return "";
  };

  const validateParticipants = (participants: UserBase[]) => {
    if (participants.length < 2) {
      return "At least 2 participants are required";
    }
    if (participants.length > 5) {
      return "Maximum 5 participants allowed";
    }
    return "";
  };

  useEffect(() => {
    if (!isSubmitted) return;
    setErrors((prev) => ({ ...prev, title: validateTitle(title) }));
  }, [title, isSubmitted]);

  useEffect(() => {
    if (!isSubmitted) return;
    setErrors((prev) => ({ ...prev, audio: validateAudio() }));
  }, [audioMethod, recodedAudio, uploadedAudio, isSubmitted]);

  useEffect(() => {
    if (!isSubmitted) return;
    setErrors((prev) => ({ ...prev, dateTime: validateDateTime(dateTime) }));
  }, [dateTime, isSubmitted]);

  useEffect(() => {
    if (!isSubmitted) return;
    setErrors((prev) => ({
      ...prev,
      moderator: !moderator ? "Moderator is required" : "",
    }));
  }, [moderator, isSubmitted]);

  useEffect(() => {
    if (!isSubmitted) return;
    setErrors((prev) => ({
      ...prev,
      participants: validateParticipants(participants),
    }));
  }, [participants, isSubmitted]);

  useEffect(() => {
    if (!isSubmitted) return;
    setErrors((prev) => ({
      ...prev,
      clubName: !clubName ? "Club name is required" : "",
    }));
  }, [clubName, isSubmitted]);
  const onRecordingComplete = (blob: Blob) => {
    setRecodedAudio(blob);
    setIsRecording(false);
  };
  const onFileUploaded = (file: File) => {
    setUploadedAudio(file);
  };
  const onStartRecording = () => {
    setIsRecording(true);
    setRecodedAudio(null);
  };

  const handleAudioMethod = (method: string) => {
    if (method == "upload" && isRecording) {
      return;
    }
    setAudioMethod(method);
  };
  const handleModeratorSelect = (user: UserBase) => {
    setModerator(user);
  };
  const handleParticipantSelect = (user: UserBase) => {
    if (participants.length >= 5) {
      return;
    }
    setParticipants([...participants, user]);
  };
  const handleRemoveModerator = (userId: string) => {
    setModerator(null);
  };
  const handleRemoveParticipant = (userId: string) => {
    setParticipants(
      participants.filter((participant) => participant._id !== userId)
    );
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);

    const newErrors = {
      title: validateTitle(title),
      audio: validateAudio(),
      moderator: !moderator ? "Moderator is required" : "",
      participants: validateParticipants(participants),
      dateTime: validateDateTime(dateTime),
      clubName: !clubName ? "Club name is required" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const formData = new FormData();
    formData.append("club", clubName || clubId || "");
    formData.append("title", title);

    // Handle audio file based on method
    if (descriptionUrl) {
      formData.append("descriptionUrl", descriptionUrl);
    } else if (audioMethod === "record" && recodedAudio) {
      formData.append("description", recodedAudio, "recorded-audio.webm");
    } else if (audioMethod === "upload" && uploadedAudio) {
      formData.append("description", uploadedAudio);
    }

    formData.append("moderator", moderator?._id || "");
    formData.append(
      "participants",
      JSON.stringify(participants.map((p) => p._id))
    );
    formData.append("scheduleDate", dateTime?.toISOString() || "");
    formData.append("duration", duration);
    formData.append("reactions", String(allowReactions));
    formData.append("comments", String(allowComments));
    formData.append("votes", String(allowVotes));

    if (discussionId) {
      updateDiscussionMutation.mutate(formData);
    } else {
      createDiscussionMutation.mutate(formData);
    }
  };
  useEffect(() => {
    if (!discussion) {
      return;
    }
    setTitle(discussion.discussion.title);
    setClubName(discussion.discussion.club);
    setDescriptionUrl(discussion.discussion.description);
    setDuration(discussion.discussion.duration);
    setAllowReactions(discussion.discussion.reactions);
    setAllowComments(discussion.discussion.comments);
    setAllowVotes(discussion.discussion.votes);
    setModerator(discussion.discussion.moderator);
    setParticipants(discussion.discussion.participants);
    setDateTime(dayjs(discussion.discussion.scheduleDate));
  }, [discussion]);

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "transparent",
      borderColor: state.isFocused ? "#282828" : "#e5e7eb",
      borderWidth: "1px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#282828",
      },
      borderRadius: "0.375rem",
      minHeight: "2.5rem",
      maxWidth: "30rem",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#e5e7eb"
        : state.isFocused
        ? "#f9fafb"
        : "white",
      color: state.isSelected ? "#282828" : "#282828",
      "&:hover": {
        backgroundColor: state.isSelected ? "#e5e7eb" : "#f9fafb",
      },
      padding: "0.75rem 1rem",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.375rem",
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#282828",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#6b7280",
    }),
  };

  const formatOptionLabel = ({ label, handle, isPrivate }: any) => (
    <div className="flex flex-col">
      <div className="flex items-center">
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500">{handle}</span>
        <ClubStatus isPrivate={isPrivate} />
      </div>
    </div>
  );

  const durationOptions = [
    { value: "30", label: "30 Minutes" },
    { value: "60", label: "1 Hour" },
    { value: "120", label: "2 Hours" },
  ];

  const durationStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "transparent",
      borderColor: state.isFocused ? "#282828" : "#e5e7eb",
      borderWidth: "1px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#282828",
      },
      borderRadius: "0.375rem",
      minHeight: "2.5rem",
      maxWidth: "10rem",
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#e5e7eb"
        : state.isFocused
        ? "#f9fafb"
        : "white",
      color: state.isSelected ? "#282828" : "#282828",
      "&:hover": {
        backgroundColor: state.isSelected ? "#e5e7eb" : "#f9fafb",
      },
      padding: "0.75rem 1rem",
    }),
    menu: (base: any) => ({
      ...base,
      borderRadius: "0.375rem",
      boxShadow:
        "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    }),
    singleValue: (base: any) => ({
      ...base,
      color: "#282828",
    }),
    placeholder: (base: any) => ({
      ...base,
      color: "#6b7280",
    }),
  };

  return (
    <div className="relative">
      <LoadingOverlay show={isLoading || createDiscussionMutation.isPending} />

      <div className="flex flex-col gap-6 w-full">
        <div className="w-full relative">
          <Subtile title="Club Name" />
          <div className="mt-1 w-full">
            {clubOptions && clubOptions.length > 0 && (
              <Select
                instanceId="club-select"
                value={clubOptions.find(
                  (option: any) => option.value === clubName
                )}
                onChange={(option: any) => setClubName(option?.value || "")}
                options={clubOptions}
                styles={customStyles}
                formatOptionLabel={formatOptionLabel}
                placeholder="Select a club"
                isClearable
                className="text-sm"
              />
            )}
          </div>
          <div className="absolute -bottom-4 text-xs text-red-500 mt-1">
            {errors.clubName}
          </div>
        </div>

        <div className="w-full relative">
          <Subtile title="Title" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Discussion Title"
            className={`border-b ${
              errors.title ? "border-red-500" : "border-t5-gray-200"
            } focus:border-t5-black outline-none text-t5-black text-sm py-2 bg-transparent w-full`}
          />
          <div className="absolute -bottom-4 text-xs text-red-500 mt-1">
            {errors.title}
          </div>
        </div>
        <div className="w-full relative">
          <Subtile title="Description (max 3 minutes)" />
          {descriptionUrl && !recodedAudio && !uploadedAudio && (
            <div className="mt-2.5 mb-3">
              <Player audioUrl={descriptionUrl || null} />
            </div>
          )}
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleAudioMethod("record")}
              className={`flex items-center gap-2 border border-t5-gray-200 rounded-full px-4 py-2 ${
                audioMethod == "record" ? "bg-t5-black text-t5-white" : ""
              }`}
            >
              <IoMicOutline size={20} />
              <span className="text-t5-gray-400 text-sm">Record an audio</span>
            </button>
            <span className="text-t5-gray-400 text-sm">Or</span>
            <button
              onClick={() => handleAudioMethod("upload")}
              className={`flex items-center gap-2 border border-t5-gray-200 rounded-full px-4 py-2 ${
                audioMethod == "upload" ? "bg-t5-black text-t5-white" : ""
              }`}
            >
              <IoFileTrayOutline size={20} />
              <span className="text-t5-gray-400 text-sm">Upload an audio</span>
            </button>
          </div>
          {audioMethod == "record" && (
            <Recorder
              recodedAudio={recodedAudio}
              onRecordingComplete={onRecordingComplete}
              onStartRecording={onStartRecording}
              limit={3}
            />
          )}
          {audioMethod === "upload" && (
            <FileUploader
              uploadedAudio={uploadedAudio}
              onFileUploaded={onFileUploaded}
              limit={3}
            />
          )}
          <div className="absolute -bottom-4 text-xs text-red-500 mt-1">
            {errors.audio}
          </div>
        </div>
        <div className="w-full relative">
          <Subtile title="Moderator" />
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2">
              {moderator && (
                <div className="relative">
                  <ParticipantHolder>
                    <Dp url={moderator?.profileImage || null} size="sm" />
                    <UserName name={moderator?.username || ""} size="sm" />
                    <button
                      onClick={() => handleRemoveModerator(moderator._id)}
                      className="absolute top-0 right-0 hover:bg-gray-100 rounded-full bg-t5-white "
                    >
                      <IoClose size={16} className="text-red-400" />
                    </button>
                  </ParticipantHolder>
                </div>
              )}
            </div>
            <div className="max-w-60">
              <UserSelect
                prefix="@"
                onSelect={handleModeratorSelect}
                selectedUsers={[
                  ...participants.map((participant) => participant._id),
                  ...(moderator ? [moderator._id] : []),
                ]}
                placeholder="Select a moderator..."
              />
            </div>
          </div>
          <div className="absolute -bottom-4 text-xs text-red-500 mt-1">
            {errors.moderator}
          </div>
        </div>
        <div className="w-full relative">
          <Subtile title={`Participants (max 5)`} />
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-2 flex-wrap">
              {participants.map((participant) => (
                <div className="relative" key={participant._id}>
                  <ParticipantHolder>
                    <Dp url={participant?.profileImage || null} size="sm" />
                    <UserName name={participant?.username || ""} size="sm" />
                    <button
                      onClick={() => handleRemoveParticipant(participant._id)}
                      className="absolute top-0 right-0 hover:bg-gray-100 rounded-full bg-t5-white "
                    >
                      <IoClose size={16} className="text-red-400" />
                    </button>
                  </ParticipantHolder>
                </div>
              ))}
            </div>
            <div className="max-w-60">
              <UserSelect
                disabled={participants.length >= 2}
                prefix="@"
                onSelect={handleParticipantSelect}
                selectedUsers={[
                  ...participants.map((participant) => participant._id),
                  ...(moderator ? [moderator._id] : []),
                ]}
                placeholder="Select participants..."
              />
            </div>
          </div>
          <div className="absolute -bottom-4 text-xs text-red-500 mt-1">
            {errors.participants}
          </div>
        </div>
        <div className="w-full relative">
          <Subtile title="Schedule Date" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              value={dateTime}
              onChange={(newValue) => setDateTime(newValue)}
              minDateTime={dayjs()}
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
          <div className="absolute -bottom-4 text-xs text-red-500 mt-1">
            {errors.dateTime}
          </div>
        </div>
        <div className="w-full relative">
          <Subtile title="Duration" />
          <div className="mt-1 w-full">
            <Select
              instanceId="duration-select"
              value={durationOptions.find(
                (option) => option.value === duration
              )}
              onChange={(option: any) => setDuration(option?.value || "30")}
              options={durationOptions}
              styles={durationStyles}
              placeholder="Select duration"
              isClearable={false}
              className="text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap w-full">
          <EnableFeature
            title="Reactions"
            description="Allow participants to react to the discussion."
            checked={allowReactions}
            onChange={() => setAllowReactions(!allowReactions)}
          />
          <EnableFeature
            title="Comments"
            description="Allow participants to comment on the discussion."
            checked={allowComments}
            onChange={() => setAllowComments(!allowComments)}
          />
          <EnableFeature
            title="Votes"
            description="Allow participants to vote on the discussion."
            checked={allowVotes}
            onChange={() => setAllowVotes(!allowVotes)}
          />
        </div>
      </div>

      <Spacer size="sm" />

      <div className="flex items-center gap-2 justify-end">
        <ButtonSolid text="Clear" onClick={() => {}} />
        {discussionId ? (
          <ButtonSolid
            text={updateDiscussionMutation.isPending ? "Updating..." : "Update"}
            onClick={handleSubmit}
            disabled={updateDiscussionMutation.isPending}
          />
        ) : (
          <ButtonSolid
            text={createDiscussionMutation.isPending ? "Creating..." : "Create"}
            onClick={handleSubmit}
            disabled={
              (isSubmitted &&
                Object.values(errors).some((error) => error !== "")) ||
              createDiscussionMutation.isPending
            }
          />
        )}
      </div>
    </div>
  );
}
