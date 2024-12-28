import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface VideoPlayerProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Video Title',
    videoUrl = '',
    thumbnailUrl = '',
    autoplay = false,
    controls = true,
    loop = false,
    muted = false,
    aspectRatio = '16:9',
    description = '',
    layout = 'default' // 'default' | 'floating' | 'fullwidth'
  } = component.content;

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(muted);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleProgressChange = (value: number) => {
    if (videoRef.current) {
      const time = (value / 100) * videoRef.current.duration;
      videoRef.current.currentTime = time;
      setProgress(value);
    }
  };

  const handleVolumeChange = (value: number) => {
    if (videoRef.current) {
      videoRef.current.volume = value;
      setVolume(value);
      setIsMuted(value === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      setVolume(isMuted ? 1 : 0);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={cn(
        'w-full',
        layout === 'fullwidth' ? 'max-w-none' : 'max-w-4xl mx-auto',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className={cn(
        'relative group',
        layout === 'floating' && 'shadow-xl rounded-xl overflow-hidden'
      )}>
        <video
          ref={videoRef}
          className="w-full h-auto"
          poster={thumbnailUrl}
          style={{
            aspectRatio: aspectRatio === '16:9' ? '16/9' : '4/3'
          }}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        >
          <source src={videoUrl} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>

        {controls && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white/80"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <div className="flex-1">
                  <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    className="cursor-pointer"
                    onValueChange={(value) => handleProgressChange(value[0])}
                  />
                </div>

                <div className="text-white text-sm">
                  {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white/80"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>

                <div className="w-24">
                  <Slider
                    value={[volume * 100]}
                    max={100}
                    className="cursor-pointer"
                    onValueChange={(value) => handleVolumeChange(value[0] / 100)}
                  />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white/80"
                  onClick={toggleFullscreen}
                >
                  <Maximize2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {(title || description) && (
        <div className="mt-4">
          {title && <h3 className="text-xl font-semibold mb-2">{title}</h3>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      )}
    </div>
  );
};
