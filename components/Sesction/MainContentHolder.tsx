import React from 'react'

type MainContentHolderProps = {
    children: React.ReactNode;
  }
export default function MainContentHolder({children}: MainContentHolderProps) {
  return (
    <main className="flex-1 px-6 max-h-screen overflow-hidden hover:overflow-y-auto hide-scroll pb-24 max-w-4xl">{children}</main>
  )
}
