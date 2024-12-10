import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

interface HeaderProps {
  data: {
    logo?: string;
    title?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
    socialLinks?: {
      facebook?: string;
      instagram?: string;
      twitter?: string;
      youtube?: string;
    };
  };
  isEditing?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function Header({ data, isEditing }: HeaderProps) {
  const {
    logo = '',
    title = 'Título',
    subtitle = 'Subtítulo',
    backgroundColor = '#ffffff',
    textColor = '#000000',
    socialLinks = {}
  } = data;

  return (
    <header 
      className="relative py-4"
      style={{ 
        backgroundColor,
        color: textColor
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {logo && (
              <img 
                src={logo} 
                alt="Logo" 
                className="h-12 w-auto object-contain"
              />
            )}
            <div>
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-sm opacity-75">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.facebook && (
              <a 
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Facebook className="w-5 h-5" />
              </a>
            )}
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {socialLinks.twitter && (
              <a 
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            {socialLinks.youtube && (
              <a 
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-75 hover:opacity-100 transition-opacity"
              >
                <Youtube className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
