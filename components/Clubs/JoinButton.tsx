import React from 'react';

interface JoinButtonProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function JoinButton({ size = 'md' }: JoinButtonProps) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <button
      className={`${sizeClasses[size]} bg-t5-black text-t5-white rounded-full hover:bg-gray-800 transition-colors`}
    >
      Join
    </button>
  );
}
