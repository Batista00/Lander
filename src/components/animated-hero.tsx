import { motion } from 'framer-motion';

export function AnimatedHero() {
  const circles = Array.from({ length: 15 }, (_, i) => ({
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: i * 0.2,
  }));

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-3xl">
      {/* Fondo con gradiente animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#FF1493]/20 via-[#4169E1]/30 to-[#00FFFF]/20"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      {/* Círculos animados */}
      {circles.map((circle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-r from-[#00FFF0] to-[#00FF95] opacity-20"
          style={{
            width: circle.size,
            height: circle.size,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 4,
            delay: circle.delay,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}

      {/* Mockup */}
      <div className="absolute inset-10 bg-[#1E293B]/80 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl">
        {/* Barra de título */}
        <div className="h-8 bg-[#0F172A] rounded-t-xl flex items-center px-4 gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        
        {/* Contenido del mockup */}
        <div className="p-6">
          {/* Gráfico de barras estático */}
          <div className="flex items-end gap-2 h-40">
            {[60, 80, 40, 90, 50, 70].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-[#00FFF0] to-[#00FF95] rounded-t"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
