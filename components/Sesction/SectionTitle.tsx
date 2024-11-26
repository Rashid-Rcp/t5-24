import React from 'react';

type SectionTitleProps = {
  title: string;
};

export default function SectionTitle({ title }: SectionTitleProps) {
  return (
    <h2 className="text-base font-semibold text-t5-black mb-2">
      {title}
    </h2>
  );
}
