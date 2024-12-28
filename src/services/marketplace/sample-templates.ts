import { Timestamp } from 'firebase/firestore';

export const sampleTemplates = [
  {
    title: "Business Pro Landing",
    description: "Template profesional para empresas con secciones para servicios, testimonios y formulario de contacto",
    price: 49.99,
    image: "https://firebasestorage.googleapis.com/v0/b/landing-builder.appspot.com/o/templates%2Fbusiness-landing.jpg",
    rating: 4.5,
    sales: 120,
    seller: {
      id: "seller1",
      name: "Digital Solutions",
      rating: 4.8
    },
    category: "business",
    status: "published",
    createdAt: Timestamp.now()
  },
  {
    title: "Creative Portfolio",
    description: "Portfolio moderno y minimalista ideal para creativos y diseñadores",
    price: 39.99,
    image: "https://firebasestorage.googleapis.com/v0/b/landing-builder.appspot.com/o/templates%2Fportfolio-landing.jpg",
    rating: 4.7,
    sales: 85,
    seller: {
      id: "seller2",
      name: "Creative Labs",
      rating: 4.6
    },
    category: "portfolio",
    status: "published",
    createdAt: Timestamp.now()
  },
  {
    title: "E-commerce Launch",
    description: "Landing page optimizada para conversión con enfoque en productos y ofertas",
    price: 59.99,
    image: "https://firebasestorage.googleapis.com/v0/b/landing-builder.appspot.com/o/templates%2Fecommerce-landing.jpg",
    rating: 4.8,
    sales: 200,
    seller: {
      id: "seller3",
      name: "Web Masters",
      rating: 4.9
    },
    category: "ecommerce",
    status: "published",
    createdAt: Timestamp.now()
  },
  {
    title: "Startup MVP",
    description: "Template perfecto para startups que quieren validar su MVP",
    price: 44.99,
    image: "https://firebasestorage.googleapis.com/v0/b/landing-builder.appspot.com/o/templates%2Fstartup-landing.jpg",
    rating: 4.6,
    sales: 95,
    seller: {
      id: "seller1",
      name: "Digital Solutions",
      rating: 4.8
    },
    category: "startup",
    status: "published",
    createdAt: Timestamp.now()
  },
  {
    title: "SaaS Product",
    description: "Landing page diseñada específicamente para productos SaaS con planes y características",
    price: 69.99,
    image: "https://firebasestorage.googleapis.com/v0/b/landing-builder.appspot.com/o/templates%2Fsaas-landing.jpg",
    rating: 4.9,
    sales: 150,
    seller: {
      id: "seller2",
      name: "Creative Labs",
      rating: 4.6
    },
    category: "saas",
    status: "published",
    createdAt: Timestamp.now()
  }
];
