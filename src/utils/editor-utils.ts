import { nanoid } from 'nanoid';

export const createSnapshot = (components: any[]) => ({
  id: nanoid(),
  timestamp: new Date().toISOString(),
  components: JSON.parse(JSON.stringify(components))
});

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const componentTemplates = {
  heading: {
    title: 'Nuevo Título',
    subtitle: 'Nuevo Subtítulo',
    alignment: 'left',
    size: 'large'
  },
  text: {
    content: 'Nuevo texto',
    alignment: 'left',
    color: '#000000'
  },
  image: {
    url: '',
    alt: '',
    caption: '',
    size: 'medium'
  },
  button: {
    text: 'Click aquí',
    url: '#',
    style: 'primary'
  },
  services: {
    title: 'Nuestros Servicios',
    subtitle: 'Lo que ofrecemos',
    services: [
      {
        id: crypto.randomUUID(),
        title: 'Servicio 1',
        description: 'Descripción del servicio 1'
      },
      {
        id: crypto.randomUUID(),
        title: 'Servicio 2',
        description: 'Descripción del servicio 2'
      },
      {
        id: crypto.randomUUID(),
        title: 'Servicio 3',
        description: 'Descripción del servicio 3'
      }
    ]
  }
};

export const shortcuts = {
  save: 'ctrl+s',
  undo: 'ctrl+z',
  redo: 'ctrl+y',
  delete: 'delete',
  duplicate: 'ctrl+d',
  preview: 'ctrl+p',
  publish: 'ctrl+shift+p',
  newComponent: 'ctrl+n',
  help: 'ctrl+h'
};

export const validateComponent = (component: any) => {
  const requiredFields = {
    heading: ['title'],
    text: ['content'],
    image: ['url', 'alt'],
    button: ['text', 'url'],
    services: ['title', 'services']
  };

  const type = component.type as keyof typeof requiredFields;
  const fields = requiredFields[type] || [];
  
  return fields.every(field => component.content?.[field]);
};

export const exportToHTML = (components: any[]) => {
  return components.map(component => {
    switch(component.type) {
      case 'heading':
        return `<h1 class="text-${component.content.alignment}">${component.content.title}</h1>`;
      case 'text':
        return `<p class="text-${component.content.alignment}">${component.content.content}</p>`;
      case 'image':
        return `<img src="${component.content.url}" alt="${component.content.alt}" class="img-${component.content.size}">`;
      case 'button':
        return `<a href="${component.content.url}" class="btn btn-${component.content.style}">${component.content.text}</a>`;
      case 'services':
        return `
          <h2>${component.content.title}</h2>
          <p>${component.content.subtitle}</p>
          <ul>
            ${component.content.services.map(service => `
              <li>
                <h3>${service.title}</h3>
                <p>${service.description}</p>
              </li>
            `).join('')}
          </ul>
        `;
      default:
        return '';
    }
  }).join('\n');
};
