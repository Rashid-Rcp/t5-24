import React from 'react';
import { RiEmotionSadLine } from 'react-icons/ri';

interface NotFoundProps {
  text?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ text = "Not Found" }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12">
      <RiEmotionSadLine className="text-t5-gray w-24 h-24 mb-4" />
      <h2 className="text-2xl font-medium text-t5-black mb-2">{text}</h2>
      <p className="text-t5-gray text-sm">
        The content you're looking for couldn't be found
      </p>
    </div>
  );
};

export default NotFound;
