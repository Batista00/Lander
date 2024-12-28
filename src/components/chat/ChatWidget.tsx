import React, { useState, useRef, useEffect } from 'react';
import { chatbotService } from '@/features/chat/services/ChatbotService';
import { ChatMessage } from '@/features/chat/types';
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot } from 'lucide-react';
import { toast } from 'sonner';

interface ChatWidgetProps {
  pageContext?: string;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ pageContext = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (pageContext) {
      chatbotService.setPageContext(pageContext);
    }
  }, [pageContext]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
      if (messages.length === 0) {
        setMessages([
          {
            role: 'assistant',
            content: '👋 ¡Hola! Soy el asistente virtual de Lander. Estoy aquí para ayudarte a crear landing pages increíbles. ¿En qué puedo ayudarte hoy?'
          }
        ]);
      }
    } else {
      setIsMinimized(!isMinimized);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await chatbotService.sendMessage(userMessage.content);
      
      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      toast.error(error.message || 'Error al procesar el mensaje');
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, ha ocurrido un error. Por favor, intenta de nuevo.'
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <button
        onClick={handleToggleChat}
        className="bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
      >
        {isOpen ? (
          isMinimized ? <Maximize2 size={24} /> : <Minimize2 size={24} />
        ) : (
          <MessageCircle size={24} />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={`absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl transition-all duration-300 ${isMinimized ? 'h-0 overflow-hidden' : ''}`}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bot className="text-white" size={24} />
              <span className="text-white font-medium">Asistente Lander</span>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.role === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  } max-w-[80%]`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-4">
                <div className="inline-block p-3 rounded-lg bg-white border border-gray-200">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#00E5B0] text-gray-800"
                rows={1}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-[#FF1F8C] to-[#00E5B0] text-white p-2 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
