import React from 'react'

export default function StickyWraper({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky top-0 bg-t5-white z-10 -mx-4 px-4 pt-2">
      {children}
    </div>  
  );
}
