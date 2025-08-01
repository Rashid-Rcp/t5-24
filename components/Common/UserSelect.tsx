"use client";
import React, { useState, useEffect, useRef } from "react";
import Dp from "./Dp";
import searchUsers from "@/utils/searchUsers";
import { useQuery } from "@tanstack/react-query";
import { UserBasic } from "@/Type/user";


interface UserSelectProps {
  onSelect: (user: UserBasic) => void;
  selectedUsers?: string[];
  placeholder?: string;
  prefix?: string;
  disabled?: boolean;
}

export default function UserSelect({
  onSelect,
  selectedUsers = [],
  placeholder = "Search users...",
  prefix,
  disabled = false,
}: UserSelectProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: { users = [] } = {} } = useQuery({
    queryKey: ["searchUsers", searchTerm],
    queryFn: () => searchUsers(searchTerm),
    enabled: searchTerm.length >= 3,
  });

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (user: UserBasic) => {
    onSelect(user);
  };

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 bottom-2 text-t5-gray">
            {prefix}
          </span>
        )}
        <input
          type="text"
          disabled={disabled}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full px-4 py-2 border bg-t5-white-lite border-t5-gray-200 rounded-full focus:outline-none focus:border-t5-black text-sm ${
            prefix ? 'pl-7' : ''
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>

      {isOpen && users.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-t5-white border border-t5-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {users.map((user: UserBasic) => (
            <button
              key={user._id}
              onClick={() => handleSelect(user)}
              disabled={selectedUsers?.includes(user._id)}
              className={`w-full px-2 py-1 flex items-center gap-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedUsers?.includes(user._id) ? "bg-gray-50" : ""
              }`}
            >
              <Dp url={user?.profileImage || null} size="sm" />
              <span className="text-xs text-t5-black">{user.username}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
