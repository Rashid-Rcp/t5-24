import React from 'react'

export default function ButtonPlain({text, onClick}:{text:string, onClick:()=>void}) {
  return (
    <button className="text-sm w-full px-2 py-1 text-left hover:bg-t5-black hover:text-t5-white transition-all duration-200" onClick={onClick}>{text}</button>
  )
}
