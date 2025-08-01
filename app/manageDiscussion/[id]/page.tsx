import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import LeftBar from "@/components/Common/LeftBar";
import MainContentHolder from "@/components/Sesction/MainContentHolder";
import SectionWrapper from "@/components/Sesction/SectionWraper";
import SectionTitle from "@/components/Sesction/SectionTitle";

import Divider from "@/components/Common/Divider";
import { IoChevronBack } from "react-icons/io5";
import DiscussionForm from "@/components/DiscussionPodcast/DiscussionForm";
import { useParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getHeaderConfig } from "@/utils/headerConfig";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ManageDiscussionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Prefetch the query
  await queryClient.prefetchQuery({
    queryKey: ["discussion", id],
    queryFn: async () => {
      const config = await getHeaderConfig();
      const response = await axiosInstance.get(`/discussion/${id}`, config);
      return response.data;
    },
   // staleTime: Infinity,
  });

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
              <SectionTitle title="Manage Discussion" />
            </div>
            <Divider />
            <HydrationBoundary state={dehydrate(queryClient)}>
              <DiscussionForm discussionId={id} />
            </HydrationBoundary> 
          </SectionWrapper>
        </MainContentHolder>
      </MainContainer>
    </>
  );
}
