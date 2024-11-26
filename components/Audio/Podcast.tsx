import React from 'react'
import { PiApplePodcastsLogoThin } from "react-icons/pi";


export default function Podcast() {
  return (
    <div className='flex flex-col justify-center items-center p-0'>
        <PiApplePodcastsLogoThin size={60} />
        <span className='text-sm'>12:30</span>
    </div>
  )
}
