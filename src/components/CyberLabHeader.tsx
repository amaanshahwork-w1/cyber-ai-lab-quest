import React from 'react';
import { Shield, Brain, AlertTriangle } from 'lucide-react';
import heroImage from '@/assets/hero-cybersecurity.jpg';

export const CyberLabHeader = () => {
  return (
    <div className="relative min-h-screen bg-gradient-terminal overflow-hidden">
      {/* Matrix rain background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="animate-matrix-rain text-primary font-mono text-xs leading-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute whitespace-nowrap"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              01010101010101010101010101010101010101010101010101
            </div>
          ))}
        </div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-gradient-cyber px-4 py-2 rounded-full text-black font-semibold animate-cyber-pulse">
              <Shield className="w-5 h-5" />
              AI Cybersecurity Lab
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-primary animate-float font-cyber drop-shadow-2xl">
              🔐 C.R.A.F.T.
            </h1>
            
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-cyber">
              Cybersecurity <span className="text-cyber-green animate-glow">AI</span> Training
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl">
              Master AI-powered threat detection through hands-on simulations. 
              From malware analysis to firewall logic - learn by doing in our 
              interactive cybersecurity playground.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-cyber-green">
                <Brain className="w-5 h-5" />
                <span>AI-Powered Learning</span>
              </div>
              <div className="flex items-center gap-2 text-cyber-orange">
                <AlertTriangle className="w-5 h-5" />
                <span>Real-World Scenarios</span>
              </div>
            </div>

            <div className="bg-card border border-primary/20 rounded-lg p-6 shadow-glow-cyan">
              <h3 className="text-lg font-semibold mb-3 text-primary">What You'll Master:</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyber-green rounded-full"></span>
                  Malware Detection with Machine Learning
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyber-orange rounded-full"></span>
                  Phishing Email Classification
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  OWASP Threat Prevention
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Log Anomaly Detection
                </li>
              </ul>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cyber rounded-lg blur-xl opacity-30 animate-cyber-pulse"></div>
            <img
              src={heroImage}
              alt="Cybersecurity Command Center"
              className="relative rounded-lg shadow-cyber w-full h-auto animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};