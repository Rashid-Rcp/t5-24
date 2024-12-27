import Image from "next/image";
import { ClubInfo } from "@/Type/club";
import Dp from "../Common/Dp";
import UserName from "../Common/UserName";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const ProfileCover = () => {
  return (
    <div className="w-full relative  rounded-xl bg-t5-white pb-4">
      {/* Cover Image */}
      <div className="w-full h-[200px] relative">
        <Image
          src={"/img/demo/Banner5.jpg"}
          alt={""}
          fill
          className="object-cover rounded-xl"
        />
      </div>

      {/* Club Info Section */}
      <div className="px-1 pt-2 flex items-start gap-4 relative">
        {/* Club DP */}
        <div className="absolute -top-5">
          <Dp url={"/img/demo/profilepic.png"} size="lg" />
        </div>

        {/* Club Details */}
        <div className="ml-36 flex-1">
          <h1 className="text-2xl font-bold mb-0  text-t5-black">John Doe</h1>
          <p  className="text-xs text-t5-black mb-1">@john_doe</p>
          <p className="text-sm text-t5-black font-medium mb-1">
            150 Memberships
          </p>

          <div className="flex items-center gap-4 mt-4">
            <FaFacebook size={20} />
            <FaInstagram size={20} />
            <FaLinkedin size={20} />
            <FaTwitter size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
