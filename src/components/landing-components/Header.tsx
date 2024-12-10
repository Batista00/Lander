import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Facebook, Instagram, Twitter, Trash2, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

interface HeaderProps {
  id: string;
  data: {
    logo?: {
      url: string;
      alt: string;
      width: number;
      height: number;
    };
    navigation?: Array<{
      label: string;
      href: string;
    }>;
    social?: {
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
    showSocial?: boolean;
    sticky?: boolean;
    style?: {
      backgroundColor?: string;
      textColor?: string;
      shadow?: boolean;
    };
  };
  onEdit?: () => void;
  onDelete?: () => void;
}

const defaultData = {
  navigation: [],
  social: {
    facebook: '',
    twitter: '',
    instagram: ''
  },
  showSocial: false,
  sticky: false,
  style: {
    backgroundColor: 'bg-white',
    textColor: 'text-gray-900',
    shadow: false
  }
};

export function Header({ id, data = defaultData, onEdit, onDelete }: HeaderProps) {
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

  const backgroundColor = data.style?.backgroundColor || defaultData.style.backgroundColor;
  const textColor = data.style?.textColor || defaultData.style.textColor;
  const navigation = Array.isArray(data.navigation) ? data.navigation : defaultData.navigation;

  return (
    <header
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'relative w-full py-4 cursor-move group',
        backgroundColor,
        textColor,
        data.sticky && 'sticky top-0 z-50',
        data.style?.shadow && 'shadow-md'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          {data.logo && (
            <div className="flex-shrink-0">
              <img
                src={data.logo.url}
                alt={data.logo.alt}
                width={data.logo.width}
                height={data.logo.height}
                className="h-auto w-auto object-contain"
              />
            </div>
          )}

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm font-medium hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          {data.showSocial && data.social && (
            <div className="hidden md:flex items-center space-x-4">
              {data.social.facebook && (
                <a
                  href={data.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {data.social.twitter && (
                <a
                  href={data.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {data.social.instagram && (
                <a
                  href={data.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md hover:bg-gray-100">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Edit and Delete Buttons */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
        {onEdit && (
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-md"
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-red-100 text-red-600 rounded-md"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
