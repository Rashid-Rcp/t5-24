import React from "react";

type MenuItemProps = {
  Icon: React.ComponentType<{ size?: number }>;
  text: string;
  size?: number; // Optional size prop for the icon
};
export default function MenuItem({ Icon, text }: MenuItemProps) {
  return (
    <div className="flex items-center">
      <div className="rounded-full p-1 me-2 border border-gray-500 flex items-center justify-center">
        <Icon size={20} />
      </div>
      <span className="text-t5-black font-medium text-sm">{text}</span>
    </div>
  );
}
