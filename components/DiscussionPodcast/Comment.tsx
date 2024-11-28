import React from 'react';
import Dp from '@/components/Common/Dp';
import UserName from '@/components/Common/UserName';
import SmallText from '@/components/Common/SmallText';

type CommentProps = {
  user: {
    id: string;
    name: string;
    dpUrl: string;
  };
  comment: string;
  postedTime: string;
};

export default function Comment({ user, comment, postedTime }: CommentProps) {
  return (
    <div className="flex gap-3 mt-4">
      <div>
        <Dp url={user.dpUrl} size="sm" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-start mb-0 gap-2">
          <UserName name={user.name} size="md" />
          <SmallText text={postedTime}/>
        </div>
        <p className="text-sm text-t5-black">{comment}</p>
      </div>
    </div>
  );
}
