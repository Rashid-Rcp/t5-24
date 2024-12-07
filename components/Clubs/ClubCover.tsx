import Image from "next/image";
import { ClubInfo } from "@/Type/club";
import JoinButton from "./JoinButton";
import Dp from "../Common/Dp";
import UserName from "../Common/UserName";
import { BiDotsHorizontalRounded } from "react-icons/bi";

interface ClubCoverProps {
  clubInfo: ClubInfo & {
    dpUrl: string;
    contributors?: {
      name: string;
      dpUrl: string;
    }[];
  };
}

const ClubCover = ({ clubInfo }: ClubCoverProps) => {
  return (
    <div className="w-full relative  rounded-xl bg-t5-white pb-4">
      {/* Cover Image */}
      <div className="w-full h-[200px] relative">
        <Image
          src={clubInfo.imageUrl}
          alt={clubInfo.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Club Info Section */}
      <div className="px-1 pt-2 flex items-start gap-4 relative">
        {/* Club DP */}
        <div className="absolute -top-5">
          <Dp url={clubInfo.dpUrl} size="lg" />
        </div>

        {/* Club Details */}
        <div className="ml-36 flex-1">
          <h1 className="text-2xl font-bold mb-1  text-t5-black">
            {clubInfo.name}
          </h1>
          <p className="text-t5-black mb-2 text-sm">{clubInfo.description}</p>

          {/* Contributors */}
          {clubInfo.contributors && clubInfo.contributors.length > 0 && (
            <div className="">
              <p className="text-sm text-t5-black font-medium mb-1">
                20 Contributors
              </p>
              <div className="flex -space-x-2 items-center">
                {clubInfo.contributors.slice(0, 5).map((contributor, index) => (
                  <div key={index} className="relative">
                    <Dp url={contributor.dpUrl} size="sm" />
                  </div>
                ))}
                {clubInfo.contributors.length > 5 && (
                  <div className="relative w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      <BiDotsHorizontalRounded />
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Join Button */}
        <div className="mt-2 pr-2">
          <div className="flex flex-col items-start">
            <p className="text-sm text-t5-black font-medium mb-2">
              3.2K Members
            </p>
            <JoinButton size="lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubCover;
