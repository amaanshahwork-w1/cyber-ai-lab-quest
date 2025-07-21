import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Database, Search, Target, ArrowRight, Code, Eye } from 'lucide-react';

interface DroppableArea {
  id: string;
  title: string;
  acceptedItems: string[];
  droppedItem?: string;
}

interface DraggableItem {
  id: string;
  title: string;
  category: string;
}

const draggableItems: DraggableItem[] = [
  { id: 'supervised', title: 'Supervised Learning', category: 'method' },
  { id: 'unsupervised', title: 'Unsupervised Learning', category: 'method' },
  { id: 'bert', title: 'BERT/NLP', category: 'algorithm' },
  { id: 'isolation-forest', title: 'Isolation Forest', category: 'algorithm' },
  { id: 'svm', title: 'Support Vector Machine', category: 'algorithm' },
  { id: 'clustering', title: 'K-Means Clustering', category: 'algorithm' },
];

const dropAreas: DroppableArea[] = [
  {
    id: 'malware-detection',
    title: 'Malware Detection',
    acceptedItems: ['supervised', 'svm'],
  },
  {
    id: 'phishing-detection',
    title: 'Phishing Email Detection',
    acceptedItems: ['supervised', 'bert'],
  },
  {
    id: 'anomaly-detection',
    title: 'Network Anomaly Detection',
    acceptedItems: ['unsupervised', 'isolation-forest'],
  },
  {
    id: 'log-analysis',
    title: 'Log Pattern Analysis',
    acceptedItems: ['unsupervised', 'clustering'],
  },
];

