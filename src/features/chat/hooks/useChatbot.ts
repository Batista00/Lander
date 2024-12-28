import { useState, useEffect } from 'react';
import { ChatbotConfig, Message, ChatbotStatus } from '../types';
import { useFirestore } from '@/hooks/useFirestore';
import { useAuth } from '@/contexts/AuthContext';

export const useChatbot = (chatbotId: string) => {
  const [config, setConfig] = useState<ChatbotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { db } = useFirestore();
  const { user } = useAuth();

  useEffect(() => {
    const loadChatbot = async () => {
      try {
        const docRef = db.collection('chatbots').doc(chatbotId);
        const doc = await docRef.get();

        if (doc.exists) {
          setConfig(doc.data() as ChatbotConfig);
        } else {
          setError('Chatbot no encontrado');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadChatbot();
  }, [chatbotId]);

  const updateStatus = async (status: ChatbotStatus) => {
    if (!config) return;

    try {
      await db.collection('chatbots').doc(chatbotId).update({
        status
      });
      setConfig({ ...config, status });
    } catch (err) {
      setError(err.message);
    }
  };

  const saveMessage = async (message: Message) => {
    if (!config || !user) return;

    try {
      await db.collection('conversations').add({
        chatbotId,
        userId: user.uid,
        message,
        timestamp: new Date()
      });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  };

  const updateConfig = async (updates: Partial<ChatbotConfig>) => {
    if (!config) return;

    try {
      await db.collection('chatbots').doc(chatbotId).update(updates);
      setConfig({ ...config, ...updates });
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    config,
    loading,
    error,
    updateStatus,
    saveMessage,
    updateConfig
  };
};
