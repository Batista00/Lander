import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SocialFeedProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const SocialFeed: React.FC<SocialFeedProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Nuestras Redes Sociales',
    description = 'Mantente conectado con nuestras últimas actualizaciones',
    posts = [
      {
        id: '1',
        platform: 'instagram',
        author: {
          name: 'Jane Cooper',
          handle: '@janecooper',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane'
        },
        content: {
          text: '¡Nuevo lanzamiento! 🚀 Estamos emocionados de presentar nuestra última colección...',
          image: 'https://source.unsplash.com/random/800x600?product',
          video: '',
        },
        stats: {
          likes: 1234,
          comments: 56,
          shares: 23
        },
        timestamp: '2h'
      },
      {
        id: '2',
        platform: 'twitter',
        author: {
          name: 'John Doe',
          handle: '@johndoe',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
        },
        content: {
          text: '¡Gracias a todos por su increíble apoyo! 🙏 Hemos alcanzado un nuevo hito...',
          image: 'https://source.unsplash.com/random/800x600?celebration',
          video: '',
        },
        stats: {
          likes: 2345,
          comments: 78,
          shares: 45
        },
        timestamp: '5h'
      }
    ],
    layout = 'grid', // 'grid' | 'masonry' | 'carousel'
    theme = 'modern', // 'modern' | 'minimal' | 'classic'
    interactions = true
  } = component.content;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const renderPost = (post: any) => (
    <motion.div
      key={post.id}
      variants={itemVariants}
      className={cn(
        'bg-card rounded-xl overflow-hidden',
        'border border-border',
        theme === 'modern' && 'shadow-lg hover:shadow-xl transition-shadow',
        theme === 'minimal' && 'border-none shadow-none',
        'group'
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-muted-foreground">{post.author.handle}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Copiar enlace</DropdownMenuItem>
            <DropdownMenuItem>Compartir</DropdownMenuItem>
            <DropdownMenuItem>Reportar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Media */}
      {post.content.image && (
        <div className="relative aspect-square">
          <img
            src={post.content.image}
            alt=""
            className="w-full h-full object-cover"
          />
          {theme === 'modern' && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <p className="text-sm mb-4">{post.content.text}</p>

        {interactions && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                <span>{post.stats.likes}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <MessageCircle className="h-4 w-4" />
                <span>{post.stats.comments}</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                <span>{post.stats.shares}</span>
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        )}

        <div className="mt-4 text-xs text-muted-foreground">
          {post.timestamp}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div
      className={cn(
        'w-full py-16',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            'grid gap-8',
            layout === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
            layout === 'masonry' && 'columns-1 md:columns-2 lg:columns-3',
            layout === 'carousel' && 'flex overflow-x-auto snap-x snap-mandatory'
          )}
        >
          {posts.map(post => (
            <div
              key={post.id}
              className={cn(
                layout === 'carousel' && 'snap-center shrink-0 w-80 mx-2'
              )}
            >
              {renderPost(post)}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
