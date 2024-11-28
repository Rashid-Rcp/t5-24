import React from 'react';

type ButtonSolidProps = {
  text: string;
  count?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
};

export default function ButtonSolid({ text, count, icon, onClick }: ButtonSolidProps) {
  return (
    <button
      onClick={onClick}
      className="relative bg-t5-black text-t5-white px-6 py-2 rounded-full hover:bg-gray-800 transition-colors text-sm"
    >
      {count !== undefined && (
        <span className="absolute -top-2 right-0 bg-t5-white text-t5-black text-xs w-5 h-5 rounded-full flex items-center justify-center border">
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