export const AiConceptsModule = () => {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedItems, setDroppedItems] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<Record<string, boolean>>({});
  const [currentView, setCurrentView] = useState<'theory' | 'demo' | 'exercise'>('theory');

  const handleDrop = (areaId: string) => {
    if (!draggedItem) return;
    
    const area = dropAreas.find(a => a.id === areaId);
    const isCorrect = area?.acceptedItems.includes(draggedItem) || false;
    
    setDroppedItems(prev => ({ ...prev, [areaId]: draggedItem }));
    setShowFeedback(prev => ({ ...prev, [areaId]: true }));
    setDraggedItem(null);
  };

  const codeExample = `
# Simple Anomaly Detection Example
from sklearn.ensemble import IsolationForest
import numpy as np

# Sample network traffic data (features: packet_size, frequency, protocol_type)
normal_traffic = np.array([
    [64, 10, 1],    # Normal web traffic
    [128, 15, 1],   # Normal web traffic
    [256, 8, 2],    # Normal email traffic
])

# Train the model on normal traffic patterns
detector = IsolationForest(contamination=0.1, random_state=42)
detector.fit(normal_traffic)

# Test with suspicious traffic
suspicious_traffic = np.array([[2048, 1000, 3]])  # Large, frequent, unusual protocol
prediction = detector.predict(suspicious_traffic)

# -1 = Anomaly (potential threat), 1 = Normal
print(f"Traffic analysis: {'🚨 THREAT DETECTED' if prediction[0] == -1 else '✅ Normal'}")
`;

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-cyber rounded-lg">
              <Brain className="w-6 h-6 text-black" />
            </div>
            Core AI Concepts in Cybersecurity
          </CardTitle>
          <div className="flex gap-2">
            {(['theory', 'demo', 'exercise'] as const).map((view) => (
              <Button
                key={view}
                variant={currentView === view ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentView(view)}
                className={currentView === view ? 'bg-gradient-cyber text-black' : ''}
              >
                {view === 'theory' && <Database className="w-4 h-4 mr-2" />}
                {view === 'demo' && <Code className="w-4 h-4 mr-2" />}
                {view === 'exercise' && <Target className="w-4 h-4 mr-2" />}
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          {currentView === 'theory' && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-terminal-bg rounded-lg p-6 border border-cyber-green/20">
                  <h3 className="text-xl font-semibold text-cyber-green mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5" />
                    Supervised Learning
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Learning from labeled examples - like training a guard dog with "good" and "bad" examples.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                      <span className="text-sm">Malware classification</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                      <span className="text-sm">Phishing email detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-cyber-green rounded-full"></div>
                      <span className="text-sm">Network intrusion detection</span>
                    </div>
                  </div>
                </div>

                <div className="bg-terminal-bg rounded-lg p-6 border border-accent/20">
                  <h3 className="text-xl font-semibold text-accent mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Unsupervised Learning
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Finding hidden patterns without examples - like a detective spotting unusual behavior.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Zero-day attack detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Network anomaly detection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">User behavior analysis</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-cyber rounded-lg p-6 text-black">
                <h3 className="text-xl font-semibold mb-4">🧠 Think Like a Hacker (and AI)</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-black/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">1. Pattern Recognition</h4>
                    <p className="text-sm">AI excels at spotting patterns humans might miss in massive datasets.</p>
                  </div>
                  <div className="bg-black/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">2. Speed & Scale</h4>
                    <p className="text-sm">Analyze millions of events per second - impossible for humans alone.</p>
                  </div>
                  <div className="bg-black/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">3. Continuous Learning</h4>
                    <p className="text-sm">Models improve with each new threat, adapting to evolving attacks.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentView === 'demo' && (
            <div className="space-y-6">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-primary mb-4">Live Code Demo: Anomaly Detection</h3>
                <pre className="text-sm text-cyber-green bg-black/50 p-4 rounded-lg overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-terminal-bg border-cyber-green/20">
                  <CardHeader>
                    <CardTitle className="text-cyber-green text-lg">How It Works</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center text-black text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-semibold">Train on Normal Data</h4>
                        <p className="text-sm text-muted-foreground">Model learns what "normal" network traffic looks like</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center text-black text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-semibold">Detect Outliers</h4>
                        <p className="text-sm text-muted-foreground">Anything significantly different gets flagged</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center text-black text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-semibold">Alert Security Team</h4>
                        <p className="text-sm text-muted-foreground">Suspicious activity triggers immediate investigation</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-terminal-bg border-cyber-orange/20">
                  <CardHeader>
                    <CardTitle className="text-cyber-orange text-lg">Real-World Application</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-cyber-orange/10 rounded-lg">
                      <h4 className="font-semibold text-cyber-orange mb-1">Banking Fraud Detection</h4>
                      <p className="text-sm">Detects unusual transaction patterns indicating potential fraud</p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <h4 className="font-semibold text-accent mb-1">DDoS Attack Prevention</h4>
                      <p className="text-sm">Identifies abnormal traffic spikes before they overwhelm servers</p>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <h4 className="font-semibold text-primary mb-1">Insider Threat Detection</h4>
                      <p className="text-sm">Spots employees accessing unusual files or systems</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {currentView === 'exercise' && (
            <div className="space-y-6">
              <div className="bg-gradient-cyber rounded-lg p-6 text-black">
                <h3 className="text-xl font-semibold mb-2">🧩 Match the Method to the Use Case</h3>
                <p className="mb-4">Drag the AI methods and algorithms to their best cybersecurity applications!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-primary">AI Methods & Algorithms</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {draggableItems.map((item) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={() => setDraggedItem(item.id)}
                        className={`p-3 rounded-lg border cursor-move transition-all duration-300 ${
                          item.category === 'method'
                            ? 'bg-cyber-green/10 border-cyber-green/50 text-cyber-green'
                            : 'bg-accent/10 border-accent/50 text-accent'
                        } hover:scale-105 hover:shadow-glow-cyan`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-semibold">{item.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-4 text-primary">Cybersecurity Applications</h4>
                  <div className="space-y-3">
                    {dropAreas.map((area) => (
                      <div
                        key={area.id}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(area.id)}
                        className={`p-4 rounded-lg border-2 border-dashed min-h-[80px] flex items-center justify-center transition-all duration-300 ${
                          droppedItems[area.id]
                            ? showFeedback[area.id] && area.acceptedItems.includes(droppedItems[area.id])
                              ? 'bg-cyber-green/10 border-cyber-green text-cyber-green'
                              : 'bg-destructive/10 border-destructive text-destructive'
                            : 'bg-terminal-bg border-primary/30 hover:border-primary'
                        }`}
                      >
                        <div className="text-center">
                          <div className="font-semibold">{area.title}</div>
                          {droppedItems[area.id] && (
                            <div className="mt-2">
                              <div className="text-sm">
                                {draggableItems.find(item => item.id === droppedItems[area.id])?.title}
                              </div>
                              {showFeedback[area.id] && (
                                <div className="text-xs mt-1">
                                  {area.acceptedItems.includes(droppedItems[area.id])
                                    ? '✅ Perfect match!'
                                    : '❌ Try a different approach'
                                  }
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {Object.keys(droppedItems).length === dropAreas.length && (
                <div className="text-center">
                  <div className="bg-gradient-cyber rounded-lg p-6 text-black inline-block">
                    <h3 className="text-xl font-bold mb-2">Great Work! 🎉</h3>
                    <p>You've successfully mapped AI methods to cybersecurity applications!</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};