import React from 'react';

type ButtonSolidProps = {
  icon: React.ReactNode;
  onClick?: () => void;
};

export default function ButtonSolid({ icon, onClick }: ButtonSolidProps) {
  return (
    <button
      onClick={onClick}
      className="relative bg-t5-black text-t5-white px-2 py-1 rounded-full hover:bg-gray-800 transition-colors text-sm"
    >
      {icon && (
        <span className="inline-flex items-center">
          {icon}
        </span>
      )}
    </button>
      
  );
}

