import React from 'react';
import { Book, Brain, Shield, Zap, Terminal, Target, HelpCircle, Trophy, Activity, Code } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  completed: boolean;
}

interface ModuleNavigationProps {
  currentModule: string;
  onModuleSelect: (moduleId: string) => void;
}

const modules: Module[] = [
  {
    id: 'welcome',
    title: 'Welcome Lab',
    icon: <Book className="w-5 h-5" />,
    description: 'Get started with AI in cybersecurity',
    completed: false,
  },
  {
    id: 'ai-concepts',
    title: 'AI Concepts',
    icon: <Brain className="w-5 h-5" />,
    description: 'Learn core AI and ML principles',
    completed: false,
  },
  {
    id: 'owasp-threats',
    title: 'OWASP Threats',
    icon: <Shield className="w-5 h-5" />,
    description: 'Map threats to AI detection methods',
    completed: false,
  },
  {
    id: 'mini-labs',
    title: 'Enhanced Labs',
    icon: <Terminal className="w-5 h-5" />,
    description: 'Advanced security simulations',
    completed: false,
  },
  {
    id: 'threat-intel',
    title: 'Threat Intel',
    icon: <Activity className="w-5 h-5" />,
    description: 'Live threat monitoring dashboard',
    completed: false,
  },
  {
    id: 'interactive-sim',
    title: 'Code Lab',
    icon: <Code className="w-5 h-5" />,
    description: 'Interactive security coding',
    completed: false,
  },
  {
    id: 'ai-tools',
    title: 'AI Security Tools',
    icon: <Zap className="w-5 h-5" />,
    description: 'Explore industry-leading platforms',
    completed: false,
  },
  {
    id: 'myths-reality',
    title: 'Myths vs Reality',
    icon: <Target className="w-5 h-5" />,
    description: 'Separate facts from fiction',
    completed: false,
  },
  {
    id: 'quiz-challenge',
    title: 'Final Challenge',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'Test your knowledge',
    completed: false,
  },
  {
    id: 'roadmap',
    title: 'Next Steps',
    icon: <Trophy className="w-5 h-5" />,
    description: 'Your learning journey continues',
    completed: false,
  },
];

export const ModuleNavigation: React.FC<ModuleNavigationProps> = ({
  currentModule,
  onModuleSelect,
}) => {
  return (
    <div className="sticky top-4 space-y-2">
      <h3 className="text-lg font-semibold text-primary mb-4">Lab Modules</h3>
      {modules.map((module, index) => (
        <button
          key={module.id}
          onClick={() => onModuleSelect(module.id)}
          className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
            currentModule === module.id
              ? 'bg-gradient-cyber text-black border-primary shadow-glow-cyan'
              : 'bg-card text-foreground border-border hover:border-primary/50 hover:shadow-glow-cyan/50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded ${
              currentModule === module.id ? 'bg-black/20' : 'bg-primary/10'
            }`}>
              {module.icon}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{module.title}</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs opacity-60">Module {index + 1}</span>
                {module.completed && (
                  <span className="text-xs bg-cyber-green/20 text-cyber-green px-2 py-1 rounded">
                    ✓ Complete
                  </span>
                )}
              </div>
            </div>
          </div>
          <p className={`text-sm ${
            currentModule === module.id ? 'text-black/70' : 'text-muted-foreground'
          }`}>
            {module.description}
          </p>
        </button>
      ))}
    </div>
  );
};