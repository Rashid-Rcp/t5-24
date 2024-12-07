import React from 'react'
import { CiGlobe, CiLock } from 'react-icons/ci'

export default function ClubStatus() {
    const clubInfo = {
        private: false
    }
  return (
    <span className="flex items-center gap-1 text-xs text-t5-black">
                {clubInfo.private ? <CiLock size={14} /> : <CiGlobe size={14} />}
                {clubInfo.private ? 'Private' : 'Public'}
              </span>
  )
}
