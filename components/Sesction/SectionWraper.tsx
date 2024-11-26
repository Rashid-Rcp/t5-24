import { ReactNode } from "react";

type SectionWrapperProps = {
  children: ReactNode;
  extraPadding?: boolean; // Make it optional
};

export default function SectionWrapper({
  children,
  extraPadding = false, 
}: SectionWrapperProps) {
  return (
    <div
      className={`bg-t5-white rounded-xl border-t5-black ${
        extraPadding ? "p-4" : "p-2"
      }`}
    >
      {children}
    </div>
  );
}
