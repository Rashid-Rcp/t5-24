"use client";
import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import { PiPlayCircleThin, PiPauseCircleThin } from "react-icons/pi";

interface PlayerProps {
  audioUrl: string | null;
}

export default function Player({ audioUrl }: PlayerProps) {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [formattedUrl, setFormattedUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    setDuration(formattedTime);
  };

  useEffect(() => {
    if (audioUrl) {
      setFormattedUrl(audioUrl);
    }
  }, [audioUrl]);

  useEffect(() => {
    if (!containerRef.current || !formattedUrl) return;

    const wavesurfer = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "#93999c",
      progressColor: "#29353a",
      cursorWidth: 0,
      barWidth: 2,
      height: 40,
      normalize: true,
      minPxPerSec: 1,
    });

    wavesurferRef.current = wavesurfer;

    wavesurfer.load(formattedUrl);

    const handleReady = () => {
      const audioDuration = wavesurfer.getDuration();
      getDuration(audioDuration);
      setIsLoading(false);
    };

    const handleAudioTimeUpdate = () => {
      if (!audioRef.current || !wavesurferRef.current) return;
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration > 0) {
        wavesurferRef.current.seekTo(currentTime / duration);
      }
    };

    wavesurfer.on("ready", handleReady);
    audioRef.current?.addEventListener("timeupdate", handleAudioTimeUpdate);

    return () => {
      wavesurfer.destroy();
      audioRef.current?.removeEventListener(
        "timeupdate",
        handleAudioTimeUpdate
      );
    };
  }, [formattedUrl]);

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

  if (!audioUrl) {
    return (
      <div className="relative mb-2">
        <div className="flex align-items-center flex-row items-center">
          <p className="text-xs">No audio available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-2">
      <div className="flex align-items-center flex-row items-center">
        <button onClick={togglePlay} className="btn me-1" disabled={isLoading}>
          {isPlaying ? (
            <PiPauseCircleThin size={40} />
          ) : (
            <PiPlayCircleThin size={40} />
          )}
        </button>
        <div className="w-full relative">
          {isLoading && (
            <div className="absolute z-10 top-0 w-full h-[40px] bg-gray-200 animate-pulse rounded"></div>
          )}
          <div ref={containerRef} className="h-[40px]"></div>
          {formattedUrl && <audio ref={audioRef} src={formattedUrl} />}
        </div>
      </div>
      <div className="text-xs text-right w-full absolute">{duration}</div>
    </div>
  );
}
