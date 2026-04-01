import { useState, useRef, useEffect } from 'react';
import { Send, Square, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Message } from '@/types';

interface ChatInterfaceProps {
  messages?: Message[];
  onSendMessage?: (message: string) => void;
  isStreaming?: boolean;
  onStopStreaming?: () => void;
  className?: string;
  showHeader?: boolean;
}

const defaultMessages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Analyze the last 30 days of revenue.',
    timestamp: new Date(),
  },
  {
    id: '2',
    role: 'assistant',
    content: "Done. I've pulled the data and flagged two anomalies in the weekly reports.",
    timestamp: new Date(),
  },
  {
    id: '3',
    role: 'user',
    content: 'Export a summary to Slack.',
    timestamp: new Date(),
  },
  {
    id: '4',
    role: 'assistant',
    content: 'Sent to #analytics channel. 📊',
    timestamp: new Date(),
  },
];

function MessageBubble({ message, index }: { message: Message; index: number }) {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-nexus-accent to-purple-600' 
          : 'bg-white/10'
      }`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-nexus-accent" />}
      </div>
      
      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-4 py-3 rounded-2xl ${
          isUser 
            ? 'bg-gradient-to-br from-nexus-accent to-purple-600 text-white rounded-br-sm' 
            : 'bg-white/5 border border-white/[0.08] text-nexus-text-primary rounded-bl-sm'
        }`}>
          <p className="text-sm leading-relaxed">{message.content}</p>
          {message.isStreaming && (
            <span className="inline-block w-2 h-4 ml-1 bg-nexus-accent animate-pulse" />
          )}
        </div>
        <span className="text-xs text-nexus-text-secondary mt-1 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

function StreamingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
        <Sparkles className="w-4 h-4 text-nexus-accent animate-pulse" />
      </div>
      <div className="bg-white/5 border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1">
          <motion.span 
            className="w-2 h-2 rounded-full bg-nexus-accent"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
          />
          <motion.span 
            className="w-2 h-2 rounded-full bg-nexus-accent"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
          />
          <motion.span 
            className="w-2 h-2 rounded-full bg-nexus-accent"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export function ChatInterface({
  messages = defaultMessages,
  onSendMessage,
  isStreaming = false,
  onStopStreaming,
  className = '',
  showHeader = true,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSend = () => {
    if (inputValue.trim() && !isStreaming) {
      onSendMessage?.(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      {showHeader && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-nexus-accent/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-nexus-accent" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-nexus-text-primary">Agent Chat</h3>
              <p className="text-xs text-nexus-text-secondary">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-nexus-text-secondary">Live</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <MessageBubble key={message.id} message={message} index={index} />
          ))}
          {isStreaming && <StreamingIndicator />}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/[0.08]">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={isStreaming}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/[0.08] text-nexus-text-primary text-sm placeholder:text-nexus-text-secondary/50 focus:outline-none focus:border-nexus-accent/50 focus:ring-1 focus:ring-nexus-accent/30 transition-all disabled:opacity-50"
            />
          </div>
          {isStreaming ? (
            <button
              onClick={onStopStreaming}
              className="px-4 py-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-all"
            >
              <Square className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="px-4 py-3 rounded-xl bg-nexus-accent text-white hover:bg-nexus-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-xs text-nexus-text-secondary/50 mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
