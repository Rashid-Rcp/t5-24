import React from 'react';

type ButtonSolidProps = {
  icon: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export default function ButtonSolid({ icon, onClick }: ButtonSolidProps) {
  return (
    <button
      onClick={onClick}
      className="relative bg-t5-white text-t5-black p-1 rounded-full hover:bg-t5-black hover:text-t5-white transition-all duration-200 text-sm border border-t5-black flex items-center justify-center"
    >
      {icon && (
        <span className="inline-flex items-center">
          {icon}
        </span>
      )}
    </button>
  );
}

