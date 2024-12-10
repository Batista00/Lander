import { db } from '../lib/firebase';
import { collection, addDoc, Timestamp, doc, setDoc } from 'firebase/firestore';

const templateCategories = [
  'Landing Pages',
  'Dashboards',
  'E-commerce',
  'Portfolios',
  'Blogs',
  'Admin Panels'
];

const sampleTemplates = [
  {
    id: 'modern-landing-pro-template',
    title: 'Modern Landing Pro',
    description: 'A responsive landing page template with modern design. Perfect for businesses looking to establish a strong online presence. Includes customizable sections, animations, and mobile-first design.',
    price: 49.99,
    category: 'Landing Pages',
    previewImage: 'https://cdn.dribbble.com/userupload/13133188/file/original-0dd8d8d9d1bc3ddc1c55456c3c1eb056.jpg?resize=1024x768',
    downloadUrl: 'https://example.com/download1.zip',
    sellerId: '', // Se llenará con el ID del usuario actual
    tags: ['modern', 'responsive', 'landing page', 'business', 'animations'],
    status: 'published',
    rating: 4.8,
    sales: 156,
    seller: {
      name: 'Digital Solutions',
      verified: true,
      bio: 'Creating premium web templates since 2020. Specializing in modern, responsive designs.',
      portfolio: 'https://example.com/digitalsolutions',
      contactEmail: 'contact@digitalsolutions.com'
    },
    features: [
      'Responsive Design',
      'Custom Animations',
      'SEO Optimized',
      'Performance Optimized',
      'Easy Customization',
      '24/7 Support'
    ],
    lastUpdated: Timestamp.now(),
    version: '2.0.0',
    compatibleWith: ['React', 'Next.js', 'Vite'],
    requirements: ['Node.js 14+', 'npm or yarn'],
    includes: [
      'Source Code',
      'Documentation',
      'Premium Support',
      'Future Updates'
    ]
  },
  {
    id: 'portfolio-premium-template',
    title: 'Portfolio Premium',
    description: 'Showcase your work with this elegant portfolio template. Features a modern grid layout, smooth transitions, and dedicated sections for projects, skills, and contact information.',
    price: 39.99,
    category: 'Portfolios',
    previewImage: 'https://cdn.dribbble.com/userupload/13133186/file/original-e8f1c9d4c2145e814e7867e8fe7c88a6.jpg?resize=1024x768',
    downloadUrl: 'https://example.com/download2.zip',
    sellerId: '', // Se llenará con el ID del usuario actual
    tags: ['portfolio', 'creative', 'showcase', 'gallery', 'personal'],
    status: 'published',
    rating: 4.7,
    sales: 85,
    seller: {
      name: 'Creative Labs',
      verified: true,
      bio: 'We create beautiful, functional templates for creative professionals.',
      portfolio: 'https://example.com/creativelabs',
      contactEmail: 'hello@creativelabs.com'
    },
    features: [
      'Project Gallery',
      'Skills Section',
      'Contact Form',
      'Blog Integration',
      'Social Media Links',
      'Analytics Integration'
    ],
    lastUpdated: Timestamp.now(),
    version: '1.5.0',
    compatibleWith: ['React', 'Gatsby'],
    requirements: ['Node.js 14+', 'npm or yarn'],
    includes: [
      'Source Code',
      'Documentation',
      'Email Support',
      '6 Months Updates'
    ]
  },
  {
    id: 'e-commerce-starter-template',
    title: 'E-commerce Starter',
    description: 'Start your online store with this complete e-commerce template',
    price: 59.99,
    category: 'E-commerce',
    previewImage: 'https://cdn.dribbble.com/userupload/13133185/file/original-e0f7a8d7c33c8764c6e230e44ffe6349.jpg?resize=1024x768',
    downloadUrl: 'https://example.com/download3.zip',
    sellerId: '', // Se llenará con el ID del usuario actual
    tags: ['e-commerce', 'shop', 'store'],
    status: 'published',
    rating: 4.9,
    sales: 210,
    seller: {
      name: 'Web Masters',
      verified: true
    }
  },
  {
    id: 'dashboard-analytics-template',
    title: 'Dashboard Analytics',
    description: 'Professional dashboard template with advanced analytics',
    price: 69.99,
    category: 'Dashboards',
    previewImage: 'https://cdn.dribbble.com/userupload/13133187/file/original-e7d4c1a39974c79f5cd62a4c1859abc6.jpg?resize=1024x768',
    downloadUrl: 'https://example.com/download4.zip',
    sellerId: '', // Se llenará con el ID del usuario actual
    tags: ['dashboard', 'analytics', 'admin'],
    status: 'published',
    rating: 4.6,
    sales: 178,
    seller: {
      name: 'Data Solutions',
      verified: true
    }
  }
];

export const initializeFirestore = async (userId: string) => {
  try {
    console.log('Initializing Firestore with sample data...');

    // Crear documentos de templates con IDs personalizados
    for (const template of sampleTemplates) {
      const templateWithSeller = {
        ...template,
        sellerId: userId,
        seller: {
          ...template.seller,
          // Usar el ID del usuario actual para el perfil del vendedor
          id: userId,
          name: template.seller.name,
          verified: template.seller.verified
        },
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      // Usar setDoc con un ID personalizado en lugar de addDoc
      await setDoc(
        doc(db, 'templates', template.id),
        templateWithSeller
      );

      console.log(`Template created: ${template.title}`);
    }

    // Crear un perfil de vendedor para el usuario
    const sellerProfile = {
      userId: userId,
      name: "Digital Solutions",
      bio: "Creating premium web templates since 2020. Specializing in modern, responsive designs.",
      verified: true,
      portfolio: "https://example.com/digitalsolutions",
      contactEmail: "contact@digitalsolutions.com",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      totalSales: 241,
      rating: 4.8,
      templates: sampleTemplates.map(template => template.id)
    };

    await setDoc(
      doc(db, 'sellers', userId),
      sellerProfile
    );

    console.log('Sample data initialized successfully!');
  } catch (error) {
    console.error('Error initializing Firestore:', error);
  }
};
