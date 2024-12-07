import React from 'react'
import { PiApplePodcastsLogoThin } from "react-icons/pi";
import Player from './Player';


export default function Podcast() {
  return (
    <div className='flex flex-col justify-center items-center p-0'>
        <PiApplePodcastsLogoThin size={60} />
        <div className='w-full'>
        <Player audioUrl="/audio/demo/file_example_OOG_1MG.ogg" />
        {/* <span className='text-sm'>12:30</span>   */}
        </div>
    </div>
  )
}
