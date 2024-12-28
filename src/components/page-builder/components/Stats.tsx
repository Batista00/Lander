import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Edit2 } from 'lucide-react';

interface StatsProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
  onChange?: (component: Component) => void;
}

interface StatItem {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  prefix?: string;
  suffix?: string;
  animation?: 'count' | 'fade' | 'none';
}

export const Stats: React.FC<StatsProps> = ({
  component,
  mode = 'preview',
  onChange
}) => {
  const {
    title = 'Nuestros Números',
    subtitle = 'Estadísticas Destacadas',
    description = 'Resultados que hablan por sí mismos',
    stats = [
      {
        id: '1',
        value: '99',
        label: 'Satisfacción',
        description: 'de nuestros clientes están satisfechos',
        icon: '😊',
        color: '#4F46E5',
        suffix: '%',
        animation: 'count'
      },
      {
        id: '2',
        value: '24/7',
        label: 'Soporte',
        description: 'atención al cliente disponible',
        icon: '🎯',
        color: '#10B981',
        animation: 'fade'
      },
      {
        id: '3',
        value: '10',
        label: 'Clientes',
        description: 'confían en nuestros servicios',
        icon: '🌟',
        color: '#F59E0B',
        suffix: 'K+',
        animation: 'count'
      },
      {
        id: '4',
        value: '15',
        label: 'Años',
        description: 'de experiencia en el mercado',
        icon: '⚡',
        color: '#EC4899',
        suffix: '+',
        animation: 'count'
      }
    ],
    layout = 'grid', // 'grid' | 'row' | 'compact'
    showIcons = true,
    showDescriptions = true,
    animationDuration = 2000,
    backgroundColor = 'transparent',
    textColor = 'inherit',
    rounded = true,
    shadow = true,
    border = false,
    hover = true
  } = component.content;

  const isEditing = mode === 'edit';
  const [editingStat, setEditingStat] = useState<string | null>(null);

  const handleChange = (field: string, value: any) => {
    if (!onChange) return;
    onChange({
      ...component,
      content: {
        ...component.content,
        [field]: value
      }
    });
  };

  const handleStatChange = (id: string, field: string, value: any) => {
    if (!onChange) return;
    const updatedStats = stats.map(stat => 
      stat.id === id ? { ...stat, [field]: value } : stat
    );
    handleChange('stats', updatedStats);
  };

  const addNewStat = () => {
    if (!onChange) return;
    const newStat = {
      id: Date.now().toString(),
      value: '0',
      label: 'Nueva Estadística',
      description: 'Descripción de la estadística',
      icon: '📊',
      color: '#6366F1',
      animation: 'count' as const
    };
    handleChange('stats', [...stats, newStat]);
    setEditingStat(newStat.id);
  };

  const deleteStat = (id: string) => {
    if (!onChange) return;
    handleChange('stats', stats.filter(stat => stat.id !== id));
  };

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

  const Counter = ({ value, duration, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const controls = useAnimation();
  
    useEffect(() => {
      let startTime: number;
      let animationFrame: number;
      const numericValue = parseInt(value);
  
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(numericValue * percentage));
  
        if (progress < duration) {
          animationFrame = requestAnimationFrame(updateCount);
        }
      };
  
      if (!isNaN(numericValue)) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(NaN);
      }
  
      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [value, duration]);
  
    return (
      <span>
        {prefix}
        {isNaN(count) ? value : count}
        {suffix}
      </span>
    );
  };

  return (
    <div
      className={cn(
        'w-full py-16',
        backgroundColor !== 'transparent' && 'bg-opacity-50',
        rounded && 'rounded-lg',
        shadow && 'shadow-lg',
        border && 'border',
        component.styles?.spacing
      )}
      style={{
        backgroundColor,
        color: textColor
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {isEditing ? (
            <>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="text-lg font-semibold text-primary mb-2 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
                placeholder="Subtítulo"
              />
              <input
                type="text"
                value={title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="text-3xl font-bold mb-4 bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
                placeholder="Título"
              />
              <textarea
                value={description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="text-muted-foreground max-w-2xl mx-auto bg-transparent border-none focus:ring-2 focus:ring-primary text-center w-full"
                placeholder="Descripción"
                rows={2}
              />
            </>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-primary mb-2">{subtitle}</h3>
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
            </>
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            'grid gap-8',
            layout === 'grid' && 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
            layout === 'row' && 'grid-cols-1 md:grid-cols-2',
            layout === 'compact' && 'grid-cols-2 md:grid-cols-4'
          )}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              className={cn(
                'relative group p-6',
                rounded && 'rounded-lg',
                shadow && 'shadow-sm',
                border && 'border',
                hover && 'hover:shadow-md transition-shadow duration-200',
                layout === 'compact' ? 'text-center' : 'flex flex-col items-center'
              )}
              style={{
                backgroundColor: stat.color + '10'
              }}
            >
              {isEditing && (
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingStat(stat.id)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteStat(stat.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {showIcons && (
                <div
                  className={cn(
                    'rounded-full flex items-center justify-center text-2xl mb-4',
                    layout === 'compact' ? 'w-12 h-12' : 'w-16 h-16'
                  )}
                  style={{ backgroundColor: stat.color + '20' }}
                >
                  {isEditing && editingStat === stat.id ? (
                    <input
                      type="text"
                      value={stat.icon}
                      onChange={(e) => handleStatChange(stat.id, 'icon', e.target.value)}
                      className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    stat.icon
                  )}
                </div>
              )}

              <div className={cn(
                'font-bold mb-2',
                layout === 'compact' ? 'text-2xl' : 'text-4xl'
              )} style={{ color: stat.color }}>
                {isEditing && editingStat === stat.id ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={stat.prefix || ''}
                      onChange={(e) => handleStatChange(stat.id, 'prefix', e.target.value)}
                      className="w-16 text-center bg-transparent border-none focus:ring-2 focus:ring-primary"
                      placeholder="Prefijo"
                    />
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => handleStatChange(stat.id, 'value', e.target.value)}
                      className="w-24 text-center bg-transparent border-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      value={stat.suffix || ''}
                      onChange={(e) => handleStatChange(stat.id, 'suffix', e.target.value)}
                      className="w-16 text-center bg-transparent border-none focus:ring-2 focus:ring-primary"
                      placeholder="Sufijo"
                    />
                  </div>
                ) : (
                  stat.animation === 'count' ? (
                    <Counter
                      value={stat.value}
                      duration={animationDuration}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  ) : (
                    <span>
                      {stat.prefix}{stat.value}{stat.suffix}
                    </span>
                  )
                )}
              </div>

              <div className="font-semibold mb-2">
                {isEditing && editingStat === stat.id ? (
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(stat.id, 'label', e.target.value)}
                    className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary"
                  />
                ) : (
                  stat.label
                )}
              </div>

              {showDescriptions && (
                <p className="text-sm text-muted-foreground text-center">
                  {isEditing && editingStat === stat.id ? (
                    <textarea
                      value={stat.description}
                      onChange={(e) => handleStatChange(stat.id, 'description', e.target.value)}
                      className="w-full text-center bg-transparent border-none focus:ring-2 focus:ring-primary"
                      rows={2}
                    />
                  ) : (
                    stat.description
                  )}
                </p>
              )}

              {isEditing && editingStat === stat.id && (
                <div className="mt-4">
                  <input
                    type="color"
                    value={stat.color}
                    onChange={(e) => handleStatChange(stat.id, 'color', e.target.value)}
                    className="w-full h-8 rounded cursor-pointer"
                  />
                </div>
              )}
            </motion.div>
          ))}

          {isEditing && (
            <motion.div
              variants={itemVariants}
              className={cn(
                'flex items-center justify-center p-6',
                rounded && 'rounded-lg',
                shadow && 'shadow-sm',
                border && 'border',
                'border-dashed cursor-pointer hover:border-primary transition-colors duration-200'
              )}
              onClick={addNewStat}
            >
              <div className="text-center">
                <Plus className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                <p className="text-muted-foreground">Agregar Estadística</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
