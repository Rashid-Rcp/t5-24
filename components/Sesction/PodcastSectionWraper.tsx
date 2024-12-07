import React from 'react';

type PodcastSectionWrapperProps = {
  children: React.ReactNode;
}

export default function PodcastSectionWrapper({ children }: PodcastSectionWrapperProps) {
  return (
    <div className="pl-4 pr-1 mb-6">
      {children}
    </div>
  );
}
