import React from 'react'
import { BsSoundwave } from "react-icons/bs";


type listensProps = {
    listens: number;
  
}
export default function Listens({listens}:listensProps) {
  return (
    <div className='flex items-center'>
      <BsSoundwave size={20} />
      <div className='text-xs ms-1'>{listens}</div>
    </div>
  )
}
