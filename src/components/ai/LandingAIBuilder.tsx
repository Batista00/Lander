import React, { useState } from 'react';
import { landingAIService } from '@/features/ai/services/LandingAIService';
import { toast } from 'sonner';

interface LandingAIBuilderProps {
  onApplyDesign: (design: any) => void;
  onApplyContent: (content: any) => void;
}

export const LandingAIBuilder: React.FC<LandingAIBuilderProps> = ({
  onApplyDesign,
  onApplyContent,
}) => {
  const [niche, setNiche] = useState('');
  const [purpose, setPurpose] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('profesional');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateDesign = async () => {
    if (!niche || !purpose) {
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    try {
      const design = await landingAIService.generateDesignSuggestions(niche, purpose);
      const content = await landingAIService.generateContent(niche, targetAudience, tone);
      const css = await landingAIService.generateCustomCSS(design);

      onApplyDesign({ ...design, customCSS: css });
      onApplyContent(content);
      
      toast.success('¡Diseño y contenido generados con éxito!');
    } catch (error) {
      toast.error('Error al generar el diseño');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Constructor AI de Landing Pages</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nicho de Mercado
          </label>
          <input
            type="text"
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            placeholder="ej. Marketing Digital, Fitness, Educación"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Propósito
          </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="ej. Generar leads, Vender producto, Webinar"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Audiencia Objetivo
          </label>
          <input
            type="text"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            placeholder="ej. Emprendedores, Profesionales, Estudiantes"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tono de Comunicación
          </label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="profesional">Profesional</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="amigable">Amigable</option>
            <option value="autoritario">Autoritario</option>
          </select>
        </div>

        <button
          onClick={handleGenerateDesign}
          disabled={isLoading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isLoading
              ? 'bg-gray-400'
              : 'bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] hover:opacity-90'
          }`}
        >
          {isLoading ? (
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
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generando...
            </span>
          ) : (
            'Generar Landing Page'
          )}
        </button>
      </div>
    </div>
  );
};
