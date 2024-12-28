import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface TestimoniosProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

interface Testimonio {
  id: string;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  content: string;
  rating: number;
  date: string;
  verified?: boolean;
}

export const Testimonios: React.FC<TestimoniosProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Lo que dicen nuestros clientes',
    description = 'Testimonios de clientes satisfechos',
    testimonios = [
      {
        id: '1',
        author: {
          name: 'María García',
          title: 'CEO, Innovatech',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria'
        },
        content: 'Increíble servicio y atención al cliente. Superó todas nuestras expectativas.',
        rating: 5,
        date: '2023-12-15',
        verified: true
      },
      {
        id: '2',
        author: {
          name: 'Juan Pérez',
          title: 'Director de Marketing, TechCorp',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=juan'
        },
        content: 'La mejor decisión que tomamos fue trabajar con ellos. Resultados excepcionales.',
        rating: 5,
        date: '2023-12-10',
        verified: true
      },
      {
        id: '3',
        author: {
          name: 'Ana Martínez',
          title: 'Fundadora, StartupX',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ana'
        },
        content: 'Profesionalismo y calidad en cada detalle. Altamente recomendado.',
        rating: 4,
        date: '2023-12-05'
      }
    ],
    layout = 'grid', // 'grid' | 'carousel' | 'masonry'
    theme = 'modern', // 'modern' | 'minimal' | 'classic'
    showRating = true,
    showDate = true,
    showVerified = true,
    itemsPerPage = 3
  } = component.content;

  const [currentPage, setCurrentPage] = React.useState(0);

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        className={cn(
          'h-4 w-4',
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        )}
      />
    ));
  };

  const renderTestimonio = (testimonio: Testimonio) => (
    <motion.div
      key={testimonio.id}
      variants={itemVariants}
      className="h-full"
    >
      <Card className={cn(
        'h-full',
        theme === 'modern' && 'bg-gradient-to-br from-card to-muted/50',
        theme === 'minimal' && 'border-none shadow-none',
        'hover:shadow-lg transition-shadow duration-300'
      )}>
        <CardContent className="p-6 h-full flex flex-col">
          <div className="mb-4">
            <Quote className="h-8 w-8 text-primary/20" />
          </div>

          <p className="flex-grow text-lg mb-6 italic">
            {testimonio.content}
          </p>

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={testimonio.author.avatar} alt={testimonio.author.name} />
                <AvatarFallback>{testimonio.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold">{testimonio.author.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {testimonio.author.title}
                </p>
              </div>
            </div>

            <div className="text-right">
              {showRating && (
                <div className="flex gap-0.5 mb-1">
                  {renderStars(testimonio.rating)}
                </div>
              )}
              {showDate && (
                <p className="text-xs text-muted-foreground">
                  {new Date(testimonio.date).toLocaleDateString()}
                </p>
              )}
              {showVerified && testimonio.verified && (
                <p className="text-xs text-green-500 font-medium">
                  ✓ Verificado
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const paginatedTestimonios = React.useMemo(() => {
    const start = currentPage * itemsPerPage;
    return testimonios.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, testimonios]);

  const totalPages = Math.ceil(testimonios.length / itemsPerPage);

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
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
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
          {paginatedTestimonios.map(testimonio => (
            <div
              key={testimonio.id}
              className={cn(
                layout === 'carousel' && 'snap-center shrink-0 w-80 mx-2'
              )}
            >
              {renderTestimonio(testimonio)}
            </div>
          ))}
        </motion.div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index ? 'default' : 'outline'}
                size="icon"
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
