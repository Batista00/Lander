import { Button } from "@/components/ui/button";

interface HeroCTAProps {
  component: Component;
  onEdit?: (id: string, content: any) => void;
}

const HeroCTA = ({ component, onEdit }: HeroCTAProps) => {
  const content = component.content as {
    title: string;
    subtitle: string;
    description?: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA?: {
      text: string;
      link: string;
    };
    image?: string;
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 to-indigo-600 text-white">
      <div className="absolute inset-0 bg-grid-white/10" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {content.title}
            </h1>
            <p className="mt-4 text-xl text-purple-100">
              {content.subtitle}
            </p>
            {content.description && (
              <p className="mt-6 text-lg leading-8 text-purple-100">
                {content.description}
              </p>
            )}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Primary CTA */}
              <Button
                onClick={() => window.open(content.primaryCTA.link, '_blank')}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all"
              >
                {content.primaryCTA.text}
              </Button>

              {/* Secondary CTA - Optional */}
              {content.secondaryCTA && (
                <Button
                  onClick={() => window.open(content.secondaryCTA?.link, '_blank')}
                  variant="outline"
                  className="px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  {content.secondaryCTA.text}
                </Button>
              )}
            </div>
          </div>
          {content.image && (
            <div className="flex-1">
              <img
                src={content.image}
                alt="Hero"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const defaultHeroCTAContent = {
  title: "Impulsa tu Negocio al Siguiente Nivel",
  subtitle: "La solución todo en uno para hacer crecer tu empresa",
  description: "Obtén todas las herramientas que necesitas para aumentar tus ventas, mejorar la satisfacción del cliente y escalar tu negocio.",
  primaryCTA: {
    text: "Comenzar Ahora",
    link: "#"
  },
  secondaryCTA: {
    text: "Saber Más",
    link: "#"
  },
  image: "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
};

export default HeroCTA;
