import React, { useState } from 'react';
import { CyberLabHeader } from './CyberLabHeader';
import { ModuleNavigation } from './ModuleNavigation';
import { WelcomeModule } from './modules/WelcomeModule';
import { AiConceptsModule } from './modules/AiConceptsModule';
import { EnhancedMiniLabsModule } from './modules/EnhancedMiniLabsModule';
import { ThreatIntelligenceDashboard } from './ThreatIntelligenceDashboard';
import { InteractiveSimulation } from './InteractiveSimulation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Brain, 
  Target, 
  Zap, 
  HelpCircle, 
  Trophy, 
  ChevronDown,
  ExternalLink,
  Github,
  BookOpen,
  Play,
  ArrowRight,
  CheckCircle,
  XCircle,
  Download,
  RotateCcw
} from 'lucide-react';

// Placeholder modules for now
const OWASPThreatsModule = () => (
  <Card className="bg-gradient-card border-primary/20 shadow-glow-purple">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-2xl">
        <div className="p-3 bg-gradient-cyber rounded-lg">
          <Shield className="w-6 h-6 text-black" />
        </div>
        OWASP Top 10 Threats & AI Mapping
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div className="bg-gradient-cyber rounded-lg p-6 text-black">
          <h3 className="text-xl font-semibold mb-4">🛡️ Map Threats to AI Solutions</h3>
          <p className="mb-4">Learn how AI detects and prevents the most common web application vulnerabilities.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-primary">OWASP Top 5 Threats</h4>
            {[
              { threat: 'SQL Injection', ai: 'Pattern Matching & NLP', color: 'cyber-green' },
              { threat: 'Cross-Site Scripting (XSS)', ai: 'Content Analysis & Classification', color: 'cyber-orange' },
              { threat: 'Broken Authentication', ai: 'Behavioral Analytics', color: 'accent' },
              { threat: 'Security Misconfiguration', ai: 'Configuration Scanning', color: 'primary' },
              { threat: 'Insecure Deserialization', ai: 'Code Analysis & Anomaly Detection', color: 'cyber-green' },
            ].map((item, index) => (
              <div key={index} className="bg-terminal-bg rounded-lg p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-semibold">{item.threat}</h5>
                  <Badge variant="outline" className={`text-${item.color}`}>
                    AI Solution
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.ai}</p>
              </div>
            ))}
          </div>

          <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
            <h4 className="text-lg font-semibold text-primary mb-4">How AI Detects XSS Attacks</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyber-green rounded-full flex items-center justify-center text-black text-sm font-bold">1</div>
                <div>
                  <h5 className="font-semibold">Input Analysis</h5>
                  <p className="text-sm text-muted-foreground">Scan for script tags and malicious patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-cyber-orange rounded-full flex items-center justify-center text-black text-sm font-bold">2</div>
                <div>
                  <h5 className="font-semibold">Context Understanding</h5>
                  <p className="text-sm text-muted-foreground">NLP models understand intent and context</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-black text-sm font-bold">3</div>
                <div>
                  <h5 className="font-semibold">Real-Time Blocking</h5>
                  <p className="text-sm text-muted-foreground">Immediate response prevents execution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const AIToolsModule = () => (
  <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-2xl">
        <div className="p-3 bg-gradient-cyber rounded-lg">
          <Zap className="w-6 h-6 text-black" />
        </div>
        AI Security Tools Showcase
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              name: 'CrowdStrike Falcon',
              category: 'Endpoint Protection',
              description: 'AI-powered threat hunting and response',
              features: ['Real-time detection', 'Behavioral analysis', 'Threat intelligence'],
              color: 'cyber-green'
            },
            {
              name: 'Darktrace',
              category: 'Network Security',
              description: 'Self-learning AI for anomaly detection',
              features: ['Unsupervised learning', 'Network visualization', 'Autonomous response'],
              color: 'cyber-orange'
            },
            {
              name: 'IBM QRadar',
              category: 'SIEM Platform',
              description: 'AI-enhanced security information management',
              features: ['Log correlation', 'Threat prioritization', 'Investigation tools'],
              color: 'accent'
            },
            {
              name: 'Cylance',
              category: 'Malware Prevention',
              description: 'Mathematical approach to malware detection',
              features: ['Pre-execution analysis', 'Machine learning models', 'Predictive prevention'],
              color: 'primary'
            }
          ].map((tool, index) => (
            <div key={index} className="bg-terminal-bg rounded-lg p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-3 h-3 bg-${tool.color} rounded-full animate-cyber-pulse`}></div>
                <h4 className="font-semibold text-lg">{tool.name}</h4>
                <Badge variant="outline" className="ml-auto">{tool.category}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <div className="space-y-2">
                {tool.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-cyber rounded-lg p-6 text-black">
          <h3 className="text-xl font-semibold mb-4">🧠 Try AI Tools (Simulated)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-black/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Terminal Simulation</h4>
              <div className="bg-black/20 rounded p-3 font-mono text-sm">
                <div className="text-cyber-green">$ crowdstrike-falcon --scan</div>
                <div>🔍 Scanning endpoints...</div>
                <div>✅ 0 threats detected</div>
                <div>📊 Analysis complete in 0.3s</div>
              </div>
            </div>
            <div className="bg-black/10 rounded-lg p-4">
              <h4 className="font-semibold mb-2">Dashboard Preview</h4>
              <div className="space-y-2">
                <div className="bg-black/20 rounded p-2 text-sm">Network: Normal Activity</div>
                <div className="bg-black/20 rounded p-2 text-sm">Endpoints: 24/24 Protected</div>
                <div className="bg-black/20 rounded p-2 text-sm">Threats Blocked: 15 today</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const MythsRealityModule = () => (
  <Card className="bg-gradient-card border-primary/20 shadow-glow-purple">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-2xl">
        <div className="p-3 bg-gradient-cyber rounded-lg">
          <Target className="w-6 h-6 text-black" />
        </div>
        Myths vs Reality
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              myth: "AI can replace all security analysts",
              reality: "AI augments human expertise but cannot replace critical thinking and creativity",
              explanation: "While AI excels at pattern recognition and processing large datasets, human analysts provide context, strategic thinking, and ethical judgment that AI cannot replicate."
            },
            {
              myth: "AI security tools are 100% accurate",
              reality: "AI systems have false positives and can miss sophisticated attacks",
              explanation: "No security solution is perfect. AI requires continuous training, updates, and human oversight to maintain effectiveness."
            },
            {
              myth: "AI can prevent all cyber attacks",
              reality: "AI is a powerful tool but not a silver bullet for cybersecurity",
              explanation: "Cybersecurity requires a layered approach combining AI, human expertise, processes, and various security technologies."
            }
          ].map((item, index) => (
            <div key={index} className="bg-terminal-bg rounded-lg p-6 border border-border">
              <div className="space-y-4">
                <div className="p-3 bg-destructive/10 border border-destructive/50 rounded-lg">
                  <h4 className="font-semibold text-destructive mb-2">❌ Myth</h4>
                  <p className="text-sm">{item.myth}</p>
                </div>
                <div className="p-3 bg-cyber-green/10 border border-cyber-green/50 rounded-lg">
                  <h4 className="font-semibold text-cyber-green mb-2">✅ Reality</h4>
                  <p className="text-sm">{item.reality}</p>
                </div>
                <div className="p-3 bg-primary/10 border border-primary/50 rounded-lg">
                  <h4 className="font-semibold text-primary mb-2">💡 Explanation</h4>
                  <p className="text-sm">{item.explanation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

const QuizChallengeModule = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const challengeQuestions = [
    {
      id: 'q1',
      question: 'Which machine learning technique is most effective for detecting zero-day malware attacks?',
      options: [
        'Signature-based detection using known patterns',
        'Unsupervised anomaly detection analyzing behavior',
        'Rule-based expert systems',
        'Simple hash comparison algorithms'
      ],
      correct: 1,
      explanation: 'Unsupervised anomaly detection can identify previously unknown threats by detecting unusual behavior patterns, making it ideal for zero-day attacks.'
    },
    {
      id: 'q2',
      question: 'What is the primary advantage of using transformer models like BERT for phishing email detection?',
      options: [
        'They only work with English text',
        'They understand context and semantic meaning in text',
        'They are faster than simple keyword matching',
        'They require less training data'
      ],
      correct: 1,
      explanation: 'BERT and similar transformer models excel at understanding context and semantic relationships in text, allowing them to detect sophisticated phishing attempts that simple keyword matching might miss.'
    },
    {
      id: 'q3',
      question: 'In network intrusion detection, what makes ensemble methods particularly effective?',
      options: [
        'They only use one algorithm',
        'They combine multiple models to reduce false positives',
        'They work only on encrypted traffic',
        'They require manual rule updates'
      ],
      correct: 1,
      explanation: 'Ensemble methods combine predictions from multiple models, which helps reduce false positives and improves overall detection accuracy by leveraging the strengths of different algorithms.'
    },
    {
      id: 'q4',
      question: 'What is a key challenge when implementing AI for real-time cybersecurity monitoring?',
      options: [
        'AI models are too accurate',
        'Balancing detection speed with accuracy',
        'AI cannot work with encrypted data',
        'Too much training data available'
      ],
      correct: 1,
      explanation: 'Real-time cybersecurity requires balancing the speed of detection (to respond quickly to threats) with accuracy (to minimize false positives that could overwhelm security teams).'
    },
    {
      id: 'q5',
      question: 'Which approach is most effective for defending against adversarial attacks on AI security models?',
      options: [
        'Using only traditional security methods',
        'Adversarial training and robust model design',
        'Increasing model complexity indefinitely',
        'Avoiding AI in security applications'
      ],
      correct: 1,
      explanation: 'Adversarial training, where models are trained on both normal and adversarial examples, combined with robust model architectures, provides the best defense against adversarial attacks.'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === challengeQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < challengeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const startChallenge = () => {
    setIsStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowFeedback(false);
    setQuizCompleted(false);
  };

  if (!isStarted) {
    return (
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-cyber rounded-lg">
              <HelpCircle className="w-6 h-6 text-black" />
            </div>
            Final Knowledge Challenge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-6">
            <div className="bg-gradient-cyber rounded-lg p-8 text-black">
              <h3 className="text-2xl font-bold mb-4">🏆 Test Your Skills</h3>
              <p className="text-lg">Complete this comprehensive quiz to earn your AI Cybersecurity Certificate!</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-terminal-bg p-6 rounded-lg border border-cyber-green/20">
                <h4 className="font-semibold text-cyber-green mb-2">5 Questions</h4>
                <p className="text-sm text-muted-foreground">Multiple choice, drag-and-drop, and scenario-based</p>
              </div>
              <div className="bg-terminal-bg p-6 rounded-lg border border-cyber-orange/20">
                <h4 className="font-semibold text-cyber-orange mb-2">Real-Time Feedback</h4>
                <p className="text-sm text-muted-foreground">Instant explanations for each answer</p>
              </div>
              <div className="bg-terminal-bg p-6 rounded-lg border border-accent/20">
                <h4 className="font-semibold text-accent mb-2">Certificate Ready</h4>
                <p className="text-sm text-muted-foreground">Downloadable completion certificate</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="bg-gradient-cyber text-black hover:opacity-90 animate-pulse"
              onClick={startChallenge}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Final Challenge
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / challengeQuestions.length) * 100);
    const passed = percentage >= 70;

    return (
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-cyber rounded-lg">
              <Trophy className="w-6 h-6 text-black" />
            </div>
            Challenge Complete!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className={`p-8 rounded-lg ${passed ? 'bg-cyber-green/20 border border-cyber-green/50' : 'bg-cyber-orange/20 border border-cyber-orange/50'}`}>
            <h3 className="text-3xl font-bold mb-4">
              {passed ? '🎉 Congratulations!' : '📚 Keep Learning!'}
            </h3>
            <p className="text-xl mb-4">
              You scored {score} out of {challengeQuestions.length} ({percentage}%)
            </p>
            <p className="text-lg">
              {passed 
                ? 'You have mastered AI cybersecurity fundamentals!' 
                : 'Review the materials and try again to earn your certificate.'}
            </p>
          </div>

          {passed && (
            <div className="bg-gradient-cyber rounded-lg p-6 text-black">
              <h4 className="text-xl font-bold mb-2">🏆 AI Cybersecurity Expert</h4>
              <p className="mb-4">You have successfully completed the AI Cybersecurity Training Program</p>
              <Button className="bg-black text-cyber-green hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Download Certificate
              </Button>
            </div>
          )}

          <Button 
            variant="outline" 
            onClick={() => setIsStarted(false)}
            className="border-primary/50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentQ = challengeQuestions[currentQuestion];

  return (
    <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-3 bg-gradient-cyber rounded-lg">
            <HelpCircle className="w-6 h-6 text-black" />
          </div>
          Final Challenge - Question {currentQuestion + 1}
        </CardTitle>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {challengeQuestions.length}
          </span>
          <div className="flex gap-1">
            {challengeQuestions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < currentQuestion
                    ? 'bg-cyber-green'
                    : index === currentQuestion
                    ? 'bg-primary'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
          <h3 className="text-lg font-semibold mb-6">{currentQ.question}</h3>
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showFeedback && handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 ${
                  showFeedback
                    ? index === currentQ.correct
                      ? 'bg-cyber-green/20 border-cyber-green text-cyber-green'
                      : index === selectedAnswer && index !== currentQ.correct
                      ? 'bg-destructive/20 border-destructive text-destructive'
                      : 'bg-muted/10 border-muted text-muted-foreground'
                    : selectedAnswer === index
                    ? 'bg-primary/20 border-primary'
                    : 'bg-card border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                  {showFeedback && index === currentQ.correct && (
                    <CheckCircle className="w-5 h-5 text-cyber-green ml-auto" />
                  )}
                  {showFeedback && index === selectedAnswer && index !== currentQ.correct && (
                    <XCircle className="w-5 h-5 text-destructive ml-auto" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded-lg border ${
            selectedAnswer === currentQ.correct
              ? 'bg-cyber-green/10 border-cyber-green/50 text-cyber-green'
              : 'bg-cyber-orange/10 border-cyber-orange/50 text-cyber-orange'
          } animate-scale-up`}>
            <p className="font-semibold mb-2">
              {selectedAnswer === currentQ.correct ? '✅ Excellent!' : '❌ Not quite right.'}
            </p>
            <p className="text-sm">{currentQ.explanation}</p>
          </div>
        )}

        {showFeedback && (
          <div className="flex justify-center">
            <Button onClick={nextQuestion} className="bg-gradient-cyber text-black hover:opacity-90">
              {currentQuestion < challengeQuestions.length - 1 ? 'Next Question' : 'Complete Challenge'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const RoadmapModule = () => (
  <Card className="bg-gradient-card border-primary/20 shadow-glow-purple">
    <CardHeader>
      <CardTitle className="flex items-center gap-3 text-2xl">
        <div className="p-3 bg-gradient-cyber rounded-lg">
          <Trophy className="w-6 h-6 text-black" />
        </div>
        Your Learning Journey Continues
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-8">
        <div className="bg-gradient-cyber rounded-lg p-6 text-black">
          <h3 className="text-xl font-semibold mb-4">🎉 Congratulations!</h3>
          <p className="text-lg">You've completed the AI Cybersecurity Simulation Lab. Here's your roadmap to continue learning:</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-terminal-bg rounded-lg p-6 border border-cyber-green/20">
            <Github className="w-8 h-8 text-cyber-green mb-3" />
            <h4 className="font-semibold text-cyber-green mb-3">Practice Projects</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>Build a Phishing Detector with Python</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>Create Network Anomaly Detection</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>Implement Malware Classification</span>
              </li>
            </ul>
          </div>

          <div className="bg-terminal-bg rounded-lg p-6 border border-cyber-orange/20">
            <BookOpen className="w-8 h-8 text-cyber-orange mb-3" />
            <h4 className="font-semibold text-cyber-orange mb-3">Advanced Courses</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>Advanced ML for Security</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>Deep Learning in Cybersecurity</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>AI Ethics in Security</span>
              </li>
            </ul>
          </div>

          <div className="bg-terminal-bg rounded-lg p-6 border border-accent/20">
            <Target className="w-8 h-8 text-accent mb-3" />
            <h4 className="font-semibold text-accent mb-3">Certifications</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>CISSP - Certified Information Systems Security Professional</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>CEH - Certified Ethical Hacker</span>
              </li>
              <li className="flex items-center gap-2">
                <ExternalLink className="w-3 h-3" />
                <span>GCIH - GIAC Certified Incident Handler</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
          <h4 className="text-lg font-semibold text-primary mb-4">💬 Share Your Experience</h4>
          <p className="text-muted-foreground mb-4">
            Which simulation exercise did you find most valuable, and why? How will you apply these AI cybersecurity concepts in your work or studies?
          </p>
          <div className="bg-card rounded-lg p-4 border border-border">
            <p className="text-sm italic text-muted-foreground">
              "The hands-on phishing detection lab helped me understand how NLP can identify social engineering attacks in real-time. I'll definitely implement similar techniques in our email security system." - Your reflection here
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const CyberSecurityLab = () => {
  const [currentModule, setCurrentModule] = useState('welcome');

  const renderModule = () => {
    switch (currentModule) {
      case 'welcome':
        return <WelcomeModule />;
      case 'ai-concepts':
        return <AiConceptsModule />;
      case 'owasp-threats':
        return <OWASPThreatsModule />;
      case 'mini-labs':
        return <EnhancedMiniLabsModule />;
      case 'threat-intel':
        return <ThreatIntelligenceDashboard />;
      case 'interactive-sim':
        return <InteractiveSimulation />;
      case 'ai-tools':
        return <AIToolsModule />;
      case 'myths-reality':
        return <MythsRealityModule />;
      case 'quiz-challenge':
        return <QuizChallengeModule />;
      case 'roadmap':
        return <RoadmapModule />;
      default:
        return <WelcomeModule />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <CyberLabHeader />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <ModuleNavigation 
              currentModule={currentModule}
              onModuleSelect={setCurrentModule}
            />
          </div>
          
          <div className="lg:col-span-3">
            {renderModule()}
          </div>
        </div>
      </div>
    </div>
  );
};