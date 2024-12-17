import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
}

interface ModernTestimonialsProps {
  data: {
    title: string;
    subtitle: string;
    testimonials: Testimonial[];
  };
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export const ModernTestimonials: React.FC<ModernTestimonialsProps> = ({ data, onEdit, isEditing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % data.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section className="py-20 bg-white" ref={ref}>
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

        {/* Testimonials slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
            >
              {/* Rating stars */}
              <div className="flex justify-center mb-8">
                {renderStars(data.testimonials[currentIndex].rating)}
              </div>

              {/* Testimonial content */}
              {isEditing ? (
                <textarea
                  value={data.testimonials[currentIndex].content}
                  onChange={(e) => onEdit?.(`testimonials.${currentIndex}.content`, e.target.value)}
                  className="text-xl text-gray-700 text-center mb-8 w-full bg-transparent border-b focus:outline-none"
                  rows={4}
                />
              ) : (
                <p className="text-xl text-gray-700 text-center mb-8">
                  "{data.testimonials[currentIndex].content}"
                </p>
              )}

              {/* Author info */}
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={data.testimonials[currentIndex].avatar}
                      onChange={(e) => onEdit?.(`testimonials.${currentIndex}.avatar`, e.target.value)}
                      className="w-full h-full bg-transparent border-2 border-dashed border-gray-300 focus:outline-none p-2"
                    />
                  ) : (
                    <img
                      src={data.testimonials[currentIndex].avatar}
                      alt={data.testimonials[currentIndex].author}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="text-center md:text-left">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={data.testimonials[currentIndex].author}
                        onChange={(e) => onEdit?.(`testimonials.${currentIndex}.author`, e.target.value)}
                        className="font-bold text-gray-900 mb-1 w-full bg-transparent border-b focus:outline-none"
                      />
                      <input
                        type="text"
                        value={data.testimonials[currentIndex].position}
                        onChange={(e) => onEdit?.(`testimonials.${currentIndex}.position`, e.target.value)}
                        className="text-sm text-gray-600 w-full bg-transparent border-b focus:outline-none"
                      />
                    </>
                  ) : (
                    <>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {data.testimonials[currentIndex].author}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {data.testimonials[currentIndex].position}
                        {data.testimonials[currentIndex].company && (
                          <>, {data.testimonials[currentIndex].company}</>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900"
          >
            ←
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900"
          >
            →
          </button>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {data.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;
