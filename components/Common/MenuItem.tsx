import React from "react";

type MenuItemProps = {
  Icon: React.ComponentType<{ size?: number }>;
  text: string;
  size?: number; // Optional size prop for the icon
  fill?: boolean;
};
export default function MenuItem({ Icon, text, fill }: MenuItemProps) {
  return (
    <div className="flex items-center">
      <div className={`rounded-full p-1 me-2 border border-gray-500 flex items-center justify-center ${fill ? "bg-t5-black text-white" : ""}`}>
        <Icon size={20} />
      </div>
      <span className="text-t5-black font-medium text-sm">{text}</span>
    </div>
  );
}
