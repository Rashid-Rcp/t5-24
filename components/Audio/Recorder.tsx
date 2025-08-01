import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RecordPlugin from 'wavesurfer.js/dist/plugins/record';
import { FaMicrophone, FaStop, FaPause, FaPlay, FaTrash, FaRedo } from 'react-icons/fa';

interface RecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
  onStartRecording?: () => void;
  recodedAudio?: Blob | null;
  limit?: number;
}

const Recorder = ({ onRecordingComplete, onStartRecording, recodedAudio, limit = 3 }: RecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState('00:00');
  const [hasRecording, setHasRecording] = useState(false);
  const [currentTime, setCurrentTime] = useState('00:00');

  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const recordRef = useRef<any>(null);

  useEffect(() => {
    const init = async () => {
      await initializeWaveSurfer();
      if (recodedAudio) {
        loadRecordedAudio(recodedAudio);
      }
    };
    init();
    return () => cleanup();
  }, []);

  useEffect(() => {
    if (recodedAudio) {
      loadRecordedAudio(recodedAudio);
    }
  }, [recodedAudio]);

  const loadRecordedAudio = async (audioBlob: Blob) => {
    try {
      if (!wavesurferRef.current) return;

      // Clear any existing audio
      wavesurferRef.current.empty();

      // Create and load the audio URL
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Load the audio and set up the waveform
      await wavesurferRef.current.load(audioUrl);
      
      // Clean up the URL
      URL.revokeObjectURL(audioUrl);

      // Update states
      setHasRecording(true);
      if (wavesurferRef.current) {
        const duration = wavesurferRef.current.getDuration();
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setRecordingTime(formattedTime);
      }
    } catch (error) {
      console.error('Error loading recorded audio:', error);
    }
  };

  const initializeWaveSurfer = async () => {
    try {
      if (!waveformRef.current) return;

      // Cleanup any existing instance
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      // Create WaveSurfer instance with modified settings
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(69, 69, 69, 1)',
        progressColor: 'rgb(0, 0, 0, 1)',
        height: 60,
        normalize: false,
        autoCenter: false,
        interact: true,
        backend: 'WebAudio',
        minPxPerSec: 1,
        autoScroll: false,
        mediaControls: false,
        hideScrollbar: true
      });

      // Initialize record plugin with modified settings
      recordRef.current = wavesurferRef.current.registerPlugin(
        RecordPlugin.create({
          renderRecordedAudio: true,
          scrollingWaveform: true,
          audioBitsPerSecond: 128000,
          continuousWaveform: false,
          continuousWaveformDuration: 1,
        })
      );

      // Set up record plugin event listeners
      if (recordRef.current) {
        recordRef.current.on('record-progress', (time: number) => {
          const minutes = Math.floor((time % 3600000) / 60000);
          const seconds = Math.floor((time % 60000) / 1000);
          const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          setRecordingTime(formattedTime);

          // Stop recording if limit is reached
          if (minutes * 60 + seconds >= limit * 60) {
            stopRecording();
          }
        });

        recordRef.current.on('record-end', async (blob: Blob) => {
          try {
            onRecordingComplete?.(blob);
            setIsRecording(false);
            setIsPaused(false);
            setCurrentTime('00:00');

            // Load the recorded audio into wavesurfer
            if (wavesurferRef.current) {
              const audioUrl = URL.createObjectURL(blob);
              await wavesurferRef.current.load(audioUrl);
              URL.revokeObjectURL(audioUrl);
            }
          } catch (error) {
            console.error('Error handling recording end:', error);
          }
        });
      }

      // Set up wavesurfer event listeners
      wavesurferRef.current.on('finish', () => {
        setIsPlaying(false);
      });

      wavesurferRef.current.on('play', () => {
        setIsPlaying(true);
      });

      wavesurferRef.current.on('pause', () => {
        setIsPlaying(false);
      });

      // Update wavesurfer event listeners
      wavesurferRef.current.on('audioprocess', (time: number) => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = Math.floor(time % 60);
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        setCurrentTime(formattedTime);
      });

      // Improve seek handling
      wavesurferRef.current.on('interaction', () => {
        if (wavesurferRef.current) {
          const time = wavesurferRef.current.getCurrentTime();
          const minutes = Math.floor((time % 3600) / 60);
          const seconds = Math.floor(time % 60);
          const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          setCurrentTime(formattedTime);
        }
      });

      // Reset current time when playback finishes
      wavesurferRef.current.on('finish', () => {
        setCurrentTime('00:00');
      });

    } catch (err) {
      console.error('Error initializing WaveSurfer:', err);
    }
  };

  const startRecording = async () => {
    try {
      if (wavesurferRef.current) {
        wavesurferRef.current.empty(); // Clear previous recording
        wavesurferRef.current?.seekTo(0);
      }
      
      // Ensure microphone permission and initialize recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Release the test stream
      
      await recordRef.current?.startRecording();
      setIsRecording(true);
      setHasRecording(false);
      setRecordingTime('00:00');
      onStartRecording?.();

    } catch (err) {
      console.error('Error starting recording:', err);
      alert('Unable to access microphone. Please ensure microphone permissions are granted.');
    }
  };

  const stopRecording = async () => {
    try {
      const blob = await recordRef.current?.stopRecording();
      wavesurferRef.current?.seekTo(0);
      
      // Cleanup any active media streams
      if (recordRef.current?.stream) {
        recordRef.current.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      }
      
      setIsRecording(false);
      setIsPaused(false);
      setHasRecording(true);
    } catch (err) {
      console.error('Error stopping recording:', err);
    }
  };

  const pauseRecording = () => {
    if (isPaused) {
      recordRef.current?.resumeRecording();
      setIsPaused(false);
    } else {
      recordRef.current?.pauseRecording();
      setIsPaused(true);
    }
  };

  const playRecording = () => {
    try {
      if (!wavesurferRef.current) return;
      
      if (isPlaying) {
        wavesurferRef.current.pause();
      } else {
        wavesurferRef.current.play();
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error);
    }
  };

  const removeRecording = () => {
    try {
      if (wavesurferRef.current) {
        wavesurferRef.current.empty();
      }
      setHasRecording(false);
      setRecordingTime('00:00');
      setIsPlaying(false);
    } catch (error) {
      console.error('Error removing recording:', error);
    }
  };

  const cleanup = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }
  };

  return (
    <div className="w-full mx-auto mt-4">
      <div ref={waveformRef} className="mb-2 border rounded-lg p-2 bg-t5-white" />
      
      <div className="text-center mb-1">
        <span className="text-t5-black text-sm">
          {isRecording ? (
            recordingTime
          ) : (
            hasRecording ? `${currentTime} / ${recordingTime}` : '00:00'
          )}
        </span>
      </div>

      <div className="flex justify-center gap-4">
        {!recodedAudio ? (
          <>
            {!isRecording && !hasRecording && (
              <button
                onClick={startRecording}
                className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                title="Record"
              >
                <FaMicrophone size={24} />
              </button>
            )}

            {isRecording && (
              <>
                <button
                  onClick={stopRecording}
                  className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                  title="Stop"
                >
                  <FaStop size={24} />
                </button>
                <button
                  onClick={pauseRecording}
                  className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                  title={isPaused ? 'Resume' : 'Pause'}
                >
                  <FaPause size={24} />
                </button>
              </>
            )}
            {hasRecording && !isRecording && (
              <>
                <button
                  onClick={playRecording}
                  className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
                </button>
                <button
                  onClick={removeRecording}
                  className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                  title="Remove"
                >
                  <FaTrash size={24} />
                </button>
                <button
                  onClick={startRecording}
                  className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                  title="Record Again"
                >
                  <FaRedo size={24} />
                </button>
              </>
            )}
          </>
        ) : (
          <>
            <button
              onClick={playRecording}
              className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
            </button>
            {!isRecording && (
              <button
                onClick={startRecording}
                className="p-3 rounded-full bg-t5-black text-t5-white hover:bg-gray-600 transition-colors"
                title="Record New"
              >
                <FaMicrophone size={24} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Recorder;
