import { Component } from "@/types/landing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";

interface NewsletterProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

const Newsletter = ({ component, onEdit }: NewsletterProps) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const content = component.content as {
    title: string;
    subtitle: string;
    description: string;
    image?: string;
    features?: string[];
    placeholder: string;
    buttonText: string;
    successMessage: string;
    style: "simple" | "withImage" | "withFeatures";
    backgroundColor?: string;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para suscribir al usuario
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section
      className={`py-16 sm:py-24 ${
        content.backgroundColor || "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {content.style === "withImage" ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-2">
            <div className="relative">
              <img
                src={content.image}
                alt="Newsletter"
                className="aspect-[4/3] w-full rounded-2xl object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="max-w-xl">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {content.title}
                </h2>
                <p className="mt-4 text-lg text-gray-600">{content.description}</p>
                <form onSubmit={handleSubmit} className="mt-8 flex max-w-md gap-x-4">
                  <Input
                    type="email"
                    required
                    placeholder={content.placeholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="min-w-0 flex-auto"
                  />
                  <Button type="submit">
                    {content.buttonText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        ) : content.style === "withFeatures" ? (
          <div className="relative isolate overflow-hidden">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {content.title}
              </h2>
              <p className="mt-2 text-lg text-gray-600">{content.subtitle}</p>
              <p className="mt-4 text-lg text-gray-600">{content.description}</p>
              <form onSubmit={handleSubmit} className="mt-8 flex max-w-md mx-auto gap-x-4">
                <Input
                  type="email"
                  required
                  placeholder={content.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto"
                />
                <Button type="submit">
                  {content.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              {content.features && (
                <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                  {content.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-x-3">
                      <CheckCircle2 className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          // Simple style
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {content.title}
            </h2>
            <p className="mt-4 text-lg text-gray-600">{content.description}</p>
            <form onSubmit={handleSubmit} className="mt-8 flex max-w-md mx-auto gap-x-4">
              <Input
                type="email"
                required
                placeholder={content.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-w-0 flex-auto"
              />
              <Button type="submit">
                {content.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="mt-4 text-center text-sm text-green-600">
            {content.successMessage}
          </div>
        )}
      </div>
    </section>
  );
}

export default Newsletter;

export const defaultNewsletterContent = {
  title: "Únete a la Revolución Digital",
  subtitle: "Insights Exclusivos",
  description:
    "Recibe estrategias avanzadas, casos de éxito y las últimas tendencias en transformación digital directamente en tu bandeja de entrada.",
  image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop",
  features: [
    "Estrategias de crecimiento digital validadas",
    "Casos de estudio de empresas líderes",
    "Acceso anticipado a nuevas funcionalidades",
    "Invitaciones a eventos exclusivos",
  ],
  placeholder: "tu@email.com",
  buttonText: "Suscribirme",
  successMessage: "¡Genial! Te has suscrito exitosamente. Revisa tu email para confirmar tu suscripción.",
  style: "withFeatures",
  backgroundColor: "bg-gradient-to-br from-purple-50 to-indigo-50",
};
