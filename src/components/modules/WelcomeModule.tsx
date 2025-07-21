import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Play, Target, Zap, Shield } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const warmupQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the primary role of AI in cybersecurity?',
    options: [
      'Replace all human security analysts',
      'Augment human capabilities with automated threat detection',
      'Only scan for viruses',
      'Create more security vulnerabilities'
    ],
    correct: 1,
    explanation: 'AI augments human capabilities by automating pattern recognition and threat detection, but cannot replace human judgment and creativity in security analysis.'
  },
  {
    id: 'q2',
    question: 'Which AI technique is most commonly used for detecting anomalies in network traffic?',
    options: [
      'Supervised Learning only',
      'Natural Language Processing',
      'Unsupervised Learning (like clustering)',
      'Computer Vision'
    ],
    correct: 2,
    explanation: 'Unsupervised learning excels at detecting anomalies because it can identify patterns that deviate from normal behavior without needing labeled examples of every possible attack.'
  },
  {
    id: 'q3',
    question: 'What makes AI particularly effective against zero-day attacks?',
    options: [
      'It knows all possible attack signatures',
      'It can identify suspicious behavior patterns even for unknown threats',
      'It prevents all attacks automatically',
      'It only works on known threats'
    ],
    correct: 1,
    explanation: 'AI can detect zero-day attacks by identifying unusual behavior patterns and anomalies, even when the specific attack signature is unknown.'
  }
];

export const WelcomeModule = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === warmupQuiz[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < warmupQuiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const currentQ = warmupQuiz[currentQuestion];

  return (
    <div className="space-y-8">
      {/* Animated Introduction */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-cyber rounded-lg">
              <Play className="w-6 h-6 text-black" />
            </div>
            Welcome to the AI Cybersecurity Lab! 🚀
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-terminal-bg rounded-lg border border-cyber-green/20">
              <Target className="w-8 h-8 text-cyber-green mx-auto mb-2" />
              <h3 className="font-semibold text-cyber-green">Hands-On Learning</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Interactive simulations and real-world scenarios
              </p>
            </div>
            <div className="text-center p-4 bg-terminal-bg rounded-lg border border-cyber-orange/20">
              <Zap className="w-8 h-8 text-cyber-orange mx-auto mb-2" />
              <h3 className="font-semibold text-cyber-orange">AI-Powered</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Learn cutting-edge AI techniques for threat detection
              </p>
            </div>
            <div className="text-center p-4 bg-terminal-bg rounded-lg border border-accent/20">
              <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold text-accent">Industry-Ready</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Skills used by top cybersecurity professionals
              </p>
            </div>
          </div>

          <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
            <h3 className="text-xl font-semibold text-primary mb-4">Your Learning Journey:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-cyber-pulse"></div>
                  <span>Master AI threat detection fundamentals</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-orange rounded-full animate-cyber-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <span>Simulate malware detection systems</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full animate-cyber-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span>Build phishing email classifiers</span>
                </li>
              </ul>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full animate-cyber-pulse" style={{ animationDelay: '0.6s' }}></div>
                  <span>Configure smart firewall rules</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-green rounded-full animate-cyber-pulse" style={{ animationDelay: '0.8s' }}></div>
                  <span>Analyze network anomalies</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyber-orange rounded-full animate-cyber-pulse" style={{ animationDelay: '1s' }}></div>
                  <span>Map OWASP threats to AI solutions</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Quiz */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow-purple">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-3 bg-accent/20 rounded-lg">
              <Target className="w-6 h-6 text-accent" />
            </div>
            Quick Knowledge Check
          </CardTitle>
          <p className="text-muted-foreground">
            Let's see what you already know! Don't worry - these are just warm-up questions.
          </p>
        </CardHeader>
        <CardContent>
          {!quizCompleted ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestion + 1} of {warmupQuiz.length}
                </span>
                <div className="flex gap-1">
                  {warmupQuiz.map((_, index) => (
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

              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-lg font-semibold mb-4">{currentQ.question}</h3>
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
                }`}>
                  <p className="font-semibold mb-2">
                    {selectedAnswer === currentQ.correct ? '✅ Correct!' : '❌ Not quite right.'}
                  </p>
                  <p className="text-sm">{currentQ.explanation}</p>
                </div>
              )}

              {showFeedback && (
                <div className="flex justify-center">
                  <Button onClick={nextQuestion} className="bg-gradient-cyber text-black hover:opacity-90">
                    {currentQuestion < warmupQuiz.length - 1 ? 'Next Question' : 'See Results'}
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-8 bg-gradient-cyber rounded-lg text-black">
                <h3 className="text-2xl font-bold mb-2">Quiz Complete! 🎉</h3>
                <p className="text-lg">You scored {score} out of {warmupQuiz.length}</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-terminal-bg p-4 rounded-lg border border-cyber-green/20">
                  <h4 className="font-semibold text-cyber-green mb-2">Excellent (3/3)</h4>
                  <p className="text-sm text-muted-foreground">You're ready to dive deep into AI cybersecurity!</p>
                </div>
                <div className="bg-terminal-bg p-4 rounded-lg border border-cyber-orange/20">
                  <h4 className="font-semibold text-cyber-orange mb-2">Good (2/3)</h4>
                  <p className="text-sm text-muted-foreground">You have a solid foundation to build upon.</p>
                </div>
                <div className="bg-terminal-bg p-4 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-accent mb-2">Learning (0-1/3)</h4>
                  <p className="text-sm text-muted-foreground">Perfect! You'll learn everything you need here.</p>
                </div>
              </div>

              <p className="text-center text-muted-foreground">
                Ready to start your AI cybersecurity journey? Let's move to the core concepts!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};