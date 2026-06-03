import { useCallback, useState } from 'react';
import { apiFetch } from '../api/client';
import { useAppContext } from '../context/AppContext';
import type { ChatApiResponse, ChatMessage, Settings } from '../types';
import { uid } from '../utils/format';

interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (question: string, settings: Settings) => Promise<void>;
  clearChat: () => void;
}

export function useChat(): UseChatReturn {
  const { messages, addMessages, clearMessages } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (question: string, settings: Settings) => {
      if (!question.trim() || isLoading) return;

      const userMsg: ChatMessage = {
        id: uid(),
        role: 'user',
        content: question.trim(),
      };
      addMessages([userMsg]);
      setIsLoading(true);
      setError(null);

      try {
        const data = await apiFetch<ChatApiResponse>('/api/v1/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question.trim(),
            top_k: settings.top_k,
            temperature: settings.temperature,
          }),
        });

        const assistantMsg: ChatMessage = {
          id: uid(),
          role: 'assistant',
          content: data.answer,
          citations: data.citations,
          model: data.model,
        };
        addMessages([assistantMsg]);
      } catch (e) {
        const msg = (e as Error).message;
        setError(msg);
        addMessages([
          {
            id: uid(),
            role: 'assistant',
            content: `Failed to get a response: ${msg}`,
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [addMessages, isLoading],
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat: clearMessages,
  };
}
