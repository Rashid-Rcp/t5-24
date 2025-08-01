import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import LeftBar from "@/components/Common/LeftBar";
import RightBar from "@/components/Common/RightBar";
import ClubCover from "@/components/Clubs/ClubCover";
import ClubTabs from "@/components/Clubs/ClubTabs";
import Divider from "@/components/Common/Divider";
import ClubCreated from "@/components/Clubs/ClubCreated";
import ClubStatus from "@/components/Clubs/ClubStatus";
import Subtile from "@/components/Common/Subtile";
import Dp from "@/components/Common/Dp";
import DiscussionCard from "@/components/DiscussionPodcast/DiscussionCard";
import PodcastCard from "@/components/DiscussionPodcast/PodcastCard";
import StickyWraper from "@/components/Common/StickyWraper";
import axiosInstance from "@/utils/axiosInstance";
import { UserBase } from "@/Type/user";
import { ClubData } from "@/Type/club";
import { cookies } from "next/headers";
import NotFound from "@/components/Common/NotFound";
import ClubDiscussionPodcastManager from "@/components/Clubs/ClubDiscussionPodcastManager";

export default async function ClubPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  // Mock data - would come from API in real
  const name = (await params).name;
  let clubInfo: ClubData | null = null;
  const cookieStore = await cookies();
  const { data } = await axiosInstance.get(`/club/get/${name}`, {
    withCredentials: true,
    headers: {
      Cookie: cookieStore
        .getAll()
        .map((cookie) => `${cookie.name}=${cookie.value}`)
        .join("; "),
    },
  });
  if (data.success) {
    clubInfo = data.club;
  }

  return (
    <>
      <Header />
      <MainContainer>
        <LeftBar />
        <div className="flex-1 pl-6 overflow-y-scroll hide-scroll pb-24">
          {clubInfo && <ClubCover clubInfo={clubInfo} />}
          {clubInfo && (
            <div className="w-full flex py-4">
              <div className="flex-1 bg-t5-white rounded-lg mr-2 px-4 py-2">
                <ClubDiscussionPodcastManager/>
y              </div>
              <RightBar>
                <div className="flex justify-between items-center w-full">
                  <ClubCreated date = {clubInfo.createdAt} />
                  <ClubStatus isPrivate = {clubInfo.isPrivate} />
                </div>
                <div className="w-full">
                  <p className="text-sm text-t5-black mt-4">
                   {clubInfo.about}
                  </p>
                </div>
                <div className="mt-4 w-full">
                  <Subtile title="Contributors" />
                  <div className="flex flex-col items-start flex-wrap gap-2 mt-2">
                    {clubInfo?.contributors?.map((contributor, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Dp url={contributor?.profileImage || ""} size="sm" />
                        <p className="text-sm text-t5-black">
                          {contributor?.username}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </RightBar>
            </div>
          )}
          {!clubInfo && <NotFound text="Club Not Found." />}
        </div>
      </MainContainer>
    </>
  );
}
