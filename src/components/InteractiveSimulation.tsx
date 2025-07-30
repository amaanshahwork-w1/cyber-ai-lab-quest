import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Terminal,
  Code,
  Brain,
  Zap,
  Shield,
  Eye
} from 'lucide-react';

interface SimulationStep {
  id: string;
  title: string;
  description: string;
  code: string;
  explanation: string;
  userInput?: boolean;
  expectedOutput: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const simulationSteps: SimulationStep[] = [
  {
    id: 'import-libs',
    title: 'Import Security Libraries',
    description: 'Import the necessary Python libraries for our AI security analysis',
    code: `import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest
from sklearn.feature_extraction.text import TfidfVectorizer
import hashlib
import re`,
    explanation: 'We import key libraries: NumPy for numerical operations, Pandas for data manipulation, Scikit-learn for machine learning models, and built-in libraries for cryptographic functions.',
    expectedOutput: 'Libraries imported successfully',
    difficulty: 'beginner'
  },
  {
    id: 'malware-signature',
    title: 'Create Malware Detection Function',
    description: 'Build a simple malware detection system using file hashing',
    code: `def detect_malware(file_content):
    # Calculate file hash
    file_hash = hashlib.sha256(file_content.encode()).hexdigest()
    
    # Known malware signatures (simplified)
    malware_hashes = {
        'a1b2c3d4e5f6...': 'Trojan.Generic',
        'f6e5d4c3b2a1...': 'Virus.W32.Conficker',
        '123456789abc...': 'Ransomware.WannaCry'
    }
    
    return malware_hashes.get(file_hash, 'Clean')`,
    explanation: 'This function creates a SHA-256 hash of file content and compares it against a database of known malware signatures. Real-world systems use millions of signatures.',
    expectedOutput: 'Malware detection function created',
    difficulty: 'intermediate',
    userInput: true
  },
  {
    id: 'phishing-ai',
    title: 'AI Phishing Detection',
    description: 'Use machine learning to detect phishing emails',
    code: `def detect_phishing(email_text):
    # Feature extraction using TF-IDF
    vectorizer = TfidfVectorizer(max_features=100, stop_words='english')
    
    # Suspicious patterns
    urgent_words = ['urgent', 'immediate', 'expire', 'suspend']
    phish_patterns = ['click here', 'verify account', 'update payment']
    
    # Calculate suspicion score
    score = 0
    for word in urgent_words:
        if word in email_text.lower():
            score += 0.3
    
    for pattern in phish_patterns:
        if pattern in email_text.lower():
            score += 0.4
    
    return 'PHISHING' if score > 0.5 else 'SAFE'`,
    explanation: 'This AI model uses Natural Language Processing to analyze email content for phishing indicators. It combines keyword matching with machine learning techniques.',
    expectedOutput: 'AI phishing detector ready',
    difficulty: 'advanced'
  },
  {
    id: 'anomaly-detection',
    title: 'Network Anomaly Detection',
    description: 'Implement unsupervised learning for network anomaly detection',
    code: `def detect_network_anomalies(network_data):
    # Initialize Isolation Forest model
    iso_forest = IsolationForest(contamination=0.1, random_state=42)
    
    # Features: packet_size, connection_duration, port_number
    features = ['packet_size', 'duration', 'port']
    
    # Fit the model and predict anomalies
    X = network_data[features]
    anomalies = iso_forest.fit_predict(X)
    
    # -1 indicates anomaly, 1 indicates normal
    anomaly_count = sum(1 for x in anomalies if x == -1)
    
    return f"Detected {anomaly_count} network anomalies"`,
    explanation: 'Isolation Forest is an unsupervised learning algorithm that identifies anomalies by isolating outliers. It\'s particularly effective for detecting unusual network behavior.',
    expectedOutput: 'Network anomaly detection active',
    difficulty: 'advanced',
    userInput: true
  }
];

export const InteractiveSimulation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentStepData = simulationSteps[currentStep];

  useEffect(() => {
    if (currentStepData && !currentStepData.userInput) {
      setUserCode(currentStepData.code);
    } else {
      setUserCode('');
    }
  }, [currentStep, currentStepData]);

