import React from 'react';
import { FiSend } from 'react-icons/fi';

export default function CommentBox() {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="text"
        placeholder="Write your comment..."
        className="flex-1 px-2 py-2 rounded-full border border-t5-gray bg-t5-white focus:outline-none focus:ring-2 focus:ring-gray-200"
      />
      <button className="p-2 rounded-full bg-t5-white border border-t5-gray">
        <FiSend size={18} />
      </button>
    </div>
  );
}
