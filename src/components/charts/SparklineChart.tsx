import React from 'react';

interface SparklineChartProps {
  data: number[];
  color: string;
}

export function SparklineChart({ data, color }: SparklineChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  // Normalizar los datos entre 0 y 1
  const normalizedData = data.map(value => (value - min) / range);
  
  // Calcular los puntos del SVG
  const points = normalizedData.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - (value * 80); // Usar 80 en lugar de 100 para dar un poco de margen
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {/* Área bajo la línea */}
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={`var(--${color}-500)`} stopOpacity="0.2" />
          <stop offset="100%" stopColor={`var(--${color}-500)`} stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Área sombreada */}
      <path
        d={`M0,100 L0,${100 - normalizedData[0] * 80} ${normalizedData.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - (value * 80);
          return `L${x},${y}`;
        }).join(' ')} L100,100 Z`}
        fill={`url(#gradient-${color})`}
      />
      
      {/* Línea principal */}
      <polyline
        points={points}
        fill="none"
        stroke={`var(--${color}-500)`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Punto final */}
      <circle
        cx={(data.length - 1) * (100 / (data.length - 1))}
        cy={100 - (normalizedData[normalizedData.length - 1] * 80)}
        r="2"
        fill={`var(--${color}-500)`}
      />
    </svg>
  );
}
