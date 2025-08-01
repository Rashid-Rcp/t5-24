import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { IoCloudUploadOutline, IoTrashOutline, IoPlayOutline, IoPauseOutline } from 'react-icons/io5';

interface FileUploaderProps {
  uploadedAudio?: File | null;
  onFileUploaded?: (file: File) => void;
  limit?: number;
}

const FileUploader = ({ uploadedAudio, onFileUploaded, limit = 3 }: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    initializeWaveSurfer();
    return () => cleanup();
  }, []);

  useEffect(() => {
    if (selectedFile) {
      const initializeAndLoad = async () => {
        try {
          await initializeWaveSurfer();
          await loadAudio();
        } catch (error) {
          console.error('Error in initialization:', error);
        }
      };
      
      initializeAndLoad();
      onFileUploaded?.(selectedFile);
    }
    return () => cleanup();
  }, [selectedFile]);

  useEffect(() => {
    if (uploadedAudio) {
      setSelectedFile(uploadedAudio);
    }
  }, [uploadedAudio]);

  const initializeWaveSurfer = async () => {
    try {
      if (!waveformRef.current) return;

      // Ensure any existing instance is destroyed
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }

      // Create new instance
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgb(69, 69, 69, 1)',
        progressColor: 'rgb(0, 0, 0, 1)',
        height: 60,
        normalize: true,
        autoCenter: true,
      });

      // Add event listeners only after successful creation
      if (wavesurferRef.current) {
        wavesurferRef.current.on('finish', () => {
          setIsPlaying(false);
          setCurrentTime(0);
        });

        wavesurferRef.current.on('ready', () => {
          if (wavesurferRef.current) {
            setDuration(wavesurferRef.current.getDuration());
          }
        });

        wavesurferRef.current.on('timeupdate', (currentTime: number) => {
          setCurrentTime(currentTime);
        });

        wavesurferRef.current.on('error', (error) => {
          console.error('WaveSurfer error:', error);
        });
      }
    } catch (error) {
      console.error('Error initializing WaveSurfer:', error);
    }
  };

  const loadAudio = async () => {
    try {
      if (wavesurferRef.current && selectedFile) {
        const audioUrl = URL.createObjectURL(selectedFile);
        await wavesurferRef.current.load(audioUrl);
        URL.revokeObjectURL(audioUrl);
      }
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('audio/')) {
      setError('Please select an audio file');
      return;
    }

    // Create temporary audio element to check duration
    const audio = new Audio();
    audio.src = URL.createObjectURL(file);
    
    await new Promise((resolve) => {
      audio.addEventListener('loadedmetadata', () => {
        URL.revokeObjectURL(audio.src);
        if (audio.duration > limit * 60) {
          setError(`Audio file must be ${limit} minutes or less`);
          resolve(false);
        } else {
          setSelectedFile(file);
          setError(null);
          resolve(true);
        }
      });
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handlePlayPause = () => {
    if (!wavesurferRef.current) return;
    
    if (isPlaying) {
      wavesurferRef.current.pause();
    } else {
      wavesurferRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRemove = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.empty();
    }
    setSelectedFile(null);
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cleanup = () => {
    try {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    } catch (error) {
      console.error('Error during cleanup:', error);
    }
  };

  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full mx-auto">
      <input
        type="file"
        accept="audio/*"
        className="hidden"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelect(file);
        }}
      />

      {!selectedFile ? (
        <div
          className={`border-2 border-dashed rounded-lg p-4 mt-4 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <IoCloudUploadOutline className="mx-auto text-4xl text-t5-black mb-2" />
          {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
          <p className="text-t5-black">Drag and drop an audio file here, or click to select</p>
          <p className="text-sm text-t5-black mt-1">Supported formats: MP3, WAV, etc.</p>
        </div>
      ) : (
        <div>
          <div ref={waveformRef} className="mb-1 mt-4 border rounded-lg p-2 bg-t5-white" />
          <div className="mb-1 flex justify-between items-center ">
            <p className="text-sm text-t5-black truncate">{selectedFile.name}</p>
            <p className="text-sm text-t5-black">
              {formatTime(currentTime)} / {formatTime(duration)}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handlePlayPause}
              className="bg-t5-black text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
            >
              {isPlaying ? <IoPauseOutline size={24} /> : <IoPlayOutline size={24} />}
            </button>
            
            <button
              onClick={handleRemove}
                className="bg-t5-black text-white p-3 rounded-full hover:bg-gray-600 transition-colors"
            >
              <IoTrashOutline size={24} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
