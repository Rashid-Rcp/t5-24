import React from 'react'

export default function ActivityCard() {
  return (
    <div className="bg-t5-white-lite rounded-xl px-2 py-2 my-2 border">
        <div className='flex justify-between items-center gap-2'>
            <span className='text-xs'>@Al Hudaii</span>
            <span className='text-xs'>2 hrs ago</span>
        </div>
        <div className='my-2'>
            <p className='text-xs p-0 m-0'>Disccussion created by Rashid </p>
        </div>
        <div>
            <h2 className='text-sm font-medium line-clamp-2'>
                The title of the disccuiosn will come here.
            </h2>
        </div>
    </div>
  )
}
