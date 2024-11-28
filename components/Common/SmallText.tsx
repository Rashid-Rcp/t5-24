import React from 'react';

type SmallTextProps = {
  text: string;
}

export default function SmallText({ text }: SmallTextProps) {
  return (
    <span className="text-xs text-t5-black">
      {text}
    </span>
  );
}


