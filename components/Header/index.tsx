import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";

const Header: React.FC = () => {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md border-b-gray-100 border bg-t5-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="py-1 flex items-center justify-between">
            {/* Logo Section */}
            <div className="w-1/3 lg:w-1/6">
              <img src="/img/T5-logo.png" alt="Logo" className="h-16 w-auto" />
            </div>

            {/* Search Bar Section */}
            <div className="flex-1 relative">
              <div className="relative max-w-2xl mx-auto">
                <input
                  type="text"
                  placeholder="Search for Discussion, Podcast"
                  className="placeholder-t5-black text-base w-full pl-4 pr-10 py-2 rounded-full border border-gray-300 text-t5-black focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
                <IoSearchOutline
                  size={25}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-t5-black"
                />
              </div>
            </div>

            {/* Icon Buttons Section */}
            <div className="w-1/3 lg:w-1/4 flex justify-end items-center space-x-4 text-t5-black">
              <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border">
                <AiOutlineUser size={25} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border">
                <IoNotificationsOutline size={25} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border">
                <IoSettingsOutline size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[4.5rem]"></div>
    </>
  );
};

export default Header;
