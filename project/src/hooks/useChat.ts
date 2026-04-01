import { useState, useCallback, useRef } from 'react';
import type { Message, Conversation } from '@/types';

const generateId = () => Math.random().toString(36).substring(2, 9);

const createMessage = (role: 'user' | 'assistant', content: string): Message => ({
  id: generateId(),
  role,
  content,
  timestamp: new Date(),
  isStreaming: false,
});

// Simulated AI responses for demo
const simulatedResponses = [
  "I've analyzed your request and found some interesting patterns in the data. Here are the key insights:",
  "Done! I've processed that for you. The results show a 23% improvement compared to last month.",
  "I've connected to the API and retrieved the latest information. Here's what I found:",
  "Based on your requirements, I recommend the following approach:",
];

const simulatedCodeResponses = [
  `\`\`\`typescript
const analyzeData = async (dataset: DataPoint[]) => {
  const results = await Promise.all(
    dataset.map(async (point) => {
      const analysis = await model.process(point);
      return { ...point, score: analysis.confidence };
    })
  );
  return results.filter(r => r.score > 0.8);
};
\`\`\``,
];

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const streamingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const createConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: generateId(),
      title: 'New Conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations((prev) => [newConversation, ...prev]);
    setCurrentConversation(newConversation);
    return newConversation;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!currentConversation) {
      createConversation();
    }

    const userMessage = createMessage('user', content);
    
    setCurrentConversation((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        messages: [...prev.messages, userMessage],
        updatedAt: new Date(),
      };
      return updated;
    });

    // Simulate streaming response
    setIsStreaming(true);
    const aiMessageId = generateId();
    const isCodeResponse = content.toLowerCase().includes('code') || content.toLowerCase().includes('function');
    const responseText = isCodeResponse 
      ? simulatedCodeResponses[0] 
      : simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
    
    let currentText = '';
    const words = responseText.split(' ');
    let wordIndex = 0;

    // Add empty AI message first
    setCurrentConversation((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        messages: [...prev.messages, { ...createMessage('assistant', ''), id: aiMessageId, isStreaming: true }],
      };
    });

    // Stream words
    streamingRef.current = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        wordIndex++;
        
        setCurrentConversation((prev) => {
          if (!prev) return null;
          const messages = [...prev.messages];
          const lastMessage = messages[messages.length - 1];
          if (lastMessage.id === aiMessageId) {
            messages[messages.length - 1] = { ...lastMessage, content: currentText };
          }
          return { ...prev, messages };
        });
      } else {
        // Done streaming
        if (streamingRef.current) {
          clearInterval(streamingRef.current);
          streamingRef.current = null;
        }
        setIsStreaming(false);
        setCurrentConversation((prev) => {
          if (!prev) return null;
          const messages = [...prev.messages];
          const lastMessage = messages[messages.length - 1];
          if (lastMessage.id === aiMessageId) {
            messages[messages.length - 1] = { ...lastMessage, isStreaming: false };
          }
          return { ...prev, messages };
        });
      }
    }, 80); // Speed of streaming

    return aiMessageId;
  }, [currentConversation, createConversation]);

  const stopStreaming = useCallback(() => {
    if (streamingRef.current) {
      clearInterval(streamingRef.current);
      streamingRef.current = null;
    }
    setIsStreaming(false);
    setCurrentConversation((prev) => {
      if (!prev) return null;
      const messages = [...prev.messages];
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.isStreaming) {
        messages[messages.length - 1] = { ...lastMessage, isStreaming: false };
      }
      return { ...prev, messages };
    });
  }, []);

  const selectConversation = useCallback((id: string) => {
    const conversation = conversations.find((c) => c.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  }, [conversations]);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (currentConversation?.id === id) {
      setCurrentConversation(null);
    }
  }, [currentConversation]);

  return {
    conversations,
    currentConversation,
    isStreaming,
    createConversation,
    sendMessage,
    stopStreaming,
    selectConversation,
    deleteConversation,
  };
}
