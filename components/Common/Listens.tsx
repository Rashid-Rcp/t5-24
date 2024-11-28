import React from 'react'
import { BsSoundwave } from "react-icons/bs";


type listensProps = {
    listens: number;
  
}
export default function Listens({listens}:listensProps) {
  return (
    <div className='flex'>
      <BsSoundwave size={20} />
      <div className='text-xs me-1'>{listens}</div>
    </div>
  )
}
