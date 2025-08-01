import React from 'react';

type ButtonSolidProps = {
  text: string;
  count?: number;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  isActive?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
};

export default function ButtonSolid({ text, count, icon, size='md', onClick, isActive, disabled = false, }: ButtonSolidProps) {
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-4 py-1.5",
    lg: "text-base px-8 py-1.5",
  };

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses[size]} w-fit  relative rounded-full border transition-all duration-200
        ${disabled
          ? 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed hover:bg-gray-200 hover:text-gray-500'
          : isActive 
            ? 'bg-t5-black text-t5-white border-t5-black' 
            : 'bg-t5-white text-t5-black border-t5-black hover:bg-t5-black hover:text-t5-white'
        }`}
      disabled={disabled}
    >
      {count !== undefined && (
        <span className={`absolute -top-2 right-0 text-xs w-5 h-5 rounded-full flex items-center justify-center border
          bg-t5-white text-t5-black hover:text-t5-black}`}
        >
          {count}
        </span>
      )}
      {text}
      {icon && (
        <span className="inline-flex items-center ml-2">
          {icon}
        </span>
      )}
    </button>
  );
}

