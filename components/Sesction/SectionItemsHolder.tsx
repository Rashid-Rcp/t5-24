import React from 'react';

interface SectionItemsHolderProps {
  children: React.ReactNode;
}

export default function SectionItemsHolder({ children }: SectionItemsHolderProps) {
  return (
    <div className="flex gap-2 flex-wrap justify-between">
      {children}
    </div>
  );
}
