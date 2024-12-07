import React from 'react';

type SpacerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
};

export default function Spacer({ size = 'md' }: SpacerProps) {
  const getHeight = () => {
    switch (size) {
      case 'xs':
        return 'h-2 sm:h-4'; 
      case 'sm':
        return 'h-4 sm:h-6'; // 16px on mobile, 24px on desktop
      case 'md':
        return 'h-6 sm:h-8'; // 24px on mobile, 32px on desktop
      case 'lg':
        return 'h-8 sm:h-12'; // 32px on mobile, 48px on desktop
      default:
        return 'h-6 sm:h-8';
    }
  };

  return <div className={`w-full ${getHeight()}`} />;
}
