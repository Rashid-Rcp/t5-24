import React from 'react'
import { MdCalendarViewDay } from 'react-icons/md'

export default function ClubCreated({ date }: { date: string | Date }) {
  if (!date) return null;
  const formattedDate = new Date(date).toLocaleDateString('en-GB'); // 'en-GB' for dd/mm/yyyy format
  return (
    <span className="flex items-center gap-1 text-xs text-t5-black">
      <MdCalendarViewDay size={14} />
      {formattedDate}
    </span>
  )
}