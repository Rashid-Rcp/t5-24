import React from "react";
import SectionWrapper from "../Sesction/SectionWraper";
import MenuItem from "./MenuItem";
import { CiHome } from "react-icons/ci";
import { PiApplePodcastsLogoThin } from "react-icons/pi";
import { PiTimerThin } from "react-icons/pi";
import { PiChatsCircleThin } from "react-icons/pi";
import { CiCirclePlus } from "react-icons/ci";

import MenuWraper from "./MenuWraper";
import Devider from "./Divider";
import MenuTitle from "./MenuTitle";
import ClubsList from "../Clubs/ClubsList";

export default function LeftBar() {
  return (
    <aside className="w-1/5 lg:w-1/6 max-h-screen overflow-hidden hover:overflow-y-auto" style={{scrollbarGutter:'stable'}}>
      <SectionWrapper>
        <MenuWraper>
          <MenuItem Icon={CiHome} text="Home" />
          <MenuItem Icon={PiChatsCircleThin} text="Discussion" />
          <MenuItem Icon={PiApplePodcastsLogoThin} text="Podcast" />
          <MenuItem Icon={PiTimerThin} text="Upcoming" />
        </MenuWraper>
        <Devider />
        <MenuTitle title="CREATE" />
        <div className="h-4"></div>
        <MenuWraper>
          <MenuItem Icon={CiCirclePlus} text="Discussion" />
          <MenuItem Icon={CiCirclePlus} text="Podcast" />
        </MenuWraper>
        <Devider />
        <MenuTitle title="CLUBS" />
        <div className="h-4"></div>
        <MenuWraper>
          <MenuItem Icon={CiCirclePlus} text="Club" />
        </MenuWraper>
        <div className="h-4"></div>
        <ClubsList />
      </SectionWrapper>
    </aside>
  );
}