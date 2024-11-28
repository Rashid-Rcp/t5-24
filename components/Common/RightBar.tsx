import React from "react";
import SectionWrapper from "../Sesction/SectionWraper";

type RightBarProps = {
  children: React.ReactNode;
};
export default function RightBar({ children }: RightBarProps) {
  return (
    <aside className="w-1/4 lg:w-1/4 max-h-screen overflow-hidden hover:overflow-y-auto" style={{scrollbarGutter:'stable'}}>
      <SectionWrapper>{children}</SectionWrapper>
    </aside>
  );
}
