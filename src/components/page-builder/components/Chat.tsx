import React from 'react';
import { cn } from '@/lib/utils';
import { Component } from '@/types/landing';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, Paperclip, X, Maximize2, Minimize2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface ChatProps {
  component: Component;
  mode?: 'preview' | 'published' | 'edit';
}

export const Chat: React.FC<ChatProps> = ({
  component,
  mode = 'preview'
}) => {
  const {
    title = 'Chat en Vivo',
    description = 'Estamos aquí para ayudarte',
    agent = {
      name: 'Soporte',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=support',
      status: 'online'
    },
    welcomeMessage = '¡Hola! ¿En qué puedo ayudarte hoy?',
    placeholder = 'Escribe tu mensaje...',
    position = 'right', // 'right' | 'left'
    theme = 'modern', // 'modern' | 'minimal' | 'classic'
    autoOpen = false,
    showTimestamp = true
  } = component.content;

  const [isOpen, setIsOpen] = React.useState(autoOpen);
  const [messages, setMessages] = React.useState([
    {
      id: '1',
      type: 'agent',
      text: welcomeMessage,
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isExpanded, setIsExpanded] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user',
      text: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');

    // Simular respuesta del agente
    setTimeout(() => {
      const agentResponse = {
        id: (Date.now() + 1).toString(),
        type: 'agent',
        text: '¡Gracias por tu mensaje! Un agente te responderá pronto.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1000);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderMessage = (message: any) => (
    <motion.div
      key={message.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        'flex gap-3 mb-4',
        message.type === 'user' && 'flex-row-reverse'
      )}
    >
      <Avatar className="w-8 h-8">
        <AvatarImage
          src={message.type === 'agent' ? agent.avatar : undefined}
          alt={message.type === 'agent' ? agent.name : 'You'}
        />
        <AvatarFallback>
          {message.type === 'agent' ? agent.name[0] : 'Y'}
        </AvatarFallback>
      </Avatar>

      <div
        className={cn(
          'max-w-[80%]',
          message.type === 'user' ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-2',
            message.type === 'agent'
              ? 'bg-muted text-foreground'
              : 'bg-primary text-primary-foreground',
            theme === 'modern' && 'shadow-sm'
          )}
        >
          <p className="text-sm">{message.text}</p>
        </div>
        {showTimestamp && (
          <span className="text-xs text-muted-foreground mt-1">
            {formatTimestamp(message.timestamp)}
          </span>
        )}
      </div>
    </motion.div>
  );

  return (
    <div
      className={cn(
        'fixed bottom-4 z-50',
        position === 'right' ? 'right-4' : 'left-4',
        component.styles?.spacing
      )}
      style={{
        color: component.styles?.colors?.text
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={cn(
              'bg-background rounded-2xl overflow-hidden',
              'border border-border',
              theme === 'modern' && 'shadow-2xl',
              isExpanded ? 'w-[500px] h-[600px]' : 'w-[380px] h-[500px]'
            )}
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                  <AvatarFallback>{agent.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{agent.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-muted-foreground">
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-[calc(100%-8rem)] overflow-y-auto">
              <AnimatePresence>
                {messages.map(renderMessage)}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t bg-muted/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-end gap-2"
              >
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                  className="min-h-[2.5rem] max-h-32"
                  rows={1}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button
                    type="submit"
                    size="icon"
                    className="shrink-0"
                    disabled={!inputValue.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-lg"
            onClick={() => setIsOpen(true)}
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};
