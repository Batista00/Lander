import { motion } from 'framer-motion';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

export function Blog() {
  const posts = [
    {
      title: "10 Consejos para Mejorar tus Landing Pages",
      excerpt: "Descubre las mejores prácticas para optimizar tus landing pages y aumentar las conversiones.",
      author: "Ana García",
      date: "10 Dic 2024",
      readTime: "5 min",
      category: "Optimización",
      image: "/images/blog/post-1.jpg"
    },
    {
      title: "Tendencias de Diseño para 2025",
      excerpt: "Las últimas tendencias en diseño de landing pages que debes conocer para mantenerte competitivo.",
      author: "Carlos Ruiz",
      date: "8 Dic 2024",
      readTime: "7 min",
      category: "Diseño",
      image: "/images/blog/post-2.jpg"
    },
    {
      title: "Guía de A/B Testing",
      excerpt: "Todo lo que necesitas saber para realizar pruebas A/B efectivas en tus landing pages.",
      author: "Laura Martínez",
      date: "5 Dic 2024",
      readTime: "10 min",
      category: "Analytics",
      image: "/images/blog/post-3.jpg"
    },
    {
      title: "SEO para Landing Pages",
      excerpt: "Estrategias probadas para mejorar el posicionamiento de tus landing pages en buscadores.",
      author: "Miguel Torres",
      date: "3 Dic 2024",
      readTime: "8 min",
      category: "SEO",
      image: "/images/blog/post-4.jpg"
    },
    {
      title: "Psicología del Color en Landing Pages",
      excerpt: "Cómo usar la psicología del color para influir en las decisiones de tus visitantes.",
      author: "Patricia López",
      date: "1 Dic 2024",
      readTime: "6 min",
      category: "Diseño",
      image: "/images/blog/post-5.jpg"
    },
    {
      title: "Copywriting que Convierte",
      excerpt: "Técnicas de copywriting probadas para aumentar las conversiones en tus landing pages.",
      author: "Roberto Sánchez",
      date: "29 Nov 2024",
      readTime: "9 min",
      category: "Copywriting",
      image: "/images/blog/post-6.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-32">
      <div className="fixed inset-0 pattern-background" />
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#00E5B0] to-[#FF1F8C] text-transparent bg-clip-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog
          </motion.h1>
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Descubre las últimas tendencias y mejores prácticas en diseño de landing pages
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-[#00E5B0]/50">
                <div className="relative aspect-[16/9] bg-gradient-to-br from-[#00E5B0]/20 to-[#FF1F8C]/20">
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur-xl text-white">
                    {post.category}
                  </span>
                </div>
                
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#00E5B0] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                  
                  <button className="flex items-center text-[#00E5B0] font-medium group-hover:text-white transition-colors">
                    Leer más
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
