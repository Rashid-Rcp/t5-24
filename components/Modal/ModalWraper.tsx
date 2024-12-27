import React from 'react'
// Import an icon library or component for the close icon
import { FaTimes } from 'react-icons/fa'; // Example using react-icons
import SectionWrapper from '../Sesction/SectionWraper';

export default function ModalWraper({children, width="w-1/3", close=true}:{children:React.ReactNode, width:string, close:boolean }) {
  return (
    <div className={`fixed top-0 left-0 right-0 bottom-0 backdrop-blur-sm bg-white bg-opacity-30 flex items-center justify-center z-50`}>
            <div className={`px-6 py-6 bg-t5-white rounded-xl border border-t5-black ${width}`}>
            {close && (
                <div className="flex justify-end relative">
                    <button className="absolute -top-3 -right-2 rounded-full bg-white p-2 shadow-md">
                        <FaTimes className="text-gray-800" />
                    </button>
                </div>
            )}
            {children}
            </div>
    </div>
  )
}