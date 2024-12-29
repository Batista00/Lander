import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AIChat } from '@/components/ai/AIChat';
import { AIComponent } from '@/types/landing';
import { aiLandingService } from '@/services/ai-landing-service';
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface SectionProps {
  component: AIComponent;
  onUpdate: (updatedComponent: AIComponent) => void;
  remainingTokens: number;
  className?: string;
  children: React.ReactNode;
}

const TOKEN_COST_PER_MESSAGE = 10;

export function Section({
  component,
  onUpdate,
  remainingTokens,
  className,
  children
}: SectionProps) {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (remainingTokens < TOKEN_COST_PER_MESSAGE) {
      toast.error('No tienes suficientes tokens');
      return;
    }

    try {
      setIsLoading(true);
      // Agregar mensaje del usuario
      setMessages(prev => [...prev, { role: 'user', content }]);

      // Mejorar el componente con IA
      const improvedComponent = await aiLandingService.improveComponent(component, content);
      
      // Agregar respuesta de la IA
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'He mejorado la sección según tus instrucciones. ¿Qué te parece?'
      }]);

      // Actualizar el componente
      onUpdate(improvedComponent);

    } catch (error) {
      console.error('Error improving component:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, hubo un error al mejorar la sección. Por favor intenta de nuevo.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("relative group", className)}>
      {/* Botón de chat */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "absolute top-4 right-4 transition-opacity",
          showChat ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        onClick={() => setShowChat(!showChat)}
      >
        <MessageSquare className="h-4 w-4" />
      </Button>

      {/* Contenido de la sección */}
      {children}

      {/* Chat de IA */}
      {showChat && (
        <div className="absolute top-16 right-4 w-[400px] z-50">
          <AIChat
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            tokenCost={TOKEN_COST_PER_MESSAGE}
            remainingTokens={remainingTokens}
          />
        </div>
      )}
    </div>
  );
}
