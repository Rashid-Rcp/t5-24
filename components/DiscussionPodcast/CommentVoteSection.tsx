"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import ButtonSolid from "../Common/ButtonSolid";
import ButtonIcon from "../Common/ButtonIcon";
import { FiMoreHorizontal } from "react-icons/fi";
import Spacer from "../Common/Spacer";
import CommentBox from "./CommentBox";
import Comment from "./Comment";
import Vote from "./Vote";
import MoreMenu from "./MoreMenu";

interface CommentVoteSectionProps {
    type?: 'discussion' | 'podcast';
}

export default function CommentVoteSection({ type = 'discussion' }: CommentVoteSectionProps) {
    const [commentORVote, setCommentORVote] = useState<'comment'|'vote'>('comment');
    const [showShareTooltip, setShowShareTooltip] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const moreMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
                setShowMoreMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);


    const handleCommentORVote= useCallback((type:'comment'|'vote')=>{
        setCommentORVote(type);
    },[]);

    const handleShare = useCallback(async () => {
        const currentUrl = window.location.href;
        
        try {
            if (navigator.share) {
                // Use native share if available
                await navigator.share({
                    url: currentUrl,
                });
            } else {
                // Fallback to clipboard copy
                await navigator.clipboard.writeText(currentUrl);
                setShowShareTooltip(true);
                setTimeout(() => setShowShareTooltip(false), 2000);
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    }, []);

    return (
        <>
            <div className="flex items-center justify-start gap-4">
                <ButtonSolid text="Comment" count={10} onClick={()=>handleCommentORVote('comment')} isActive={commentORVote==='comment'} />
                {type === 'discussion' && (
                    <ButtonSolid text="Votes" count={10} onClick={()=>handleCommentORVote('vote')} isActive={commentORVote==='vote'} />
                )}
                <div className="relative">
                    <ButtonSolid text="Share" onClick={handleShare} />
                    {showShareTooltip && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-t5-black text-t5-white text-sm rounded-md whitespace-nowrap">
                            Copied to clipboard!
                        </div>
                    )}
                </div>
                <div className="flex-1 flex items-end justify-end">
                    <div className="relative" ref={moreMenuRef}>
                        <ButtonIcon icon={<FiMoreHorizontal />} onClick={()=>setShowMoreMenu(!showMoreMenu)} />
                        {showMoreMenu && (
                            <MoreMenu />
                        )}
                    </div>
                </div>
            </div>
            <Spacer size="xs" />
            {commentORVote==='comment' && <CommentBox />}
            {commentORVote==='comment' && <>
                <Comment
                user={{
                    id: "1",
                    name: "@Rashid_Rcp",
                    dpUrl: "/img/demo/profilepic.png",
                }}
                comment="Sample comment text"
                postedTime="2 hrs ago"
                />
                <Comment
                user={{
                    id: "1",
                    name: "@Rashid_Rcp",
                    dpUrl: "/img/demo/profilepic.png",
                }}
                comment="Sample comment text"
                postedTime="2 hrs ago"
                />
                <Comment
                user={{
                    id: "1",
                    name: "@Rashid_Rcp",
                    dpUrl: "/img/demo/profilepic.png",
                }}
                comment="Sample comment text"
                postedTime="2 hrs ago"
                />
            </>}
            {commentORVote==='vote' && <>
                <Vote participant={{
                    name: "Rashid",
                    dpUrl: "/img/demo/profilepic.png",
                    votes: 10,
                    votePercentage: 50,
                }}
                isVotedByCurrentUser={true}
                />
                <Vote participant={{
                    name: "Rashid RCP",
                    dpUrl: "/img/demo/profilepic.png",
                    votes: 5,
                    votePercentage: 25,
                }}
                />
                <Vote participant={{
                    name: "Raj kuamr",
                    dpUrl: "/img/demo/profilepic.png",
                    votes: 5,
                    votePercentage: 25,
                }}
                />
            </>}
        </>
    );
}
