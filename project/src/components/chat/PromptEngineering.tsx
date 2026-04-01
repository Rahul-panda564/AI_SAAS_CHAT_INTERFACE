import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Save, 
  Copy, 
  Check, 
  Variable, 
  Zap, 
  History,
  ChevronDown,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';

interface PromptVariable {
  id: string;
  name: string;
  value: string;
}

interface PromptTemplate {
  id: string;
  name: string;
  content: string;
  tokens: number;
  category: string;
}

const defaultTemplates: PromptTemplate[] = [
  {
    id: '1',
    name: 'Data Analyst',
    content: 'You are a senior data analyst. Always respond with JSON. Never guess. If data is insufficient, ask for clarification.',
    tokens: 42,
    category: 'System',
  },
  {
    id: '2',
    name: 'Code Reviewer',
    content: 'You are an expert code reviewer. Analyze the code for bugs, performance issues, and best practices. Provide specific line-by-line feedback.',
    tokens: 38,
    category: 'Development',
  },
  {
    id: '3',
    name: 'Creative Writer',
    content: 'You are a creative writing assistant. Help brainstorm ideas, refine prose, and provide constructive feedback on writing style.',
    tokens: 35,
    category: 'Creative',
  },
];

export function PromptEngineering() {
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate>(defaultTemplates[0]);
  const [content, setContent] = useState(defaultTemplates[0].content);
  const [variables, setVariables] = useState<PromptVariable[]>([
    { id: '1', name: 'user_name', value: 'Alex' },
    { id: '2', name: 'project', value: 'Q3-Launch' },
  ]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addVariable = () => {
    const newVar: PromptVariable = {
      id: Date.now().toString(),
      name: `var_${variables.length + 1}`,
      value: '',
    };
    setVariables([...variables, newVar]);
  };

  const updateVariable = (id: string, field: 'name' | 'value', value: string) => {
    setVariables(variables.map(v => v.id === id ? { ...v, [field]: value } : v));
  };

  const removeVariable = (id: string) => {
    setVariables(variables.filter(v => v.id !== id));
  };

  const selectTemplate = (template: PromptTemplate) => {
    setSelectedTemplate(template);
    setContent(template.content);
    setShowTemplates(false);
  };

  const tokenCount = content.split(/\s+/).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <FileText className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-nexus-text-primary">Prompt Editor</h3>
            <p className="text-xs text-nexus-text-secondary">System prompt configuration</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.08] text-xs text-nexus-text-secondary transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexus-accent/20 hover:bg-nexus-accent/30 border border-nexus-accent/30 text-xs text-nexus-accent transition-all"
          >
            {saved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Templates */}
        <div className="w-48 border-r border-white/[0.08] flex flex-col">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="flex items-center justify-between px-3 py-2 text-xs text-nexus-text-secondary hover:text-nexus-text-primary transition-colors"
          >
            <span className="flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              Templates
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showTemplates ? 'rotate-180' : ''}`} />
          </button>
          
          <AnimatePresence>
            {showTemplates && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-2 pb-2 space-y-1">
                  {defaultTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => selectTemplate(template)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                        selectedTemplate.id === template.id
                          ? 'bg-nexus-accent/20 text-nexus-accent'
                          : 'text-nexus-text-secondary hover:bg-white/5 hover:text-nexus-text-primary'
                      }`}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-[10px] opacity-60">{template.category}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Variables Section */}
          <div className="flex-1 border-t border-white/[0.08] p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs text-nexus-text-secondary">
                <Variable className="w-3.5 h-3.5" />
                Variables
              </span>
              <button
                onClick={addVariable}
                className="p-1 rounded hover:bg-white/10 transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-nexus-text-secondary" />
              </button>
            </div>
            
            <div className="space-y-2">
              {variables.map((variable) => (
                <motion.div
                  key={variable.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <div className="flex items-center gap-1">
                    <span className="text-cyan-400 text-xs">{'{{'}</span>
                    <input
                      type="text"
                      value={variable.name}
                      onChange={(e) => updateVariable(variable.id, 'name', e.target.value)}
                      className="flex-1 bg-transparent text-xs text-nexus-text-primary focus:outline-none min-w-0"
                      placeholder="name"
                    />
                    <span className="text-cyan-400 text-xs">{'}}'}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <input
                      type="text"
                      value={variable.value}
                      onChange={(e) => updateVariable(variable.id, 'value', e.target.value)}
                      className="flex-1 bg-white/5 rounded px-2 py-1 text-xs text-nexus-text-secondary focus:outline-none focus:ring-1 focus:ring-nexus-accent/30"
                      placeholder="value"
                    />
                    <button
                      onClick={() => removeVariable(variable.id)}
                      className="p-1 rounded hover:bg-red-500/20 text-nexus-text-secondary hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-full bg-transparent text-sm text-nexus-text-primary resize-none focus:outline-none leading-relaxed"
              placeholder="Enter your system prompt here..."
              spellCheck={false}
            />
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/[0.08]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-nexus-text-secondary">
                <Zap className="w-3.5 h-3.5" />
                Tokens: <span className="text-nexus-accent font-mono">{tokenCount}</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs text-nexus-text-secondary">
                <Sparkles className="w-3.5 h-3.5" />
                Model: <span className="text-nexus-text-primary">gpt-4</span>
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-nexus-text-secondary">
                Last edited: <span className="text-nexus-text-primary">Just now</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
