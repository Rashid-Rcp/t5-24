import { GoCommentDiscussion } from "react-icons/go";
import { IoIosChatbubbles } from "react-icons/io";

export default function Discussion({ chats }: { chats: number }) {
  return (
    <div className="flex items-center">
      <IoIosChatbubbles size={20} color="#31ad31" />
      <div className="text-xs ms-1">{chats}</div>
    </div>
  );
}
