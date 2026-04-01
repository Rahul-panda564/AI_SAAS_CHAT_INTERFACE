import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wrench, 
  Play, 
  Check, 
  X, 
  Terminal,
  Clock,
  Settings,
  Plus,
  Search,
  Ticket,
  Bell,
  Database,
  Globe,
  Code
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  parameters: Parameter[];
  isActive: boolean;
  lastUsed?: string;
}

interface Parameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface ToolExecution {
  id: string;
  toolId: string;
  status: 'running' | 'completed' | 'error';
  input: Record<string, unknown>;
  output?: string;
  duration?: number;
  timestamp: Date;
}

const defaultTools: Tool[] = [
  {
    id: '1',
    name: 'search_docs',
    description: 'Search documentation for relevant information',
    icon: <Search className="w-4 h-4" />,
    parameters: [
      { name: 'query', type: 'string', required: true, description: 'Search query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results' },
    ],
    isActive: true,
    lastUsed: '2 min ago',
  },
  {
    id: '2',
    name: 'create_ticket',
    description: 'Create a support ticket in the system',
    icon: <Ticket className="w-4 h-4" />,
    parameters: [
      { name: 'title', type: 'string', required: true, description: 'Ticket title' },
      { name: 'priority', type: 'string', required: true, description: 'Priority level' },
      { name: 'description', type: 'string', required: false, description: 'Details' },
    ],
    isActive: true,
    lastUsed: '15 min ago',
  },
  {
    id: '3',
    name: 'send_alert',
    description: 'Send alert to specified channel',
    icon: <Bell className="w-4 h-4" />,
    parameters: [
      { name: 'channel', type: 'string', required: true, description: 'Channel name' },
      { name: 'message', type: 'string', required: true, description: 'Alert message' },
    ],
    isActive: false,
  },
  {
    id: '4',
    name: 'query_database',
    description: 'Execute SQL query on connected database',
    icon: <Database className="w-4 h-4" />,
    parameters: [
      { name: 'sql', type: 'string', required: true, description: 'SQL query' },
    ],
    isActive: true,
  },
  {
    id: '5',
    name: 'fetch_api',
    description: 'Make HTTP request to external API',
    icon: <Globe className="w-4 h-4" />,
    parameters: [
      { name: 'url', type: 'string', required: true, description: 'API endpoint' },
      { name: 'method', type: 'string', required: false, description: 'HTTP method' },
    ],
    isActive: false,
  },
  {
    id: '6',
    name: 'run_code',
    description: 'Execute code in sandboxed environment',
    icon: <Code className="w-4 h-4" />,
    parameters: [
      { name: 'code', type: 'string', required: true, description: 'Code to execute' },
      { name: 'language', type: 'string', required: true, description: 'Programming language' },
    ],
    isActive: true,
  },
];

