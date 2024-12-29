import { Component } from '@/types/landing';
import { componentStyles } from '@/services/componentStyles';
import { cn } from '@/lib/utils';

interface FooterProps {
  component: Component;
  className?: string;
}

export function Footer({ component, className }: FooterProps) {
  const style = componentStyles.FOOTER[component.style || 'free'];
  const content = component.content;

  const defaultLinks = {
    company: [
      { text: 'Sobre Nosotros', url: '#' },
      { text: 'Contacto', url: '#' },
      { text: 'Blog', url: '#' }
    ],
    services: [
      { text: 'Servicios', url: '#' },
      { text: 'Productos', url: '#' },
      { text: 'Precios', url: '#' }
    ],
    legal: [
      { text: 'Términos', url: '#' },
      { text: 'Privacidad', url: '#' },
      { text: 'Cookies', url: '#' }
    ],
    social: [
      { text: 'Facebook', url: '#' },
      { text: 'Twitter', url: '#' },
      { text: 'Instagram', url: '#' }
    ]
  };

  const links = content.links || defaultLinks;

  return (
    <footer className={cn(style.container, className)}>
      <div className={style.content}>
        <div className={style.grid}>
          <div>
            <h3 className={style.title}>
              {content.companyName || 'Nombre de la Empresa'}
            </h3>
            <p className="text-gray-400 mb-6">
              {content.description || 'Breve descripción de la empresa y su propósito.'}
            </p>
          </div>

          <div>
            <h3 className={style.title}>Empresa</h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={style.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={style.title}>Servicios</h3>
            <ul className="space-y-2">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={style.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={style.title}>Legal</h3>
            <ul className="space-y-2">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.url} className={style.link}>
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {component.style === 'premium' && (
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400">
                © {new Date().getFullYear()} {content.companyName}. Todos los derechos reservados.
              </p>
              <div className="flex space-x-6">
                {links.social.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className={style.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}
