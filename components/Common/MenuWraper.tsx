import React from "react";

type MenuWraperProps = {
  children: React.ReactNode;
};
export default function MenuWraper({ children }: MenuWraperProps) {
  return (
    <nav>
      <ul className="space-y-4">{children}</ul>
    </nav>
  );
}
