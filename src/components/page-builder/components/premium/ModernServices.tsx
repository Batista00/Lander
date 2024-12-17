import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Service {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface ModernServicesProps {
  data: {
    title: string;
    subtitle: string;
    services: Service[];
  };
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export const ModernServices: React.FC<ModernServicesProps> = ({ data, onEdit, isEditing }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

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

        {/* Services grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {data.services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-16 h-16 mb-6">
                <div className="absolute inset-0 bg-blue-500/10 rounded-xl transform -rotate-6 group-hover:rotate-6 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-500/10 rounded-xl transform rotate-6 group-hover:-rotate-6 transition-transform duration-300" />
                <div className="relative w-full h-full bg-blue-500 rounded-xl flex items-center justify-center text-white">
                  {isEditing ? (
                    <input
                      type="text"
                      value={service.icon}
                      onChange={(e) => onEdit?.(`services.${index}.icon`, e.target.value)}
                      className="w-full text-center bg-transparent focus:outline-none"
                    />
                  ) : (
                    <i className={service.icon} />
                  )}
                </div>
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={service.title}
                  onChange={(e) => onEdit?.(`services.${index}.title`, e.target.value)}
                  className="text-xl font-bold mb-4 w-full bg-transparent border-b focus:outline-none"
                />
              ) : (
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              )}

              {isEditing ? (
                <textarea
                  value={service.description}
                  onChange={(e) => onEdit?.(`services.${index}.description`, e.target.value)}
                  className="text-gray-600 w-full bg-transparent border-b focus:outline-none"
                  rows={3}
                />
              ) : (
                <p className="text-gray-600">{service.description}</p>
              )}

              {service.link && (
                <motion.a
                  href={service.link}
                  className="inline-block mt-6 text-blue-500 font-medium group-hover:text-blue-600"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Saber más →
                </motion.a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernServices;
