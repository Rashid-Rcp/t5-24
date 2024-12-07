import React from 'react';

type ButtonSolidProps = {
  text: string;
  count?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
};

export default function ButtonSolid({ text, count, icon, onClick, isActive }: ButtonSolidProps) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-2 rounded-full border border-t5-black transition-all duration-200 text-sm
        ${isActive 
          ? 'bg-t5-black text-t5-white' 
          : 'bg-t5-white text-t5-black hover:bg-t5-black hover:text-t5-white'
        }`}
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

