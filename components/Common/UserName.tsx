import React from 'react'

type UserNameProp = {
    name: string;
    size: 'sm' | 'md' | 'lg';
}

export default function UserName({name, size}:UserNameProp) {
    const sizeClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-md' : 'text-lg';

  return (
    <div className={`user-name truncate ${sizeClass} text-t5-black text-center`} >{name}</div>
  )
}
