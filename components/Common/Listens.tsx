import React from 'react'
import { BsSoundwave } from "react-icons/bs";


type listensProps = {
    listens: number;
  
}
export default function Listens({listens}:listensProps) {
  return (
    <div className='flex'>
      <div className='text-sm me-1'>{listens}</div>
      <BsSoundwave size={20} />
    </div>
  )
}
