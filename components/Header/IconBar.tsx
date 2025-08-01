"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
// import fetchUser from "../../utils/query/fetchUser";
import Link from "next/link";
import { PiChatsCircleThin } from "react-icons/pi";
import { IoChatbubblesSharp } from "react-icons/io5";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

export default function IconBar() {
  const router = useRouter();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get('/user/head');
      return response.data;
    },
    refetchOnMount: false,
  });

  return (
    <div className="w-1/3 lg:w-1/4 flex justify-end items-center space-x-4 text-t5-black">
      <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border bg-t5-black text-white">
        <IoChatbubblesSharp size={25} className="hover:text-t5-black" />
      </button>
      <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border">
          <span onClick={() => router.push(`/profile/${userData?.user?.username}`)}>
            {userData?.user?.profileImage ? (
              <img
                src={userData?.user?.profileImage}
                alt="profile"
                width={25}
                height={25}
                className="rounded-full"
              />
            ) : (
              <AiOutlineUser size={25} />
            )}
          </span>
      </button>
      <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border">
        <IoNotificationsOutline size={25} />
      </button>
      <button className="p-1 rounded-full hover:bg-gray-200 border-gray-500 border">
        <IoSettingsOutline size={25} />
      </button>
    </div>
  );
}
