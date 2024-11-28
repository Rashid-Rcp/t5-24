"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PiPlayCircleThin, PiPauseCircleThin } from "react-icons/pi";

interface PlayerProps {
  audioUrl: string;
}

export default function Player({ audioUrl }: PlayerProps) {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "#93999c",
        progressColor: "#29353a",
        cursorWidth:0,
        barWidth: 2,
        height: 40,
      });

      wavesurferRef.current = wavesurfer;
      wavesurfer.load(audioUrl);

      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          const currentTime = audioRef.current!.currentTime;
          const duration = audioRef.current!.duration;
          if (wavesurferRef.current && duration > 0) {
            wavesurferRef.current.seekTo(currentTime / duration);
          }
        };
      }

      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      wavesurferRef.current?.pause();
    } else {
      audioRef.current?.play();
      wavesurferRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative mb-2">
    <div className="flex align-items-center flex-row items-center">
      <button onClick={togglePlay} className="btn me-1">
        {isPlaying ? (
          <PiPauseCircleThin size={40} />
        ) : (
          <PiPlayCircleThin size={40} />
        )}
      </button>
      <div className="w-full">
        <div ref={containerRef} className=""></div>
        <audio ref={audioRef} src={audioUrl} />
      </div>
    </div>
    <div className="text-xs text-right w-full absolute">3.00</div>
    </div>
  );
}
