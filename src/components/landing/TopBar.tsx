import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Facebook, Instagram, Mail, Phone, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TopBarProps {
  id: string;
  data: {
    email?: string;
    phone?: string;
    showEmail?: boolean;
    showPhone?: boolean;
    showSocial?: boolean;
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
    style?: {
      backgroundColor?: string;
      textColor?: string;
    };
  };
  onEdit?: () => void;
}

export function TopBar({ id, data = {}, onEdit }: TopBarProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const backgroundColor = data.style?.backgroundColor || 'bg-blue-600';
  const textColor = data.style?.textColor || 'text-white';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'relative w-full py-2',
        backgroundColor,
        textColor
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {data.showEmail && data.email && (
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${data.email}`} className="text-sm hover:underline">
                  {data.email}
                </a>
              </div>
            )}
            {data.showPhone && data.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${data.phone}`} className="text-sm hover:underline">
                  {data.phone}
                </a>
              </div>
            )}
          </div>
          {data.showSocial && (
            <div className="flex items-center space-x-4">
              {data.social?.facebook && (
                <a 
                  href={data.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {data.social?.twitter && (
                <a 
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {data.social?.instagram && (
                <a 
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-2 rounded-md bg-white/10 hover:bg-white/20"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      )}
    </div>
  );
}
