import { useEffect, useRef } from 'react';
import { Bot, Trash2 } from 'lucide-react';
import { MessageBubble } from '../components/chat/MessageBubble';
import { TypingIndicator } from '../components/chat/TypingIndicator';
import { ChatInput } from '../components/chat/ChatInput';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';
import { useChat } from '../hooks/useChat';
import { useDocuments } from '../hooks/useDocuments';
import { useSettings } from '../context/SettingsContext';

export function ChatPage() {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const { documents } = useDocuments();
  const { settings } = useSettings();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const hasDocuments = documents.length > 0;

  function handleSend(question: string) {
    sendMessage(question, settings);
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Toolbar */}
      {messages.length > 0 && (
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-gray-200 dark:border-white/[0.06] bg-white/50 dark:bg-transparent backdrop-blur-sm">
          <p className="text-xs text-gray-500 dark:text-zinc-500">
            {messages.filter(m => m.role === 'user').length} question{messages.filter(m => m.role === 'user').length !== 1 ? 's' : ''} asked
          </p>
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Trash2 size={13} />}
            onClick={clearChat}
          >
            Clear chat
          </Button>
        </div>
      )}

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-0 py-6 space-y-6">
          {messages.length === 0 ? (
            <EmptyState
              icon={<Bot size={32} />}
              title="Ask anything about your documents"
              description={
                !hasDocuments
                  ? 'Upload a PDF first, then return here to ask questions.'
                  : `${documents.length} document${documents.length !== 1 ? 's' : ''} ready to query.`
              }
            />
          ) : (
            messages.map(msg => <MessageBubble key={msg.id} message={msg} />)
          )}
          {isLoading && <TypingIndicator />}
          <div ref={endRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-white/[0.06] bg-gray-50 dark:bg-[#0c0c14] px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            onSend={handleSend}
            isLoading={isLoading}
            disabled={!hasDocuments}
          />
          <div className="hidden md:flex items-center justify-between mt-2 px-1">
            <p className="text-xs text-gray-400 dark:text-zinc-700">
              Enter to send · Shift+Enter for new line
            </p>
            <p className="text-xs text-gray-400 dark:text-zinc-600">
              top_k: <span className="text-violet-600 dark:text-violet-400 font-medium">{settings.top_k}</span>
              {' · '}
              temp: <span className="text-violet-600 dark:text-violet-400 font-medium">{settings.temperature}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
