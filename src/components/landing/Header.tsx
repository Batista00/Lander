import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Facebook, Instagram, Twitter, Menu, X, Pencil, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useState } from 'react';

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
      isFullWidth?: boolean;
    };
  };
  onEdit?: () => void;
  onDelete?: () => void;
  isEditing?: boolean;
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
    shadow: false,
    isFullWidth: true
  }
};

export function Header({ id, data = defaultData, onEdit, onDelete, isEditing }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const safeData = {
    ...defaultData,
    ...data,
    navigation: Array.isArray(data?.navigation) ? data.navigation : defaultData.navigation,
    social: { ...defaultData.social, ...data?.social },
    style: { ...defaultData.style, ...data?.style }
  };

  const containerClass = cn(
    safeData.style.isFullWidth ? 'container mx-auto px-4' : 'max-w-5xl mx-auto px-4'
  );

  return (
    <header
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        'w-full relative',
        safeData.sticky && 'sticky top-0 z-50',
        safeData.style.backgroundColor,
        safeData.style.textColor,
        safeData.style.shadow && 'shadow-md'
      )}
    >
      {isEditing && (
        <div className="absolute right-4 top-4 z-10 flex gap-2">
          {onEdit && (
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 bg-white shadow-sm hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              className="flex items-center gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 className="h-4 w-4" />
              Eliminar
            </Button>
          )}
        </div>
      )}

      <div className={containerClass}>
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center gap-12">
            <a href="#" className="flex-shrink-0">
              {safeData.logo?.url ? (
                <img
                  className="h-8 w-auto"
                  src={safeData.logo.url}
                  alt={safeData.logo.alt}
                  width={safeData.logo.width}
                  height={safeData.logo.height}
                />
              ) : (
                <span className="text-xl font-bold">Logo</span>
              )}
            </a>
            
            <div className="hidden lg:flex lg:gap-x-8">
              {safeData.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-semibold leading-6 hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            {safeData.showSocial && (
              <div className="hidden lg:flex items-center gap-4">
                {safeData.social.facebook && (
                  <a
                    href={safeData.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                )}
                {safeData.social.twitter && (
                  <a
                    href={safeData.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
                {safeData.social.instagram && (
                  <a
                    href={safeData.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75 transition-opacity"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}

            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="inline-flex items-center justify-center p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="sr-only">Abrir menú</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </div>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <div className={containerClass}>
            <div className="divide-y divide-gray-200">
              <div className="py-6 space-y-2">
                {safeData.navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              {safeData.showSocial && (
                <div className="py-6">
                  <div className="flex gap-x-4">
                    {safeData.social.facebook && (
                      <a
                        href={safeData.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75 transition-opacity"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                    )}
                    {safeData.social.twitter && (
                      <a
                        href={safeData.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75 transition-opacity"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {safeData.social.instagram && (
                      <a
                        href={safeData.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-75 transition-opacity"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
