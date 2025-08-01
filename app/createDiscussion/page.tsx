import MainContainer from "@/components/Container/MainContainer";
import Header from "@/components/Header";
import LeftBar from "@/components/Common/LeftBar";
import MainContentHolder from "@/components/Sesction/MainContentHolder";
import SectionWrapper from "@/components/Sesction/SectionWraper";
import SectionTitle from "@/components/Sesction/SectionTitle";

import Divider from "@/components/Common/Divider";
import {
  IoChevronBack,
} from "react-icons/io5";
import DiscussionForm from "../../components/DiscussionPodcast/DiscussionForm";
import { Suspense } from "react";


export default function CreateDiscussionPage() {

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
            <Suspense fallback={<div>Loading...</div>}>
              <DiscussionForm />
            </Suspense>
          </SectionWrapper>
        </MainContentHolder>
      </MainContainer>
    </>
  );
}
