import React from 'react';

type ChatSectionWrapperProps = {
  children: React.ReactNode;
}

export default function ChatSectionWrapper({ children }: ChatSectionWrapperProps) {
  return (
    <div className="pl-4 pr-1 mt-4 max-w-xl mb-8">
      {children}
    </div>
  );
}
