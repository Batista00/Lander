import { Component } from '@/types/landing';
import { componentStyles } from '@/services/componentStyles';
import { cn } from '@/lib/utils';

interface TopBarProps {
  component: Component;
  className?: string;
}

export function TopBar({ component, className }: TopBarProps) {
  const style = componentStyles.TOPBAR[component.style || 'free'];
  const content = component.content;

  return (
    <div className={cn(style.container, className)}>
      <div className={style.content}>
        <h1 className={style.title}>
          {content.title || 'Nombre de la Empresa'}
        </h1>
        <nav className="space-x-6">
          {(content.links || [
            { text: 'Inicio', url: '#' },
            { text: 'Servicios', url: '#servicios' },
            { text: 'Contacto', url: '#contacto' }
          ]).map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="hover:text-primary transition-colors"
            >
              {link.text}
            </a>
          ))}
        </nav>
        <button className={style.button}>
          {content.buttonText || 'Contactar'}
        </button>
      </div>
    </div>
  );
}
