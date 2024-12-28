import { TemplateSection } from '@/types/templates';

export const reviews: TemplateSection = {
  name: 'Reviews',
  description: 'Reseñas de clientes',
  thumbnail: '/sections/reviews-local.jpg',
  content: {
    heading: 'Lo que dicen nuestros clientes',
    subheading: 'Opiniones verificadas de clientes reales',
    stats: {
      averageRating: 4.8,
      totalReviews: 150,
      ratingDistribution: {
        5: 80,
        4: 50,
        3: 15,
        2: 3,
        1: 2
      }
    },
    reviews: [
      {
        name: 'Ana Martínez',
        rating: 5,
        date: '2023-12-15',
        text: 'Excelente servicio, muy profesionales y puntuales',
        image: '/reviews/ana.jpg',
        verified: true,
        response: {
          text: '¡Gracias Ana por tu comentario! Nos alegra que hayas quedado satisfecha.',
          date: '2023-12-16'
        }
      },
      {
        name: 'Pedro Sánchez',
        rating: 5,
        date: '2023-12-10',
        text: 'El mejor servicio de la zona, altamente recomendado',
        image: '/reviews/pedro.jpg',
        verified: true
      },
      {
        name: 'Laura González',
        rating: 4,
        date: '2023-12-05',
        text: 'Muy buen servicio, personal amable y profesional',
        image: '/reviews/laura.jpg',
        verified: true
      }
    ],
    platforms: [
      {
        name: 'Google',
        rating: 4.8,
        reviews: 120,
        url: '#google-reviews',
        icon: '/icons/google.svg'
      },
      {
        name: 'Yelp',
        rating: 4.7,
        reviews: 30,
        url: '#yelp-reviews',
        icon: '/icons/yelp.svg'
      }
    ],
    cta: {
      text: 'Dejar una reseña',
      url: '#write-review'
    }
  }
};
