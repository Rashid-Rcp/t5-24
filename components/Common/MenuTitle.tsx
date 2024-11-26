import React from 'react'

type MenuTitlePros = {
    title: string
}

export default function MenuTitle({ title}: MenuTitlePros) {
  return (
    <div className='text-t5-gray font-medium text-sm'>{title}</div>
  )
}
