import React from 'react';

type Size = 'sm' | 'md' | 'lg';

interface DbProps {
  url: string | null;
  size: Size;
  border?: boolean | null;
}

export default function Dp({ url, size, border }: DbProps) {
  const sizeClass = size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-20 h-20' : 'w-32 h-32';
  const DpUrl = url ?`${process.env.NEXT_PUBLIC_API_URL}/${url.replace('public','')}` : '/img/default-user.png';
  return (
    <div>
      <img
        src={DpUrl}
        alt="user dp"
        className={`${
          sizeClass
        } rounded-full ${border ? 'border-2 border-t5-gray' : ''}`}
      />
    </div>
  );
}