  const runSimulation = async () => {
    setIsRunning(true);
    setOutput([]);
    
    const steps = [
      'Initializing AI security engine...',
      'Loading threat intelligence database...',
      'Compiling machine learning models...',
      'Running security analysis...',
      'Generating threat assessment...',
      'Analysis complete!'
    ];

    for (let i = 0; i < steps.length; i++) {
      setProgress((i + 1) / steps.length * 100);
      setOutput(prev => [...prev, `> ${steps[i]}`]);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Simulate code execution result
    setOutput(prev => [...prev, '', `✓ ${currentStepData.expectedOutput}`, '']);
    
    // Add detailed analysis based on the step
    if (currentStep === 1) {
      setOutput(prev => [...prev, 
        '📊 Analysis Results:',
        '• File hash: a1b2c3d4e5f6...',
        '• Threat level: CLEAN',
        '• Confidence: 99.2%',
        '• Scan time: 0.3 seconds'
      ]);
    } else if (currentStep === 2) {
      setOutput(prev => [...prev,
        '📧 Email Analysis:',
        '• Suspicious keywords: 2 detected',
        '• URL reputation: SAFE',
        '• Sender verification: VALID',
        '• Overall risk: LOW'
      ]);
    } else if (currentStep === 3) {
      setOutput(prev => [...prev,
        '🌐 Network Monitoring:',
        '• Total connections: 1,247',
        '• Anomalies detected: 3',
        '• Alert level: MEDIUM',
        '• Action required: Review flagged IPs'
      ]);
    }

    setCompletedSteps(prev => new Set([...prev, currentStep]));
    setIsRunning(false);
  };

  const nextStep = () => {
    if (currentStep < simulationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(0);
      setOutput([]);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setProgress(0);
      setOutput([]);
    }
  };

  const resetSimulation = () => {
    setCurrentStep(0);
    setProgress(0);
    setOutput([]);
    setCompletedSteps(new Set());
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-cyber-green bg-cyber-green/10 border-cyber-green/50';
      case 'intermediate': return 'text-cyber-orange bg-cyber-orange/10 border-cyber-orange/50';
      case 'advanced': return 'text-destructive bg-destructive/10 border-destructive/50';
      default: return 'text-muted-foreground bg-muted/10 border-muted/50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-3 bg-gradient-cyber rounded-lg animate-float">
              <Brain className="w-6 h-6 text-black" />
            </div>
            <span className="font-cyber">Interactive AI Security Coding Lab</span>
            <Badge 
              variant="outline" 
              className={getDifficultyColor(currentStepData?.difficulty)}
            >
              {currentStepData?.difficulty?.toUpperCase()}
            </Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            Learn AI cybersecurity by writing and executing real code in our interactive environment
          </p>
        </CardHeader>
      </Card>

      {/* Progress Bar */}
      <Card className="bg-terminal-bg border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {simulationSteps.length}
            </span>
          </div>
          <Progress 
            value={(currentStep / (simulationSteps.length - 1)) * 100} 
            className="h-2"
          />
          <div className="flex justify-between mt-2">
            {simulationSteps.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 ${
                  completedSteps.has(index)
                    ? 'bg-cyber-green border-cyber-green'
                    : index === currentStep
                    ? 'bg-primary border-primary animate-pulse'
                    : 'bg-muted border-muted'
                }`}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Simulation */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Code Editor */}
        <Card className="bg-terminal-bg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Code className="w-5 h-5 text-cyber-green" />
              <span className="font-cyber">{currentStepData?.title}</span>
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {currentStepData?.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-black/50 rounded-lg p-4 border border-cyber-green/20">
                <div className="flex items-center gap-2 mb-3">
                  <Terminal className="w-4 h-4 text-cyber-green" />
                  <span className="text-sm font-mono text-cyber-green">security_lab.py</span>
                </div>
                <textarea
                  value={userCode || currentStepData?.code || ''}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-64 bg-transparent border-none resize-none focus:outline-none font-mono text-sm text-foreground"
                  placeholder="Write your security code here..."
                  disabled={!currentStepData?.userInput}
                />
              </div>
              
              <div className="flex gap-3">
                <Button
                  onClick={runSimulation}
                  disabled={isRunning}
                  className="bg-cyber-green text-black hover:bg-cyber-green/80"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Execute Code
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => setUserCode(currentStepData?.code || '')}
                  className="border-cyber-orange/50 text-cyber-orange hover:bg-cyber-orange/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Output Terminal */}
        <Card className="bg-terminal-bg border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-primary" />
              <span className="font-cyber">Security Analysis Output</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress indicator */}
              {isRunning && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Processing security analysis...
                  </div>
                </div>
              )}

              {/* Terminal output */}
              <div className="bg-black/50 rounded-lg p-4 border border-primary/20 min-h-64 max-h-64 overflow-y-auto">
                <div className="space-y-1 font-mono text-sm">
                  {output.map((line, index) => (
                    <div
                      key={index}
                      className={`${
                        line.startsWith('>')
                          ? 'text-cyber-green'
                          : line.startsWith('✓')
                          ? 'text-cyber-green font-bold'
                          : line.startsWith('📊') || line.startsWith('📧') || line.startsWith('🌐')
                          ? 'text-cyber-orange font-bold'
                          : line.startsWith('•')
                          ? 'text-muted-foreground pl-4'
                          : 'text-foreground'
                      } animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {line}
                    </div>
                  ))}
                  {output.length === 0 && !isRunning && (
                    <div className="text-muted-foreground italic">
                      Click "Execute Code" to run the security analysis...
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className="border-muted/50"
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={resetSimulation}
                    className="border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset All
                  </Button>
                  
                  <Button
                    onClick={nextStep}
                    disabled={currentStep === simulationSteps.length - 1}
                    className="bg-primary hover:bg-primary/80"
                  >
                    Next Step
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Explanation Panel */}
      <Card className="bg-gradient-card border-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Eye className="w-5 h-5 text-accent" />
            <span className="font-cyber">Code Explanation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {currentStepData?.explanation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};