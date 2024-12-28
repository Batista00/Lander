import React from 'react';
import { Component } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Link } from 'lucide-react';

interface TeamProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio?: string;
  social?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
    website?: string;
  };
}

export const Team: React.FC<TeamProps> = ({
  component,
  mode = 'preview',
  onChange,
}) => {
  const {
    title = 'Nuestro Equipo',
    subtitle = 'Conoce a nuestros profesionales',
    description = 'Un equipo dedicado a hacer realidad tus proyectos',
    layout = 'grid',
    columns = 3,
    showBio = true,
    showSocial = true,
    members = [],
  } = component.content;

  const isEditing = mode === 'edit';

  const handleChange = (field: string, value: string) => {
    if (!onChange) return;
    
    onChange({
      ...component,
      content: {
        ...component.content,
        [field]: value
      }
    });
  };

  const handleMemberChange = (index: number, field: string, value: any) => {
    if (!onChange || !members) return;

    const updatedMembers = [...members];
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updatedMembers[index] = {
        ...updatedMembers[index],
        [parent]: {
          ...updatedMembers[index][parent],
          [child]: value
        }
      };
    } else {
      updatedMembers[index] = {
        ...updatedMembers[index],
        [field]: value
      };
    }

    onChange({
      ...component,
      content: {
        ...component.content,
        members: updatedMembers
      }
    });
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'facebook':
        return <Facebook className="w-4 h-4" />;
      case 'twitter':
        return <Twitter className="w-4 h-4" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />;
      case 'instagram':
        return <Instagram className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'website':
        return <Link className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {isEditing ? (
            <input
              type="text"
              value={subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              className="text-lg font-semibold text-primary mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h3 className="text-lg font-semibold text-primary mb-2">
              {subtitle}
            </h3>
          )}

          {isEditing ? (
            <input
              type="text"
              value={title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="text-3xl font-bold mb-4 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
            />
          ) : (
            <h2 className="text-3xl font-bold mb-4">
              {title}
            </h2>
          )}

          {isEditing ? (
            <textarea
              value={description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="text-lg mb-8 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
              rows={2}
            />
          ) : (
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className={cn(
          'grid gap-8',
          layout === 'grid' && columns === 3 && 'md:grid-cols-3',
          layout === 'grid' && columns === 2 && 'md:grid-cols-2',
          layout === 'grid' && columns === 4 && 'md:grid-cols-4'
        )}>
          {members.map((member, index) => (
            <div key={member.id} className="text-center">
              <div className="relative mb-4 group">
                {isEditing ? (
                  <input
                    type="text"
                    value={member.image}
                    onChange={(e) => handleMemberChange(index, 'image', e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="URL de la imagen"
                  />
                ) : (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                  className="text-xl font-semibold mb-1 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
                />
              ) : (
                <h4 className="text-xl font-semibold mb-1">{member.name}</h4>
              )}

              {isEditing ? (
                <input
                  type="text"
                  value={member.role}
                  onChange={(e) => handleMemberChange(index, 'role', e.target.value)}
                  className="text-primary mb-3 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
                />
              ) : (
                <p className="text-primary mb-3">{member.role}</p>
              )}

              {showBio && (
                <div className="mb-4">
                  {isEditing ? (
                    <textarea
                      value={member.bio}
                      onChange={(e) => handleMemberChange(index, 'bio', e.target.value)}
                      className="text-sm text-gray-600 bg-transparent border rounded p-2 w-full"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  )}
                </div>
              )}

              {showSocial && member.social && (
                <div className="flex justify-center space-x-3">
                  {Object.entries(member.social).map(([platform, url]) => (
                    url && (
                      <a
                        key={platform}
                        href={platform === 'email' ? `mailto:${url}` : url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors duration-200"
                      >
                        {getSocialIcon(platform)}
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
