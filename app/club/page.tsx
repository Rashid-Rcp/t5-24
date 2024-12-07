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

export default function ClubPage() {
  // Mock data - would come from API in real app
  const clubInfo = {
    id: 1,
    name: "Market Today",
    description: "A community for market analysis and trading discussions",
    imageUrl:
      "/img/demo/stock-market-highlights-short-covering-rally-takes-nifty-beyond-24k-heres-how-to-trade-on-friday.webp",
    dpUrl: "/img/demo/images (1).jpeg",
    private: false,
    contributors: [
      { name: "John Doe", dpUrl: "/img/demo/profilepic.png" },
      { name: "Jane Smith", dpUrl: "/img/demo/profilepic.png" },
      { name: "Jane Smith", dpUrl: "/img/demo/profilepic.png" },
      { name: "Jane Smith", dpUrl: "/img/demo/profilepic.png" },
      { name: "Jane Smith", dpUrl: "/img/demo/profilepic.png" },
      { name: "Jane Smith", dpUrl: "/img/demo/profilepic.png" },
      { name: "Jane Smith", dpUrl: "/img/demo/profilepic.png" },
      // Add more contributors as needed
    ],
  };

  return (
    <>
      <Header />
      <MainContainer>
        <LeftBar />
        <div className="flex-1 pl-6 overflow-y-scroll hide-scroll pb-24">
          <ClubCover clubInfo={clubInfo} />
          <div className="w-full flex py-4">
            <div className="flex-1 bg-t5-white rounded-lg mr-2 px-4 py-2">
              <StickyWraper>
                <ClubTabs />
                <Divider />
              </StickyWraper>
              <DiscussionCard />
              <DiscussionCard />
              <DiscussionCard />
              <DiscussionCard />
              <DiscussionCard />
              <DiscussionCard />
              <DiscussionCard />
              <DiscussionCard />
              <PodcastCard />
            </div>
            <RightBar>
              <div className="flex justify-between items-center w-full">
                <ClubCreated />
                <ClubStatus />
              </div>
              <div className="w-full">
                <p className="text-sm text-t5-black mt-4">
                  This club focuses on daily market analysis, trading
                  strategies, and investment discussions. Members share
                  insights, discuss market trends, and collaborate on trading
                  ideas to help each other make informed financial decisions.
                </p>
              </div>
              <div className="mt-4 w-full">
                <Subtile title="Contributors" />
                <div className="flex flex-col items-start flex-wrap gap-2 mt-2">
                  {clubInfo.contributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Dp url={contributor.dpUrl} size="sm" />
                      <p className="text-sm text-t5-black">
                        {contributor.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </RightBar>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
