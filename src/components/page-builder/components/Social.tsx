import React from 'react';
import { Component } from '@/types/landing';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github } from 'lucide-react';

interface SocialProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

interface SocialNetwork {
  type: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'youtube' | 'github';
  url: string;
}

const Social: React.FC<SocialProps> = ({ component, onEdit }) => {
  const content = component.content as {
    networks: SocialNetwork[];
    title?: string;
    description?: string;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'facebook':
        return <Facebook className="w-6 h-6" />;
      case 'twitter':
        return <Twitter className="w-6 h-6" />;
      case 'instagram':
        return <Instagram className="w-6 h-6" />;
      case 'linkedin':
        return <Linkedin className="w-6 h-6" />;
      case 'youtube':
        return <Youtube className="w-6 h-6" />;
      case 'github':
        return <Github className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="social-networks p-6"
      onClick={() => onEdit?.(component.id, content)}
    >
      {content.title && (
        <h3 className="text-2xl font-bold text-center mb-4">{content.title}</h3>
      )}
      {content.description && (
        <p className="text-gray-600 text-center mb-6">{content.description}</p>
      )}
      <div className="flex justify-center gap-4">
        {content.networks.map((network, index) => (
          <a
            key={index}
            href={network.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-primary transition-colors"
          >
            {getIcon(network.type)}
          </a>
        ))}
      </div>
    </div>
  );
};

export { Social };

export const defaultSocialContent = {
  title: 'Síguenos en Redes Sociales',
  description: 'Mantente conectado con nosotros',
  networks: [
    { type: 'facebook', url: 'https://facebook.com' },
    { type: 'twitter', url: 'https://twitter.com' },
    { type: 'instagram', url: 'https://instagram.com' },
    { type: 'linkedin', url: 'https://linkedin.com' }
  ]
};
