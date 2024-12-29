import { ComponentType } from '@/types/landing';

interface ComponentStyle {
  container: string;
  content?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  button?: string;
  [key: string]: string | undefined;
}

interface StyleSet {
  free: ComponentStyle;
  premium: ComponentStyle;
}

export const componentStyles: Record<ComponentType, StyleSet> = {
  [ComponentType.TOPBAR]: {
    free: {
      container: 'w-full bg-white shadow-sm py-4',
      content: 'container mx-auto flex justify-between items-center',
      title: 'text-xl font-bold',
      button: 'px-4 py-2 rounded-md bg-primary text-white'
    },
    premium: {
      container: 'w-full bg-gradient-to-r from-primary to-primary/80 text-white py-4 backdrop-blur-sm',
      content: 'container mx-auto flex justify-between items-center',
      title: 'text-xl font-bold tracking-tight',
      button: 'px-4 py-2 rounded-md bg-white text-primary hover:bg-white/90 transition-colors'
    }
  },
  [ComponentType.HERO]: {
    free: {
      container: 'w-full bg-gray-50 py-16',
      content: 'container mx-auto text-center px-4',
      title: 'text-4xl font-bold mb-4',
      subtitle: 'text-xl text-gray-600 mb-8',
      description: 'text-gray-600 max-w-2xl mx-auto mb-8',
      button: 'px-6 py-3 rounded-md bg-primary text-white font-medium'
    },
    premium: {
      container: 'w-full min-h-[80vh] bg-gradient-to-br from-primary/5 to-primary/10 py-24 flex items-center',
      content: 'container mx-auto text-center px-4',
      title: 'text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark',
      subtitle: 'text-2xl text-gray-700 mb-8',
      description: 'text-gray-600 max-w-3xl mx-auto mb-12 text-lg',
      button: 'px-8 py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl'
    }
  },
  [ComponentType.SERVICES]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4',
      title: 'text-3xl font-bold text-center mb-12',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-8',
      card: 'p-6 bg-white rounded-lg shadow-sm',
      cardTitle: 'text-xl font-semibold mb-4',
      cardDescription: 'text-gray-600'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-b from-white to-primary/5',
      content: 'container mx-auto px-4',
      title: 'text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-12',
      card: 'p-8 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary/10',
      cardTitle: 'text-2xl font-bold mb-4 text-primary',
      cardDescription: 'text-gray-600 leading-relaxed'
    }
  },
  [ComponentType.CONTACT]: {
    free: {
      container: 'w-full py-16 bg-gray-50',
      content: 'container mx-auto px-4 max-w-xl',
      title: 'text-3xl font-bold text-center mb-8',
      form: 'space-y-6',
      input: 'w-full p-3 border rounded-md',
      button: 'w-full py-3 bg-primary text-white rounded-md'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-br from-primary/5 to-primary/10',
      content: 'container mx-auto px-4 max-w-2xl',
      title: 'text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark',
      form: 'space-y-8',
      input: 'w-full p-4 border border-primary/20 rounded-xl focus:ring-2 focus:ring-primary/20 transition-all',
      button: 'w-full py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl'
    }
  },
  [ComponentType.FOOTER]: {
    free: {
      container: 'w-full bg-gray-900 text-white py-12',
      content: 'container mx-auto px-4',
      grid: 'grid grid-cols-1 md:grid-cols-4 gap-8',
      title: 'text-lg font-semibold mb-4',
      link: 'text-gray-400 hover:text-white transition-colors'
    },
    premium: {
      container: 'w-full bg-gradient-to-br from-gray-900 to-primary-dark text-white py-16',
      content: 'container mx-auto px-4',
      grid: 'grid grid-cols-1 md:grid-cols-4 gap-12',
      title: 'text-xl font-bold mb-6',
      link: 'text-gray-300 hover:text-white transition-colors'
    }
  },
  // Componentes Premium
  [ComponentType.FEATURES]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-br from-white to-primary/5',
      content: 'container mx-auto px-4',
      title: 'text-4xl font-bold text-center mb-16',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12',
      card: 'p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300',
      icon: 'w-12 h-12 text-primary mb-6',
      featureTitle: 'text-2xl font-bold mb-4',
      description: 'text-gray-600 leading-relaxed'
    }
  },
  [ComponentType.TESTIMONIALS]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-br from-primary/5 to-primary/10',
      content: 'container mx-auto px-4 max-w-6xl',
      title: 'text-4xl font-bold text-center mb-16',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
      card: 'p-8 bg-white rounded-xl shadow-lg',
      quote: 'text-gray-600 mb-6 text-lg italic',
      author: 'font-semibold text-lg',
      role: 'text-gray-500'
    }
  },
  [ComponentType.PRICING]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4'
    },
    premium: {
      container: 'w-full py-24 bg-white',
      content: 'container mx-auto px-4',
      title: 'text-4xl font-bold text-center mb-16',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-8',
      card: 'p-8 rounded-xl border border-primary/20 hover:border-primary transition-all duration-300',
      planName: 'text-2xl font-bold mb-4',
      price: 'text-4xl font-bold text-primary mb-6',
      features: 'space-y-4 mb-8',
      button: 'w-full py-3 rounded-xl bg-primary text-white hover:bg-primary-dark transition-colors'
    }
  },
  [ComponentType.TEAM]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-br from-white to-primary/5',
      content: 'container mx-auto px-4',
      title: 'text-4xl font-bold text-center mb-16',
      grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8',
      card: 'text-center',
      image: 'w-32 h-32 rounded-full mx-auto mb-4 object-cover',
      name: 'text-xl font-bold mb-2',
      role: 'text-gray-600 mb-4',
      social: 'flex justify-center space-x-4'
    }
  },
  [ComponentType.BLOG]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4'
    },
    premium: {
      container: 'w-full py-24 bg-white',
      content: 'container mx-auto px-4',
      title: 'text-4xl font-bold text-center mb-16',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-12',
      card: 'group',
      image: 'w-full h-64 object-cover rounded-xl mb-6 group-hover:shadow-xl transition-all duration-300',
      date: 'text-gray-500 mb-2',
      postTitle: 'text-2xl font-bold mb-4 group-hover:text-primary transition-colors',
      excerpt: 'text-gray-600 line-clamp-3'
    }
  },
  [ComponentType.CTA]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-br from-primary to-primary-dark text-white',
      content: 'container mx-auto px-4 text-center max-w-4xl',
      title: 'text-4xl font-bold mb-8',
      description: 'text-xl mb-12 text-white/90',
      button: 'px-8 py-4 bg-white text-primary rounded-xl hover:bg-white/90 transition-colors font-medium'
    }
  },
  [ComponentType.PRODUCTS]: {
    free: {
      container: 'w-full py-16',
      content: 'container mx-auto px-4',
      title: 'text-3xl font-bold text-center mb-12',
      grid: 'grid grid-cols-1 md:grid-cols-3 gap-8',
      card: 'bg-white rounded-lg shadow-sm overflow-hidden',
      image: 'w-full h-48 object-cover',
      productTitle: 'text-xl font-semibold p-4',
      price: 'text-primary font-bold text-lg px-4 pb-4'
    },
    premium: {
      container: 'w-full py-24 bg-gradient-to-br from-white to-primary/5',
      content: 'container mx-auto px-4',
      title: 'text-4xl font-bold text-center mb-16',
      grid: 'grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8',
      card: 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300',
      image: 'w-full h-64 object-cover',
      productTitle: 'text-2xl font-bold p-6',
      price: 'text-primary text-2xl font-bold px-6 pb-6',
      button: 'w-full py-4 bg-primary text-white hover:bg-primary-dark transition-colors'
    }
  }
};
