export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  isActive: boolean;
}

export interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  tokens: number;
  category: string;
}

export interface Integration {
  id: string;
  name: string;
  icon: string;
  isConnected: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  cta: string;
}

export interface Capability {
  id: string;
  title: string;
  description: string;
  icon: string;
}
