import React from "react";
import { BsChat } from "react-icons/bs";

type commentsProps = {
  comments: number;
};

export default function Comments({ comments }: commentsProps) {
  return (
    <div className="flex items-center">
      <BsChat  size={20} />
      <div className="text-xs ms-1">{comments}</div>
    </div>
  );
}
