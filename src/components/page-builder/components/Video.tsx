import { cn } from '@/lib/utils';

interface VideoProps {
  id: string;
  content: {
    url: string;
    type?: 'youtube' | 'vimeo' | 'custom';
    title?: string;
    autoplay?: boolean;
    controls?: boolean;
    muted?: boolean;
    loop?: boolean;
    aspectRatio?: 'square' | 'video' | 'wide';
    width?: 'small' | 'medium' | 'large' | 'full';
    alignment?: 'left' | 'center' | 'right';
    rounded?: boolean;
    shadow?: 'none' | 'small' | 'medium' | 'large';
    overlay?: boolean;
    overlayColor?: string;
    description?: string;
  };
  onEdit?: () => void;
}

export function Video({ id, content, onEdit }: VideoProps) {
  const {
    url,
    type = 'youtube',
    title = '',
    autoplay = false,
    controls = true,
    muted = true,
    loop = false,
    aspectRatio = 'video',
    width = 'full',
    alignment = 'center',
    rounded = false,
    shadow = 'none',
    overlay = false,
    overlayColor = 'bg-black/50',
    description
  } = content;

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    medium: 'shadow-md',
    large: 'shadow-lg'
  };

  const widthClasses = {
    small: 'max-w-sm',
    medium: 'max-w-2xl',
    large: 'max-w-4xl',
    full: 'w-full'
  };

  const alignmentClasses = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto'
  };

  const getVideoUrl = () => {
    if (type === 'youtube') {
      const videoId = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&\n?\s]{11})/)?.[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&mute=${muted ? 1 : 0}&loop=${loop ? 1 : 0}`;
    } else if (type === 'vimeo') {
      const videoId = url.match(/vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|)(\d+)(?:|\/\?)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&muted=${muted ? 1 : 0}&loop=${loop ? 1 : 0}`;
    }
    return url;
  };

  return (
    <div className={cn(
      "relative group",
      widthClasses[width],
      alignmentClasses[alignment]
    )}>
      <div className={cn(
        "relative overflow-hidden",
        aspectRatioClasses[aspectRatio],
        shadowClasses[shadow],
        { 'rounded-lg': rounded }
      )}>
        {type === 'custom' ? (
          <video
            src={url}
            title={title}
            autoPlay={autoplay}
            controls={controls}
            muted={muted}
            loop={loop}
            className="w-full h-full object-cover"
          />
        ) : (
          <iframe
            src={getVideoUrl()}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        )}

        {overlay && (
          <div className={cn(
            "absolute inset-0 pointer-events-none",
            overlayColor
          )} />
        )}
      </div>

      {description && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          {description}
        </p>
      )}

      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute hidden group-hover:flex items-center justify-center top-2 right-2 w-8 h-8 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
