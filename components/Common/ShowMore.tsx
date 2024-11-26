import React from 'react'

export default function ShowMore() {
  return (
    <div className='flex justify-center items-center relative my-2'>
        <div className='bg-t5-gray w-full absolute opacity-40' style={{height:1}}></div>
        <div className='bg-t5-black text-t5-white rounded-full px-8 py-2 z-10 text-sm'> Show More </div>
    </div>
  )
}
