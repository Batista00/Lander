import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ContactInfo {
  icon: string;
  label: string;
  value: string;
  link?: string;
}

interface ModernContactProps {
  data: {
    title: string;
    subtitle: string;
    contactInfo: ContactInfo[];
    formTitle: string;
    formSubtitle: string;
    submitButtonText: string;
    successMessage: string;
  };
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

export const ModernContact: React.FC<ModernContactProps> = ({ data, onEdit, isEditing }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({
      name: '',
      email: '',
      subject: '',
      message: '',
    });

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {data.contactInfo.map((info, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-500 text-white flex items-center justify-center flex-shrink-0">
                  <i className={info.icon} />
                </div>
                <div>
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={info.label}
                        onChange={(e) => onEdit?.(`contactInfo.${index}.label`, e.target.value)}
                        className="font-medium text-gray-900 mb-1 w-full bg-transparent border-b focus:outline-none"
                      />
                      <input
                        type="text"
                        value={info.value}
                        onChange={(e) => onEdit?.(`contactInfo.${index}.value`, e.target.value)}
                        className="text-gray-600 w-full bg-transparent border-b focus:outline-none"
                      />
                    </>
                  ) : (
                    <>
                      <h3 className="font-medium text-gray-900 mb-1">{info.label}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.value}</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={data.formTitle}
                  onChange={(e) => onEdit?.('formTitle', e.target.value)}
                  className="text-2xl font-bold mb-2 w-full bg-transparent border-b focus:outline-none"
                />
                <textarea
                  value={data.formSubtitle}
                  onChange={(e) => onEdit?.('formSubtitle', e.target.value)}
                  className="text-gray-600 mb-8 w-full bg-transparent border-b focus:outline-none"
                  rows={2}
                />
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">{data.formTitle}</h3>
                <p className="text-gray-600 mb-8">{data.formSubtitle}</p>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    placeholder="Nombre"
                  />
                </div>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="relative">
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  placeholder="Asunto"
                />
              </div>
              <div className="relative">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                  placeholder="Mensaje"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-8 rounded-lg text-white font-medium transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  data.submitButtonText
                )}
              </button>
            </form>

            {/* Success message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute inset-x-0 bottom-0 mb-4 px-4"
                >
                  <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg text-center">
                    {data.successMessage}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ModernContact;
