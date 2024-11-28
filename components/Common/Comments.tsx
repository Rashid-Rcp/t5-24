import React from "react";
import { BsChat } from "react-icons/bs";

type commentsProps = {
  comments: number;
};

export default function Comments({ comments }: commentsProps) {
  return (
    <div className="flex">
      <BsChat  size={20} />
      <div className="text-xs me-1">{comments}</div>
    </div>
  );
}
