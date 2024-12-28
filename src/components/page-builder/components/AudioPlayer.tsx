import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Repeat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Audio Title',
    audioUrl = '',
    coverUrl = '',
    artist = '',
    album = '',
    autoplay = false,
    loop = false,
    playlist = [],
    theme = 'default' // 'default' | 'minimal' | 'modern'
  } = component.content;

  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0);

  React.useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  }, [audioRef.current]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (value: number) => {
    if (audioRef.current) {
      const time = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = time;
      setProgress(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setVolume(isMuted ? 1 : 0);
    }
  };

  const handlePrevTrack = () => {
    if (playlist.length > 0) {
      setCurrentTrackIndex((prev) => 
        prev === 0 ? playlist.length - 1 : prev - 1
      );
    }
  };

  const handleNextTrack = () => {
    if (playlist.length > 0) {
      setCurrentTrackIndex((prev) => 
        prev === playlist.length - 1 ? 0 : prev + 1
      );
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentTrack = playlist[currentTrackIndex] || {
    title,
    artist,
    album,
    coverUrl,
    audioUrl
  };

  return (
    <div
      className={cn(
        'w-full max-w-xl mx-auto p-6 rounded-xl',
        theme === 'modern' && 'bg-gradient-to-br from-primary/10 to-secondary/10',
        theme === 'minimal' && 'bg-background',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className="flex items-center gap-6">
        {/* Cover Art */}
        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
          <img
            src={currentTrack.coverUrl || '/default-cover.jpg'}
            alt={currentTrack.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Player Controls */}
        <div className="flex-1">
          <div className="mb-4">
            <h3 className="font-semibold text-lg">{currentTrack.title}</h3>
            <p className="text-sm text-muted-foreground">
              {currentTrack.artist} • {currentTrack.album}
            </p>
          </div>

          <audio
            ref={audioRef}
            src={currentTrack.audioUrl}
            autoPlay={autoplay}
            loop={loop}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          />

          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {formatTime(audioRef.current?.currentTime || 0)}
              </span>
              <Slider
                value={[progress]}
                max={100}
                step={0.1}
                className="flex-1"
                onValueChange={(value) => handleProgressChange(value[0])}
              />
              <span className="text-sm text-muted-foreground">
                {formatTime(duration)}
              </span>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Slider
                  value={[volume * 100]}
                  max={100}
                  className="w-24"
                  onValueChange={(value) => handleVolumeChange(value[0] / 100)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevTrack}
                  disabled={playlist.length === 0}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  variant="default"
                  size="icon"
                  className="h-10 w-10"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextTrack}
                  disabled={playlist.length === 0}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(loop && 'text-primary')}
                  onClick={() => audioRef.current && (audioRef.current.loop = !loop)}
                >
                  <Repeat className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Playlist */}
      {playlist.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Playlist</h4>
          <div className="space-y-2">
            {playlist.map((track, index) => (
              <button
                key={index}
                className={cn(
                  'w-full flex items-center gap-3 p-2 rounded-lg transition-colors',
                  'hover:bg-primary/10',
                  currentTrackIndex === index && 'bg-primary/20'
                )}
                onClick={() => setCurrentTrackIndex(index)}
              >
                <img
                  src={track.coverUrl || '/default-cover.jpg'}
                  alt={track.title}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="flex-1 text-left">
                  <div className="font-medium">{track.title}</div>
                  <div className="text-sm text-muted-foreground">{track.artist}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
