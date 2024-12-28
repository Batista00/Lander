import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface Stat {
  icon: string;
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface ModernStatsProps {
  data: {
    stats: Stat[];
    background?: 'light' | 'dark';
  };
  onEdit?: (field: string, value: any) => void;
  isEditing?: boolean;
}

const ModernStats = ({ data, onEdit, isEditing }: ModernStatsProps) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const bgClass = data.background === 'dark' 
    ? 'bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white' 
    : 'bg-white text-gray-900';

  return (
    <section className={`py-20 ${bgClass}`} ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {data.stats.map((stat, index) => (
            <div
              key={index}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="w-16 h-16 mx-auto mb-4 bg-blue-500 rounded-2xl flex items-center justify-center text-white relative overflow-hidden group"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {isEditing ? (
                  <input
                    type="text"
                    value={stat.icon}
                    onChange={(e) => onEdit?.(`stats.${index}.icon`, e.target.value)}
                    className="relative z-10 w-full text-center bg-transparent focus:outline-none"
                  />
                ) : (
                  <i className={`${stat.icon} text-2xl relative z-10`} />
                )}
              </motion.div>

              <div className="relative">
                {inView && (
                  <h3 className="text-4xl font-bold mb-2">
                    {isEditing ? (
                      <input
                        type="number"
                        value={stat.value}
                        onChange={(e) => onEdit?.(`stats.${index}.value`, parseInt(e.target.value))}
                        className="w-full text-center bg-transparent focus:outline-none"
                      />
                    ) : (
                      <CountUp
                        start={0}
                        end={stat.value}
                        duration={2.5}
                        separator=","
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    )}
                  </h3>
                )}

                {isEditing ? (
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => onEdit?.(`stats.${index}.label`, e.target.value)}
                    className="text-sm text-gray-500 w-full text-center bg-transparent focus:outline-none"
                  />
                ) : (
                  <p className={`text-sm ${data.background === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>
                    {stat.label}
                  </p>
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ModernStats;
