"use client";

import React, { useState, useRef, useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recordingStopped, setRecordingStopped] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!recordingStopped) return;

    const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
    const url = URL.createObjectURL(audioBlob);
    setAudioUrl(url);
    setRecordingStopped(false);

    // Create WaveSurfer instance and load audio
    if (url) {
      const wavesurfer = WaveSurfer.create({
        container: "#waveform", // ID of the div to render the waveform
        waveColor: "#0078D7",   // Waveform color
        progressColor: "#00CFFF", // Progress color
        cursorColor: "#282828",  // Cursor color
        barWidth: 2,             // Thinner bars
        height: 100,             // Height of the waveform
      });

      wavesurferRef.current = wavesurfer;
      wavesurfer.load(url);
    }
  }, [recordingStopped, audioChunks, audioUrl]);

  const startRecording = async () => {
    try {
      setAudioChunks([]);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.addEventListener("dataavailable", (event) => {
        setAudioChunks((prev) => [...prev, event.data]);
      });

      mediaRecorder.addEventListener("stop", () => {
        setRecordingStopped(true);
      });

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const playRecording = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.play();
      if (wavesurferRef.current) {
        wavesurferRef.current.play();
      }
    }
  };

  const resetRecording = () => {
    setAudioUrl(null);
    setAudioChunks([]);
    setRecordingStopped(false);
    if (wavesurferRef.current) {
      wavesurferRef.current.empty();
    }
  };

  return (
    <div className="p-4 rounded-md border bg-gray-100">
      <div className="flex items-center space-x-4 mb-4">
        {!isRecording && !audioUrl && (
          <button
            onClick={startRecording}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Start Recording
          </button>
        )}
        {isRecording && (
          <button
            onClick={stopRecording}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Stop Recording
          </button>
        )}
        {audioUrl && !isRecording && (
          <button
            onClick={playRecording}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play
          </button>
        )}
        {audioUrl && !isRecording && (
          <button
            onClick={resetRecording}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Record Again
          </button>
        )}
      </div>

      <div id="waveform" className="w-full bg-gray-200 rounded-md"></div>

      <audio ref={audioRef} src={audioUrl} />
    </div>
  );
};

export default AudioRecorder;
