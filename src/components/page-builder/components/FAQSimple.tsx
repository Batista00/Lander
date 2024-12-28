import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSimpleProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const FAQSimple: React.FC<FAQSimpleProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Preguntas Frecuentes',
    description = 'Encuentra respuestas a las preguntas más comunes',
    faqs = [
      {
        question: '¿Qué servicios ofrecen?',
        answer: 'Ofrecemos una amplia gama de servicios incluyendo...'
      },
      {
        question: '¿Cuáles son sus horarios de atención?',
        answer: 'Nuestro horario de atención es...'
      },
      {
        question: '¿Cómo puedo contactarlos?',
        answer: 'Puedes contactarnos a través de...'
      },
      {
        question: '¿Cuál es su política de devoluciones?',
        answer: 'Nuestra política de devoluciones establece que...'
      },
      {
        question: '¿Realizan envíos internacionales?',
        answer: 'Sí, realizamos envíos internacionales a...'
      }
    ],
    layout = 'single-column' // 'single-column' | 'two-columns'
  } = component.content;

  return (
    <div
      className={cn(
        'w-full py-16',
        component.styles?.spacing
      )}
      style={{
        backgroundColor: component.styles?.colors?.background,
        color: component.styles?.colors?.text
      }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
        </div>

        <div className={cn(
          'max-w-4xl mx-auto',
          layout === 'two-columns' && 'grid grid-cols-1 md:grid-cols-2 gap-8'
        )}>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="prose prose-sm max-w-none">
                    {faq.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
