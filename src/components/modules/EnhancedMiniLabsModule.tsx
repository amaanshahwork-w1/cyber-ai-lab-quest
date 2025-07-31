import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Mail, 
  Lock, 
  Router, 
  Activity, 
  Upload, 
  AlertTriangle, 
  CheckCircle,
  Terminal,
  Play,
  Zap,
  Eye,
  Clock,
  Database,
  Cpu,
  Network,
  FileX,
  Bug,
  Skull
} from 'lucide-react';

interface LabResult {
  status: 'safe' | 'malicious' | 'suspicious' | 'critical';
  confidence: number;
  details: string[];
  threats?: string[];
  recommendations?: string[];
  processingTime?: number;
}

interface ScanProgress {
  phase: string;
  progress: number;
  detail: string;
}

export const EnhancedMiniLabsModule = () => {
  const [currentLab, setCurrentLab] = useState<'malware' | 'phishing' | 'password' | 'firewall' | 'logs'>('malware');
  const [malwareResult, setMalwareResult] = useState<LabResult | null>(null);
  const [phishingResult, setPhishingResult] = useState<LabResult | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordResult, setPasswordResult] = useState<LabResult | null>(null);
  const [firewallRules, setFirewallRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState('');
  const [logResult, setLogResult] = useState<LabResult | null>(null);
  
  // Animation states
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState<ScanProgress | null>(null);
  const [animatedText, setAnimatedText] = useState('');

  const labs = [
    { 
      id: 'malware', 
      title: 'AI Malware Scanner', 
      icon: Shield, 
      description: 'Deep learning threat detection',
      color: 'cyber-green'
    },
    { 
      id: 'phishing', 
      title: 'Phishing Analyzer', 
      icon: Mail, 
      description: 'NLP-powered email security',
      color: 'cyber-orange'
    },
    { 
      id: 'password', 
      title: 'Smart Password Audit', 
      icon: Lock, 
      description: 'ML-based password strength',
      color: 'accent'
    },
    { 
      id: 'firewall', 
      title: 'Intelligent Firewall', 
      icon: Router, 
      description: 'Adaptive traffic filtering',
      color: 'primary'
    },
    { 
      id: 'logs', 
      title: 'Anomaly Detection', 
      icon: Activity, 
      description: 'Behavioral analysis engine',
      color: 'cyber-purple'
    },
  ];

  // Professional threat simulation with realistic data
  const simulateMalwareScan = async (filename: string) => {
    if (!filename.trim()) return; // Prevent empty analysis
    
    setIsScanning(true);
    setMalwareResult(null);
    
    const scanPhases = [
      { phase: 'Initializing', progress: 10, detail: 'Loading threat intelligence database...' },
      { phase: 'Hashing', progress: 25, detail: 'Calculating file signatures (MD5, SHA256)...' },
      { phase: 'Static Analysis', progress: 50, detail: 'Analyzing binary structure and imports...' },
      { phase: 'Behavioral Analysis', progress: 75, detail: 'Simulating runtime behavior patterns...' },
      { phase: 'ML Classification', progress: 90, detail: 'Running neural network inference...' },
      { phase: 'Complete', progress: 100, detail: 'Analysis complete' }
    ];

    for (const phase of scanPhases) {
      setScanProgress(phase);
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Advanced threat detection logic
    const malwareSignatures = ['trojan', 'virus', 'ransomware', 'keylogger', 'rootkit', 'spyware'];
    const suspiciousPatterns = ['crack', 'keygen', 'patch', 'loader', 'injector'];
    const fileExtensions = ['.exe', '.scr', '.bat', '.com', '.pif'];
    
    const threatLevel = malwareSignatures.some(sig => filename.toLowerCase().includes(sig));
    const suspicious = suspiciousPatterns.some(pattern => filename.toLowerCase().includes(pattern));
    const dangerousExt = fileExtensions.some(ext => filename.toLowerCase().endsWith(ext));

    let result: LabResult;

    if (threatLevel) {
      result = {
        status: 'critical',
        confidence: 98,
        processingTime: 2.3,
        details: [
          'CRITICAL: Known malware signature detected',
          'File entropy: 7.8/8.0 (highly packed/encrypted)',
          'Contains obfuscated assembly code',
          'Attempts privilege escalation techniques',
          'Network communication to suspicious IPs'
        ],
        threats: [
          'Data exfiltration capabilities',
          'System file modification',
          'Registry tampering',
          'Anti-virus evasion techniques'
        ],
        recommendations: [
          'Immediately quarantine file',
          'Run full system scan',
          'Check network logs for IOCs',
          'Update threat intelligence feeds'
        ]
      };
    } else if (suspicious || dangerousExt) {
      result = {
        status: 'suspicious',
        confidence: 72,
        processingTime: 1.8,
        details: [
          'Potentially unwanted program (PUP) detected',
          'Unusual compilation timestamp',
          'Contains packed/compressed sections',
          'Limited digital signature validation',
          'Atypical file metadata'
        ],
        threats: [
          'May contain adware components',
          'Possible software bundling',
          'Unverified code execution'
        ],
        recommendations: [
          'Submit to VirusTotal for verification',
          'Monitor system behavior post-execution',
          'Consider sandbox analysis'
        ]
      };
    } else {
      result = {
        status: 'safe',
        confidence: 96,
        processingTime: 1.2,
        details: [
          'Clean file - no threats detected',
          'Valid digital signature verified',
          'Normal entropy levels (4.2/8.0)',
          'Standard PE file structure',
          'No suspicious imports or exports'
        ],
        threats: [],
        recommendations: [
          'File approved for execution',
          'Maintain regular scan schedules'
        ]
      };
    }

    setMalwareResult(result);
    setIsScanning(false);
    setScanProgress(null);
  };

  const analyzeEmail = async (emailContent: string, subject: string = '') => {
    if (!emailContent.trim()) return; // Prevent empty analysis
    
    setIsScanning(true);
    setPhishingResult(null);

    const analysisPhases = [
      { phase: 'Text Processing', progress: 20, detail: 'Tokenizing email content...' },
      { phase: 'NLP Analysis', progress: 40, detail: 'Running BERT sentiment analysis...' },
      { phase: 'URL Scanning', progress: 60, detail: 'Checking links against threat feeds...' },
      { phase: 'Reputation Check', progress: 80, detail: 'Validating sender reputation...' },
      { phase: 'Classification', progress: 100, detail: 'Finalizing threat assessment...' }
    ];

    for (const phase of analysisPhases) {
      setScanProgress(phase);
      await new Promise(resolve => setTimeout(resolve, 400));
    }

    // Advanced phishing detection
    const urgencyKeywords = ['urgent', 'immediate', 'expire', 'suspend', 'verify now', 'act fast', 'limited time'];
    const phishingTriggers = ['click here', 'update payment', 'confirm identity', 'winner', 'congratulations'];
    const suspiciousUrls = ['bit.ly', 'tinyurl', 'goo.gl', 'suspicious-bank.com', 't.co'];
    
    const urgencyScore = urgencyKeywords.reduce((score, keyword) => {
      return emailContent.toLowerCase().includes(keyword) ? score + 15 : score;
    }, 0);

    const phishingScore = phishingTriggers.reduce((score, trigger) => {
      return emailContent.toLowerCase().includes(trigger) ? score + 20 : score;
    }, 0);

    const hasShorteners = suspiciousUrls.some(url => emailContent.toLowerCase().includes(url));
    const hasSuspiciousDomain = /[a-z0-9-]+\.(tk|ml|ga|cf)/.test(emailContent.toLowerCase());

    let result: LabResult;
    const totalScore = urgencyScore + phishingScore + (hasShorteners ? 30 : 0) + (hasSuspiciousDomain ? 25 : 0);

    if (totalScore >= 50 || hasShorteners) {
      result = {
        status: 'critical',
        confidence: 91,
        processingTime: 1.6,
        details: [
          'HIGH RISK: Multiple phishing indicators detected',
          'Suspicious URL shorteners present',
          'Urgent language patterns identified',
          'Sender domain reputation: POOR',
          'Grammar/spelling inconsistencies found'
        ],
        threats: [
          'Credential harvesting attempt',
          'Malicious link redirection',
          'Social engineering tactics',
          'Identity theft risk'
        ],
        recommendations: [
          'DO NOT click any links',
          'Report to security team',
          'Block sender domain',
          'Educate users on phishing tactics'
        ]
      };
    } else if (totalScore >= 25) {
      result = {
        status: 'suspicious',
        confidence: 68,
        processingTime: 1.3,
        details: [
          'Potentially suspicious email detected',
          'Some urgency language present',
          'Sender authentication partially valid',
          'Links require manual verification',
          'Unusual sending patterns'
        ],
        threats: [
          'Possible spear phishing',
          'Social engineering attempt'
        ],
        recommendations: [
          'Verify sender through alternate channel',
          'Inspect URLs before clicking',
          'Exercise caution with attachments'
        ]
      };
    } else {
      result = {
        status: 'safe',
        confidence: 94,
        processingTime: 0.9,
        details: [
          'Legitimate email - low risk assessment',
          'Professional tone and grammar',
          'Verified sender domain (SPF/DKIM)',
          'No suspicious URL patterns',
          'Normal email flow patterns'
        ],
        threats: [],
        recommendations: [
          'Email approved for normal processing',
          'Continue monitoring for anomalies'
        ]
      };
    }

    setPhishingResult(result);
    setIsScanning(false);
    setScanProgress(null);
  };

  const analyzePassword = async (password: string) => {
    if (!password.trim()) return; // Prevent empty analysis
    
    setIsScanning(true);
    setPasswordResult(null);

    const analysisPhases = [
      { phase: 'Entropy Analysis', progress: 25, detail: 'Calculating password entropy...' },
      { phase: 'Dictionary Check', progress: 50, detail: 'Checking against common passwords...' },
      { phase: 'Pattern Analysis', progress: 75, detail: 'Analyzing character patterns...' },
      { phase: 'Risk Assessment', progress: 100, detail: 'Generating security score...' }
    ];

    for (const phase of analysisPhases) {
      setScanProgress(phase);
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    let score = 0;
    const details: string[] = [];
    const threats: string[] = [];
    const recommendations: string[] = [];

    // Length analysis
    if (password.length >= 16) {
      score += 30;
      details.push('✓ Excellent length (16+ characters)');
    } else if (password.length >= 12) {
      score += 25;
      details.push('✓ Good length (12+ characters)');
    } else if (password.length >= 8) {
      score += 15;
      details.push('○ Minimum length met (8+ characters)');
    } else {
      score -= 20;
      details.push('✗ Too short (minimum 8 characters required)');
      threats.push('Vulnerable to brute force attacks');
    }

    // Character complexity
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    if (hasUpper) {
      score += 10;
      details.push('✓ Contains uppercase letters');
    } else {
      details.push('✗ Missing uppercase letters');
      recommendations.push('Add uppercase letters (A-Z)');
    }

    if (hasLower) {
      score += 10;
      details.push('✓ Contains lowercase letters');
    } else {
      details.push('✗ Missing lowercase letters');
      recommendations.push('Add lowercase letters (a-z)');
    }

    if (hasNumbers) {
      score += 10;
      details.push('✓ Contains numbers');
    } else {
      details.push('✗ Missing numbers');
      recommendations.push('Add numbers (0-9)');
    }

    if (hasSpecial) {
      score += 15;
      details.push('✓ Contains special characters');
    } else {
      details.push('✗ Missing special characters');
      recommendations.push('Add special characters (!@#$%^&*)');
    }

    // Pattern analysis
    const commonPatterns = ['123', 'abc', 'qwerty', 'password', 'admin', '000'];
    const hasCommonPattern = commonPatterns.some(pattern => 
      password.toLowerCase().includes(pattern)
    );

    if (hasCommonPattern) {
      score -= 25;
      details.push('✗ Contains common patterns');
      threats.push('Susceptible to dictionary attacks');
    }

    // Repetition analysis
    const hasRepetition = /(.)\1{2,}/.test(password);
    if (hasRepetition) {
      score -= 15;
      details.push('✗ Contains character repetition');
      threats.push('Predictable character sequences');
    }

    let result: LabResult;
    if (score >= 80) {
      result = {
        status: 'safe',
        confidence: Math.min(score, 100),
        processingTime: 0.7,
        details,
        threats,
        recommendations: recommendations.length > 0 ? recommendations : ['Password meets security requirements']
      };
    } else if (score >= 50) {
      result = {
        status: 'suspicious',
        confidence: score,
        processingTime: 0.8,
        details,
        threats,
        recommendations
      };
    } else {
      result = {
        status: 'critical',
        confidence: Math.max(score, 10),
        processingTime: 0.9,
        details,
        threats: [...threats, 'High risk of compromise', 'Easy target for attackers'],
        recommendations: [...recommendations, 'Use a password manager', 'Enable 2FA immediately']
      };
    }

    setPasswordResult(result);
    setIsScanning(false);
    setScanProgress(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-cyber-green" />;
      case 'suspicious': return <AlertTriangle className="w-5 h-5 text-cyber-orange" />;
      case 'malicious': return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case 'critical': return <Skull className="w-5 h-5 text-destructive animate-pulse" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-cyber-green';
      case 'suspicious': return 'text-cyber-orange';
      case 'malicious': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-cyber-green/10 border-cyber-green/50';
      case 'suspicious': return 'bg-cyber-orange/10 border-cyber-orange/50';
      case 'malicious': return 'bg-destructive/10 border-destructive/50';
      case 'critical': return 'bg-destructive/20 border-destructive/70';
      default: return 'bg-muted/10 border-muted/50';
    }
  };

  // Real-time threat data simulation
  const threatIntelligence = {
    malwareDetected: '2,847',
    phishingBlocked: '1,293',
    anomaliesFound: '47',
    lastUpdate: '2 minutes ago'
  };

  return (
    <div className="space-y-8">
      {/* Threat Intelligence Dashboard */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan matrix-bg">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-cyber rounded-lg animate-float">
              <Terminal className="w-6 h-6 text-black" />
            </div>
            Enterprise Security Operations Center 🔒
          </CardTitle>
          <p className="text-muted-foreground">
            Advanced AI-powered threat detection and response platform
          </p>
        </CardHeader>
        <CardContent>
          {/* Real-time stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-terminal-bg p-4 rounded-lg border border-cyber-green/20 hover-lift">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-cyber-green" />
                <div>
                  <div className="text-2xl font-bold text-cyber-green">{threatIntelligence.malwareDetected}</div>
                  <div className="text-sm text-muted-foreground">Threats Blocked Today</div>
                </div>
              </div>
            </div>
            <div className="bg-terminal-bg p-4 rounded-lg border border-cyber-orange/20 hover-lift">
              <div className="flex items-center gap-3">
                <Mail className="w-8 h-8 text-cyber-orange" />
                <div>
                  <div className="text-2xl font-bold text-cyber-orange">{threatIntelligence.phishingBlocked}</div>
                  <div className="text-sm text-muted-foreground">Phishing Attempts</div>
                </div>
              </div>
            </div>
            <div className="bg-terminal-bg p-4 rounded-lg border border-accent/20 hover-lift">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8 text-accent" />
                <div>
                  <div className="text-2xl font-bold text-accent">{threatIntelligence.anomaliesFound}</div>
                  <div className="text-sm text-muted-foreground">Anomalies Detected</div>
                </div>
              </div>
            </div>
            <div className="bg-terminal-bg p-4 rounded-lg border border-primary/20 hover-lift">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-sm font-bold text-primary">{threatIntelligence.lastUpdate}</div>
                  <div className="text-sm text-muted-foreground">Last Intel Update</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lab Selection */}
          <div className="grid md:grid-cols-5 gap-3 mb-8">
            {labs.map((lab) => (
              <Button
                key={lab.id}
                variant={currentLab === lab.id ? 'default' : 'outline'}
                className={`h-auto p-4 flex flex-col gap-2 interactive-card ${
                  currentLab === lab.id ? 'bg-gradient-cyber text-black animate-scale-up' : ''
                }`}
                onClick={() => setCurrentLab(lab.id as any)}
              >
                <lab.icon className="w-6 h-6" />
                <div className="text-center">
                  <div className="font-semibold text-sm">{lab.title}</div>
                  <div className="text-xs opacity-60">{lab.description}</div>
                </div>
              </Button>
            ))}
          </div>

          {/* Scanning Progress Overlay */}
          {isScanning && scanProgress && (
            <div className="mb-6 bg-terminal-bg rounded-lg p-6 border border-primary/20 animate-slide-up">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-cyber rounded-full flex items-center justify-center animate-spin">
                  <Cpu className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">AI Analysis in Progress</h3>
                  <p className="text-sm text-muted-foreground">{scanProgress.detail}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{scanProgress.phase}</span>
                  <span>{scanProgress.progress}%</span>
                </div>
                <Progress value={scanProgress.progress} className="h-2 scan-line" />
              </div>
            </div>
          )}

          {/* Malware Scanner Lab */}
          {currentLab === 'malware' && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Enterprise Malware Detection Engine
                </h3>
                <p className="text-muted-foreground mb-6">
                  Advanced AI-powered malware analysis using deep learning, behavioral analysis, and threat intelligence.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      Sample Files for Analysis:
                    </h4>
                    <div className="space-y-2">
                      {[
                        { name: 'quarterly_report.pdf', threat: false, description: 'Legitimate document' },
                        { name: 'invoice_trojan.exe', threat: true, description: 'Banking trojan sample' },
                        { name: 'system_update.dll', threat: false, description: 'System library file' },
                        { name: 'ransomware_payload.bin', threat: true, description: 'Encrypted ransomware' },
                        { name: 'vacation_photos.zip', threat: false, description: 'Personal archive' },
                        { name: 'keylogger_stealer.scr', threat: true, description: 'Information stealer' }
                      ].map((file) => (
                        <button
                          key={file.name}
                          onClick={() => simulateMalwareScan(file.name)}
                          disabled={isScanning}
                          className="w-full text-left p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 interactive-card"
                        >
                          <div className="flex items-center gap-3">
                            {file.threat ? (
                              <Bug className="w-4 h-4 text-destructive" />
                            ) : (
                              <FileX className="w-4 h-4 text-cyber-green" />
                            )}
                            <div className="flex-1">
                              <div className="font-mono text-sm font-semibold">{file.name}</div>
                              <div className="text-xs text-muted-foreground">{file.description}</div>
                            </div>
                            <Upload className="w-4 h-4 text-muted-foreground" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {malwareResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(malwareResult.status)} animate-scale-up`}>
                      <div className="flex items-center gap-2 mb-3">
                        {getStatusIcon(malwareResult.status)}
                        <span className={`font-semibold ${getStatusColor(malwareResult.status)}`}>
                          {malwareResult.status === 'critical' ? 'CRITICAL THREAT' :
                           malwareResult.status === 'malicious' ? 'MALWARE DETECTED' :
                           malwareResult.status === 'suspicious' ? 'SUSPICIOUS FILE' : 'CLEAN FILE'}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {malwareResult.confidence}% confidence
                        </Badge>
                      </div>
                      
                      {malwareResult.processingTime && (
                        <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Analysis completed in {malwareResult.processingTime}s
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold mb-1">Detection Details:</h5>
                          <div className="space-y-1">
                            {malwareResult.details.map((detail, index) => (
                              <div key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></div>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {malwareResult.threats && malwareResult.threats.length > 0 && (
                          <div>
                            <h5 className="text-sm font-semibold mb-1 text-destructive">Identified Threats:</h5>
                            <div className="space-y-1">
                              {malwareResult.threats.map((threat, index) => (
                                <div key={index} className="text-sm flex items-start gap-2 text-destructive">
                                  <AlertTriangle className="w-3 h-3 mt-1 flex-shrink-0" />
                                  <span>{threat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {malwareResult.recommendations && (
                          <div>
                            <h5 className="text-sm font-semibold mb-1">Recommendations:</h5>
                            <div className="space-y-1">
                              {malwareResult.recommendations.map((rec, index) => (
                                <div key={index} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0 text-cyber-green" />
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-black/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-cyber-green mb-2 flex items-center gap-2">
                    <Network className="w-4 h-4" />
                    AI Detection Pipeline:
                  </h4>
                  <pre className="text-xs text-cyber-green typing-indicator">
{`# Enterprise Malware Detection Architecture
import tensorflow as tf
from sklearn.ensemble import IsolationForest

# Multi-stage analysis pipeline
stages = {
    'static_analysis': CNNModel(input_shape=(2048,)),
    'dynamic_behavior': LSTMModel(sequence_length=100),
    'threat_intelligence': ThreatDBLookup(),
    'ensemble_classifier': XGBoostClassifier()
}

# Feature extraction
features = {
    'file_entropy': calculate_entropy(binary_data),
    'pe_imports': extract_imports(pe_file),
    'opcodes': disassemble_to_opcodes(binary_data),
    'network_behavior': monitor_network_activity(),
    'file_operations': track_file_modifications()
}

# Classification with confidence scoring
threat_score = ensemble_predict(features)
confidence = calculate_uncertainty(prediction_variance)

if threat_score > 0.95:
    return "CRITICAL_THREAT", confidence
elif threat_score > 0.7:
    return "SUSPICIOUS", confidence
else:
    return "CLEAN", confidence`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Phishing Detection Lab */}
          {currentLab === 'phishing' && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Advanced Phishing Detection System
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Email Samples for Analysis:</h4>
                    <div className="space-y-3">
                      {[
                        {
                          subject: "🚨 URGENT: Your account will be suspended in 24 hours!",
                          content: "Dear valued customer, We detected suspicious activity on your account. Click here immediately to verify: bit.ly/verify-account-now or your account will be permanently suspended. Act fast!",
                          risk: 'high'
                        },
                        {
                          subject: "Team Meeting Tomorrow - Project Alpha",
                          content: "Hi everyone, Just a reminder about our project meeting tomorrow at 2 PM in conference room B. Please bring your latest reports. Thanks, Sarah (Project Manager)",
                          risk: 'low'
                        },
                        {
                          subject: "🎉 Congratulations! You've won $50,000!",
                          content: "WINNER NOTIFICATION: You have been selected as our grand prize winner! Claim your $50,000 prize money now by clicking: suspicious-lottery.com/claim. Limited time offer!",
                          risk: 'critical'
                        },
                        {
                          subject: "Password Reset Request",
                          content: "A password reset was requested for your account. If this wasn't you, please ignore this email. To reset your password, click here: secure-portal.company.com/reset",
                          risk: 'medium'
                        }
                      ].map((email, index) => (
                        <button
                          key={index}
                          onClick={() => analyzeEmail(email.content, email.subject)}
                          disabled={isScanning}
                          className="w-full text-left p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors interactive-card"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                email.risk === 'critical' ? 'bg-destructive animate-pulse' :
                                email.risk === 'high' ? 'bg-cyber-orange' :
                                email.risk === 'medium' ? 'bg-cyber-purple' : 'bg-cyber-green'
                              }`}></div>
                              <div className="font-semibold text-sm">{email.subject}</div>
                            </div>
                            <div className="text-xs text-muted-foreground line-clamp-3">{email.content}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {phishingResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(phishingResult.status)} animate-scale-up`}>
                      <div className="flex items-center gap-2 mb-3">
                        {getStatusIcon(phishingResult.status)}
                        <span className={`font-semibold ${getStatusColor(phishingResult.status)}`}>
                          {phishingResult.status === 'critical' ? 'PHISHING ATTACK' :
                           phishingResult.status === 'suspicious' ? 'SUSPICIOUS EMAIL' : 'LEGITIMATE EMAIL'}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {phishingResult.confidence}% confidence
                        </Badge>
                      </div>
                      
                      {phishingResult.processingTime && (
                        <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          NLP analysis completed in {phishingResult.processingTime}s
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold mb-1">Analysis Results:</h5>
                          <div className="space-y-1">
                            {phishingResult.details.map((detail, index) => (
                              <div key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1 h-1 bg-current rounded-full mt-2 flex-shrink-0"></div>
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {phishingResult.threats && phishingResult.threats.length > 0 && (
                          <div>
                            <h5 className="text-sm font-semibold mb-1 text-destructive">Security Risks:</h5>
                            <div className="space-y-1">
                              {phishingResult.threats.map((threat, index) => (
                                <div key={index} className="text-sm flex items-start gap-2 text-destructive">
                                  <AlertTriangle className="w-3 h-3 mt-1 flex-shrink-0" />
                                  <span>{threat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {phishingResult.recommendations && (
                          <div>
                            <h5 className="text-sm font-semibold mb-1">Action Items:</h5>
                            <div className="space-y-1">
                              {phishingResult.recommendations.map((rec, index) => (
                                <div key={index} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0 text-cyber-green" />
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Password Analysis Lab */}
          {currentLab === 'password' && (
            <div className="space-y-6 animate-slide-up">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  AI-Powered Password Security Audit
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Password Strength Analysis:</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Enter Password for Analysis:</label>
                        <Input
                          type="password"
                          placeholder="Type or paste password to analyze..."
                          value={passwordInput}
                          onChange={(e) => setPasswordInput(e.target.value)}
                          className="bg-card border-border font-mono"
                        />
                        <Button
                          onClick={() => analyzePassword(passwordInput)}
                          disabled={!passwordInput || isScanning}
                          className="w-full bg-gradient-cyber text-black hover:opacity-90"
                        >
                          <Zap className="w-4 h-4 mr-2" />
                          Analyze Password Security
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-muted-foreground">Security Test Cases:</h5>
                        {[
                          { pwd: 'password123', desc: 'Common weak password', risk: 'high' },
                          { pwd: 'MyComplex@Password2024!', desc: 'Strong enterprise password', risk: 'low' },
                          { pwd: '12345678', desc: 'Sequential numbers', risk: 'critical' },
                          { pwd: 'Tr0ub4dor&3', desc: 'Complex but predictable', risk: 'medium' },
                          { pwd: 'iLove2Code@Night!2024', desc: 'Excellent passphrase', risk: 'low' }
                        ].map((test, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setPasswordInput(test.pwd);
                              analyzePassword(test.pwd);
                            }}
                            className="block w-full text-left p-2 bg-card border border-border rounded text-sm hover:border-primary/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                test.risk === 'critical' ? 'bg-destructive animate-pulse' :
                                test.risk === 'high' ? 'bg-cyber-orange' :
                                test.risk === 'medium' ? 'bg-cyber-purple' : 'bg-cyber-green'
                              }`}></div>
                              <div>
                                <span className="font-mono font-semibold">{test.pwd}</span>
                                <div className="text-xs text-muted-foreground">{test.desc}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {passwordResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(passwordResult.status)} animate-scale-up`}>
                      <div className="flex items-center gap-2 mb-3">
                        {getStatusIcon(passwordResult.status)}
                        <span className={`font-semibold ${getStatusColor(passwordResult.status)}`}>
                          {passwordResult.status === 'critical' ? 'CRITICAL: Very Weak' :
                           passwordResult.status === 'suspicious' ? 'WARNING: Weak Password' : 
                           'SECURE: Strong Password'}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          Score: {passwordResult.confidence}/100
                        </Badge>
                      </div>
                      
                      {passwordResult.processingTime && (
                        <div className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Security analysis completed in {passwordResult.processingTime}s
                        </div>
                      )}

                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-semibold mb-1">Security Assessment:</h5>
                          <div className="space-y-1">
                            {passwordResult.details.map((detail, index) => (
                              <div key={index} className="text-sm flex items-start gap-2">
                                <span>{detail}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {passwordResult.threats && passwordResult.threats.length > 0 && (
                          <div>
                            <h5 className="text-sm font-semibold mb-1 text-destructive">Security Vulnerabilities:</h5>
                            <div className="space-y-1">
                              {passwordResult.threats.map((threat, index) => (
                                <div key={index} className="text-sm flex items-start gap-2 text-destructive">
                                  <AlertTriangle className="w-3 h-3 mt-1 flex-shrink-0" />
                                  <span>{threat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {passwordResult.recommendations && (
                          <div>
                            <h5 className="text-sm font-semibold mb-1">Security Recommendations:</h5>
                            <div className="space-y-1">
                              {passwordResult.recommendations.map((rec, index) => (
                                <div key={index} className="text-sm flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 mt-1 flex-shrink-0 text-cyber-green" />
                                  <span>{rec}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-black/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-cyber-green mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Password Security Algorithm:
                  </h4>
                  <pre className="text-xs text-cyber-green">
{`# Advanced Password Security Analysis
import math
import re
from zxcvbn import zxcvbn

def analyze_password_security(password):
    score = 0
    threats = []
    recommendations = []
    
    # Entropy calculation
    charset_size = calculate_charset(password)
    entropy = len(password) * math.log2(charset_size)
    
    # Pattern analysis using regex
    patterns = {
        'sequential': r'(abc|123|qwerty)',
        'repetition': r'(.)\\1{2,}',
        'common_words': load_common_passwords(),
        'dictionary': check_dictionary_words(password)
    }
    
    # ML-based strength prediction
    features = extract_features(password)
    strength_score = ml_model.predict([features])
    
    # Time-to-crack estimation
    crack_time = estimate_crack_time(entropy, charset_size)
    
    return {
        'entropy': entropy,
        'strength_score': strength_score,
        'crack_time': crack_time,
        'threats': threats,
        'recommendations': recommendations
    }`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};