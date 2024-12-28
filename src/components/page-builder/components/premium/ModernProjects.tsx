import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
  image: string;
  title: string;
  category: string;
  description: string;
  link?: string;
}

interface ModernProjectsProps {
  data: {
    title: string;
    subtitle: string;
    projects: Project[];
    categories: string[];
  };
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

const ModernProjects: React.FC<ModernProjectsProps> = ({ data, onEdit, isEditing }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = activeCategory === 'all'
    ? data.projects
    : data.projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isEditing ? (
            <input
              type="text"
              value={data.title}
              onChange={(e) => onEdit?.('title', e.target.value)}
              className="text-4xl font-bold mb-4 w-full text-center bg-transparent border-b focus:outline-none"
            />
          ) : (
            <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
          )}
          
          {isEditing ? (
            <textarea
              value={data.subtitle}
              onChange={(e) => onEdit?.('subtitle', e.target.value)}
              className="text-xl text-gray-600 w-full text-center bg-transparent border-b focus:outline-none"
              rows={2}
            />
          ) : (
            <p className="text-xl text-gray-600">{data.subtitle}</p>
          )}
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full transition-colors duration-300 ${
              activeCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Todos
          </button>
          {data.categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-colors duration-300 ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg"
              >
                {/* Project image */}
                <div className="relative h-64 overflow-hidden">
                  {isEditing ? (
                    <input
                      type="text"
                      value={project.image}
                      onChange={(e) => onEdit?.(`projects.${index}.image`, e.target.value)}
                      className="absolute inset-0 w-full h-full bg-transparent border-2 border-dashed border-gray-300 focus:outline-none p-4"
                    />
                  ) : (
                    <>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                  )}
                </div>

                {/* Project info */}
                <div className="p-6">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => onEdit?.(`projects.${index}.title`, e.target.value)}
                        className="text-xl font-bold mb-2 w-full bg-transparent border-b focus:outline-none"
                      />
                      <input
                        type="text"
                        value={project.category}
                        onChange={(e) => onEdit?.(`projects.${index}.category`, e.target.value)}
                        className="text-sm text-blue-500 mb-3 w-full bg-transparent border-b focus:outline-none"
                      />
                      <textarea
                        value={project.description}
                        onChange={(e) => onEdit?.(`projects.${index}.description`, e.target.value)}
                        className="text-gray-600 w-full bg-transparent border-b focus:outline-none"
                        rows={3}
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm text-blue-500 mb-3">{project.category}</p>
                      <p className="text-gray-600">{project.description}</p>
                    </>
                  )}

                  {project.link && (
                    <motion.a
                      href={project.link}
                      className="inline-block mt-4 text-blue-500 font-medium hover:text-blue-600"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Ver proyecto →
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernProjects;
