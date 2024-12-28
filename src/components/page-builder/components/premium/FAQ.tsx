import { Component } from "@/types/landing";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface FAQProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = ({ component, onEdit }: FAQProps) => {
  const content = component.content as {
    title: string;
    subtitle: string;
    description: string;
    categories: Array<{
      name: string;
      questions: FAQItem[];
    }>;
    cta?: {
      text: string;
      link: string;
    };
  };

  return (
    <section className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {content.subtitle}
          </p>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            {content.description}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          {content.categories.map((category, index) => (
            <div key={category.name} className={index > 0 ? "mt-10" : ""}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {category.name}
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((item, qIndex) => (
                  <AccordionItem key={qIndex} value={`item-${index}-${qIndex}`}>
                    <AccordionTrigger className="text-left">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>

        {content.cta && (
          <div className="mt-16 flex justify-center">
            <Button
              onClick={() => window.open(content.cta?.link, "_blank")}
              className="group"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {content.cta.text}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

export default FAQ;

export const defaultFAQContent = {
  title: "Centro de Ayuda",
  subtitle: "Respuestas a Tus Preguntas",
  description:
    "Todo lo que necesitas saber sobre nuestras soluciones digitales y cómo pueden impulsar tu negocio.",
  categories: [
    {
      name: "Soluciones Digitales",
      questions: [
        {
          question: "¿Cómo puede ayudar la transformación digital a mi negocio?",
          answer:
            "La transformación digital puede aumentar la eficiencia operativa hasta un 40%, mejorar la experiencia del cliente y abrir nuevos canales de ingresos. Nuestras soluciones se adaptan a tus necesidades específicas, permitiéndote competir efectivamente en el mercado digital.",
        },
        {
          question: "¿Qué tecnologías utilizan en sus soluciones?",
          answer:
            "Implementamos las últimas tecnologías como React, Node.js, y servicios cloud de AWS/Google Cloud. Nuestras soluciones incluyen IA para personalización, análisis avanzado de datos y optimización continua del rendimiento.",
        },
        {
          question: "¿Cuánto tiempo toma implementar una solución completa?",
          answer:
            "El tiempo de implementación varía según la complejidad del proyecto. Típicamente, una solución básica puede estar lista en 2-4 semanas, mientras que proyectos más complejos pueden tomar 2-3 meses. Trabajamos ágilmente para asegurar resultados rápidos y de calidad.",
        },
      ],
    },
    {
      name: "Servicios & Soporte",
      questions: [
        {
          question: "¿Qué incluye el soporte técnico?",
          answer:
            "Nuestro soporte premium 24/7 incluye monitoreo proactivo, resolución prioritaria de incidentes, actualizaciones de seguridad automáticas y consultoría técnica dedicada. Garantizamos un tiempo de respuesta máximo de 1 hora para incidentes críticos.",
        },
        {
          question: "¿Ofrecen capacitación para el equipo?",
          answer:
            "Sí, proporcionamos capacitación completa para tu equipo. Incluye sesiones en vivo, documentación detallada, mejores prácticas y acceso a nuestra plataforma de aprendizaje en línea. También ofrecemos workshops mensuales sobre nuevas funcionalidades.",
        },
        {
          question: "¿Cómo garantizan la seguridad de los datos?",
          answer:
            "Implementamos múltiples capas de seguridad: encriptación de datos en reposo y en tránsito, autenticación de dos factores, monitoreo de seguridad 24/7, y cumplimiento con estándares como GDPR y PCI DSS. Realizamos auditorías de seguridad trimestrales.",
        },
      ],
    },
  ],
  cta: {
    text: "¿Necesitas más información? Agenda una consulta gratuita",
    link: "/contacto",
  },
};