export function ToolCalling() {
  const [tools, setTools] = useState<Tool[]>(defaultTools);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(defaultTools[0]);
  const [executions, setExecutions] = useState<ToolExecution[]>([]);
  const [showExecutionPanel, setShowExecutionPanel] = useState(false);

  const toggleTool = (toolId: string) => {
    setTools(tools.map(t => 
      t.id === toolId ? { ...t, isActive: !t.isActive } : t
    ));
  };

  const simulateExecution = (tool: Tool) => {
    const execution: ToolExecution = {
      id: Date.now().toString(),
      toolId: tool.id,
      status: 'running',
      input: tool.parameters.reduce((acc, param) => ({
        ...acc,
        [param.name]: param.type === 'string' ? 'sample_value' : 42
      }), {}),
      timestamp: new Date(),
    };

    setExecutions(prev => [execution, ...prev]);
    setShowExecutionPanel(true);

    // Simulate execution completion
    setTimeout(() => {
      setExecutions(prev => prev.map(e => 
        e.id === execution.id 
          ? { 
              ...e, 
              status: Math.random() > 0.2 ? 'completed' : 'error',
              output: JSON.stringify({ result: 'success', data: [] }, null, 2),
              duration: Math.floor(Math.random() * 1000) + 200
            }
          : e
      ));
    }, 1500);
  };

  const activeTools = tools.filter(t => t.isActive);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-magenta-500/20 flex items-center justify-center">
            <Wrench className="w-4 h-4 text-pink-400" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-nexus-text-primary">Tools</h3>
            <p className="text-xs text-nexus-text-secondary">{activeTools.length} active tools</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExecutionPanel(!showExecutionPanel)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all ${
              showExecutionPanel 
                ? 'bg-nexus-accent/20 text-nexus-accent' 
                : 'bg-white/5 text-nexus-text-secondary hover:bg-white/10'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            Executions ({executions.length})
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-nexus-text-secondary transition-all">
            <Plus className="w-3.5 h-3.5" />
            Add Tool
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Tools List */}
        <div className={`${showExecutionPanel ? 'w-1/2' : 'w-full'} border-r border-white/[0.08] overflow-y-auto`}>
          <div className="p-3 space-y-2">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedTool(tool)}
                className={`group p-3 rounded-xl cursor-pointer transition-all ${
                  selectedTool?.id === tool.id
                    ? 'bg-nexus-accent/15 border border-nexus-accent/40'
                    : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    tool.isActive ? 'bg-nexus-accent/20 text-nexus-accent' : 'bg-white/5 text-nexus-text-secondary'
                  }`}>
                    {tool.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-nexus-text-primary truncate">
                        {tool.name}()
                      </h4>
                      <div className="flex items-center gap-2">
                        {tool.lastUsed && (
                          <span className="flex items-center gap-1 text-[10px] text-nexus-text-secondary">
                            <Clock className="w-3 h-3" />
                            {tool.lastUsed}
                          </span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTool(tool.id);
                          }}
                          className={`w-8 h-4 rounded-full transition-colors relative ${
                            tool.isActive ? 'bg-nexus-accent' : 'bg-white/20'
                          }`}
                        >
                          <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${
                            tool.isActive ? 'left-4.5' : 'left-0.5'
                          }`} />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-xs text-nexus-text-secondary mt-1 line-clamp-2">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      {tool.parameters.map((param) => (
                        <span
                          key={param.name}
                          className={`text-[10px] px-2 py-0.5 rounded-full ${
                            param.required 
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                              : 'bg-white/5 text-nexus-text-secondary border border-white/[0.08]'
                          }`}
                        >
                          {param.name}: {param.type}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {tool.isActive && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        simulateExecution(tool);
                      }}
                      className="p-2 rounded-lg bg-nexus-accent/20 text-nexus-accent hover:bg-nexus-accent/30 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Play className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Execution Panel */}
        <AnimatePresence>
          {showExecutionPanel && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '50%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="overflow-hidden bg-black/20"
            >
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08]">
                  <span className="text-sm font-medium text-nexus-text-primary">Execution Log</span>
                  <button
                    onClick={() => setExecutions([])}
                    className="text-xs text-nexus-text-secondary hover:text-red-400 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {executions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-nexus-text-secondary">
                      <Terminal className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No executions yet</p>
                      <p className="text-xs opacity-60">Run a tool to see results</p>
                    </div>
                  ) : (
                    executions.map((execution) => {
                      const tool = tools.find(t => t.id === execution.toolId);
                      return (
                        <motion.div
                          key={execution.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {execution.status === 'running' && (
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                >
                                  <Settings className="w-4 h-4 text-nexus-accent" />
                                </motion.div>
                              )}
                              {execution.status === 'completed' && (
                                <Check className="w-4 h-4 text-green-400" />
                              )}
                              {execution.status === 'error' && (
                                <X className="w-4 h-4 text-red-400" />
                              )}
                              <span className="text-sm font-medium text-nexus-text-primary">
                                {tool?.name}()
                              </span>
                            </div>
                            {execution.duration && (
                              <span className="text-xs text-nexus-text-secondary">
                                {execution.duration}ms
                              </span>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-[10px] text-nexus-text-secondary uppercase">Input</span>
                              <pre className="mt-1 p-2 rounded bg-black/30 text-xs text-nexus-text-secondary overflow-x-auto">
                                {JSON.stringify(execution.input, null, 2)}
                              </pre>
                            </div>
                            
                            {execution.output && (
                              <div>
                                <span className="text-[10px] text-nexus-text-secondary uppercase">Output</span>
                                <pre className="mt-1 p-2 rounded bg-black/30 text-xs text-green-400 overflow-x-auto">
                                  {execution.output}
                                </pre>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
