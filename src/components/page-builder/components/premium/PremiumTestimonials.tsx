import { Component } from "@/types/landing";
import { Star } from "lucide-react";

interface TestimonialsProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

const PremiumTestimonials = ({ component, onEdit }: TestimonialsProps) => {
  const content = component.content as {
    title: string;
    subtitle?: string;
    testimonials: Array<{
      content: string;
      author: {
        name: string;
        role: string;
        company: string;
        image: string;
      };
      rating?: number;
    }>;
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {content.subtitle}
            </p>
          )}
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-cols-3">
          {content.testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
            >
              <div className="flex items-center gap-x-4 border-b border-gray-900/5 pb-6">
                <img
                  src={testimonial.author.image}
                  alt={testimonial.author.name}
                  className="h-10 w-10 rounded-full bg-gray-50"
                />
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">
                    {testimonial.author.name}
                  </div>
                  <div className="text-gray-600">
                    {testimonial.author.role} en {testimonial.author.company}
                  </div>
                </div>
              </div>
              {testimonial.rating !== null && testimonial.rating !== undefined && (
                <div className="flex items-center mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              )}
              <blockquote className="mt-6 text-gray-700">
                "{testimonial.content}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PremiumTestimonials;

export const defaultTestimonialsContent = {
  title: "Lo que Dicen Nuestros Clientes",
  subtitle: "Descubre por qué miles de empresas confían en nosotros para hacer crecer sus negocios.",
  testimonials: [
    {
      content: "Esta plataforma ha transformado completamente la manera en que manejamos nuestro negocio. La facilidad de uso y el soporte son excepcionales.",
      author: {
        name: "María González",
        role: "CEO",
        company: "TechStart",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      rating: 5
    },
    {
      content: "Increíble herramienta para escalar nuestras operaciones. El ROI fue evidente desde el primer mes de uso.",
      author: {
        name: "Carlos Ruiz",
        role: "Director de Operaciones",
        company: "GrowthCorp",
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      rating: 5
    },
    {
      content: "El mejor servicio al cliente que he experimentado. El equipo siempre está dispuesto a ayudar y las funcionalidades son exactamente lo que necesitábamos.",
      author: {
        name: "Ana Martínez",
        role: "Fundadora",
        company: "InnovaSoft",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
      },
      rating: 5
    }
  ]
};
