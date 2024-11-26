import React from "react";

export default function ParticipantHolder({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-[40px]">{children}</div>;
}
