import React from "react";
import { BsChat } from "react-icons/bs";

type commentsProps = {
  comments: number;
};

export default function Comments({ comments }: commentsProps) {
  return (
    <div className="flex">
      <div className="text-sm me-1">{comments}</div>
      <BsChat  size={20} />
    </div>
  );
}
