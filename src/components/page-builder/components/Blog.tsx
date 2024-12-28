import React from 'react';
import { Component } from '@/types/landing';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface BlogProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  author: string;
  date: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  slug?: string;
}

export const Blog: React.FC<BlogProps> = ({
  component,
  mode = 'preview',
  onChange,
}) => {
  const {
    title = 'Nuestro Blog',
    subtitle = 'Últimas Noticias',
    description = 'Mantente al día con nuestras últimas noticias y artículos',
    layout = 'grid',
    columns = 3,
    showAuthor = true,
    showDate = true,
    showReadTime = true,
    showExcerpt = true,
    showCategory = true,
    posts = [],
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

  const handlePostChange = (index: number, field: string, value: any) => {
    if (!onChange || !posts) return;

    const updatedPosts = [...posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      [field]: value
    };

    onChange({
      ...component,
      content: {
        ...component.content,
        posts: updatedPosts
      }
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
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
          {posts.map((post, index) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48 overflow-hidden">
                {isEditing ? (
                  <input
                    type="text"
                    value={post.image}
                    onChange={(e) => handlePostChange(index, 'image', e.target.value)}
                    className="w-full p-2 border"
                    placeholder="URL de la imagen"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                )}
                
                {showCategory && post.category && (
                  <div className="absolute top-4 left-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={post.category}
                        onChange={(e) => handlePostChange(index, 'category', e.target.value)}
                        className="px-3 py-1 bg-primary text-white text-sm rounded-full"
                      />
                    ) : (
                      <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="p-6">
                {isEditing ? (
                  <input
                    type="text"
                    value={post.title}
                    onChange={(e) => handlePostChange(index, 'title', e.target.value)}
                    className="text-xl font-semibold mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary w-full"
                  />
                ) : (
                  <h3 className="text-xl font-semibold mb-2">
                    {post.title}
                  </h3>
                )}

                {showExcerpt && (
                  <div className="mb-4">
                    {isEditing ? (
                      <textarea
                        value={post.excerpt}
                        onChange={(e) => handlePostChange(index, 'excerpt', e.target.value)}
                        className="text-gray-600 bg-transparent border rounded p-2 w-full"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-600">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  {showAuthor && (
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={post.author}
                          onChange={(e) => handlePostChange(index, 'author', e.target.value)}
                          className="bg-transparent border-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span>{post.author}</span>
                      )}
                    </div>
                  )}

                  {showDate && (
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="date"
                          value={post.date}
                          onChange={(e) => handlePostChange(index, 'date', e.target.value)}
                          className="bg-transparent border-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span>{formatDate(post.date)}</span>
                      )}
                    </div>
                  )}

                  {showReadTime && post.readTime && (
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {isEditing ? (
                        <input
                          type="text"
                          value={post.readTime}
                          onChange={(e) => handlePostChange(index, 'readTime', e.target.value)}
                          className="bg-transparent border-none focus:ring-2 focus:ring-primary"
                        />
                      ) : (
                        <span>{post.readTime}</span>
                      )}
                    </div>
                  )}
                </div>

                {post.slug && (
                  <div className="mt-4">
                    <Button
                      variant="link"
                      className="text-primary hover:text-primary/80 p-0 h-auto font-semibold inline-flex items-center"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
