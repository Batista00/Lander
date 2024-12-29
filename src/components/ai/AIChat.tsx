import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AIChatProps {
  onSendMessage: (message: string) => Promise<void>;
  messages: Message[];
  isLoading: boolean;
  tokenCost: number;
  remainingTokens: number;
  className?: string;
}

export function AIChat({
  onSendMessage,
  messages,
  isLoading,
  tokenCost,
  remainingTokens,
  className
}: AIChatProps) {
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    await onSendMessage(message);
  };

  return (
    <Card className={cn("flex flex-col h-[400px]", className)}>
      <div className="px-4 py-2 border-b bg-muted/50">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Chat de IA</h3>
          <div className="text-sm text-muted-foreground">
            Costo: {tokenCost} tokens • Disponible: {remainingTokens} tokens
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={cn(
                "flex max-w-[80%] rounded-lg px-4 py-2",
                message.role === 'user'
                  ? "ml-auto bg-primary text-primary-foreground"
                  : "bg-muted"
              )}
            >
              {message.content}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>La IA está pensando...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe cómo quieres mejorar esta sección..."
            className="flex-1 min-h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
