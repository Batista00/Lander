import { Component } from '@/types/landing';
import { componentStyles } from '@/services/componentStyles';
import { cn } from '@/lib/utils';

interface HeroProps {
  component: Component;
  className?: string;
}

export function Hero({ component, className }: HeroProps) {
  const style = componentStyles.HERO[component.style || 'free'];
  const content = component.content;

  return (
    <div className={cn(style.container, className)}>
      <div className={style.content}>
        <h1 className={style.title}>
          {content.title || '¡Bienvenido a tu Landing Page!'}
        </h1>
        {content.subtitle && (
          <h2 className={style.subtitle}>
            {content.subtitle}
          </h2>
        )}
        <p className={style.description}>
          {content.description || 'Describe tu producto o servicio de manera atractiva. Este es el lugar perfecto para captar la atención de tus visitantes.'}
        </p>
        <div className="flex justify-center gap-4">
          <button className={style.button}>
            {content.primaryButtonText || 'Empezar Ahora'}
          </button>
          {component.style === 'premium' && content.secondaryButtonText && (
            <button className="px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary/5 transition-colors">
              {content.secondaryButtonText}
            </button>
          )}
        </div>
        {component.style === 'premium' && content.image && (
          <div className="mt-12">
            <img
              src={content.image}
              alt="Hero"
              className="max-w-2xl mx-auto rounded-xl shadow-2xl"
            />
          </div>
        )}
      </div>
    </div>
  );
}
