import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
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
  Zap
} from 'lucide-react';

interface LabResult {
  status: 'safe' | 'malicious' | 'suspicious';
  confidence: number;
  details: string[];
}

export const MiniLabsModule = () => {
  const [currentLab, setCurrentLab] = useState<'malware' | 'phishing' | 'password' | 'firewall' | 'logs'>('malware');
  const [malwareResult, setMalwareResult] = useState<LabResult | null>(null);
  const [phishingResult, setPhishingResult] = useState<LabResult | null>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordResult, setPasswordResult] = useState<LabResult | null>(null);
  const [firewallRules, setFirewallRules] = useState<string[]>([]);
  const [newRule, setNewRule] = useState('');
  const [logResult, setLogResult] = useState<LabResult | null>(null);

  const labs = [
    { id: 'malware', title: 'Malware Scanner', icon: Shield, description: 'Detect malicious files using AI' },
    { id: 'phishing', title: 'Phishing Detector', icon: Mail, description: 'Classify suspicious emails' },
    { id: 'password', title: 'Password Analyzer', icon: Lock, description: 'Check password strength with ML' },
    { id: 'firewall', title: 'Smart Firewall', icon: Router, description: 'Configure intelligent rules' },
    { id: 'logs', title: 'Log Anomaly', icon: Activity, description: 'Detect unusual system activity' },
  ];

  const simulateMalwareScan = (filename: string) => {
    const maliciousIndicators = ['virus', 'trojan', 'malware', 'hack', 'exploit', '.exe'];
    const suspiciousIndicators = ['temp', 'hidden', 'system32'];
    
    const isMalicious = maliciousIndicators.some(indicator => 
      filename.toLowerCase().includes(indicator)
    );
    const isSuspicious = suspiciousIndicators.some(indicator => 
      filename.toLowerCase().includes(indicator)
    );

    if (isMalicious) {
      setMalwareResult({
        status: 'malicious',
        confidence: 95,
        details: [
          'Suspicious filename pattern detected',
          'Matches known malware signatures',
          'High entropy in binary structure',
          'Attempts to modify system files'
        ]
      });
    } else if (isSuspicious) {
      setMalwareResult({
        status: 'suspicious',
        confidence: 60,
        details: [
          'Located in unusual directory',
          'Uncommon file extension',
          'Recent creation date',
          'Requires further analysis'
        ]
      });
    } else {
      setMalwareResult({
        status: 'safe',
        confidence: 98,
        details: [
          'Clean file signature',
          'No malicious patterns found',
          'Normal file behavior',
          'Safe to execute'
        ]
      });
    }
  };

  const analyzeEmail = (email: string) => {
    const phishingIndicators = [
      'urgent', 'click now', 'verify account', 'suspended', 'winner',
      'congratulations', 'claim now', 'limited time', 'act fast'
    ];
    
    const suspiciousUrls = ['bit.ly', 'tinyurl', 'suspicious-bank.com'];
    
    const phishingScore = phishingIndicators.reduce((score, indicator) => {
      return email.toLowerCase().includes(indicator) ? score + 20 : score;
    }, 0);

    const hasUrlShortener = suspiciousUrls.some(url => 
      email.toLowerCase().includes(url)
    );

    if (phishingScore >= 40 || hasUrlShortener) {
      setPhishingResult({
        status: 'malicious',
        confidence: 88,
        details: [
          'Multiple urgency keywords detected',
          'Suspicious URL shorteners found',
          'Grammar inconsistencies',
          'Sender domain mismatch'
        ]
      });
    } else if (phishingScore >= 20) {
      setPhishingResult({
        status: 'suspicious',
        confidence: 65,
        details: [
          'Some urgency language detected',
          'Unusual sender patterns',
          'Links require verification',
          'Proceed with caution'
        ]
      });
    } else {
      setPhishingResult({
        status: 'safe',
        confidence: 92,
        details: [
          'Professional language tone',
          'Legitimate sender domain',
          'No suspicious patterns',
          'Safe to interact with'
        ]
      });
    }
  };

  const analyzePassword = (password: string) => {
    let score = 0;
    const details = [];

    if (password.length >= 12) {
      score += 25;
      details.push('✓ Good length (12+ characters)');
    } else if (password.length >= 8) {
      score += 15;
      details.push('○ Acceptable length (8+ characters)');
    } else {
      details.push('✗ Too short (minimum 8 characters)');
    }

    if (/[A-Z]/.test(password)) {
      score += 15;
      details.push('✓ Contains uppercase letters');
    } else {
      details.push('✗ Missing uppercase letters');
    }

    if (/[a-z]/.test(password)) {
      score += 15;
      details.push('✓ Contains lowercase letters');
    } else {
      details.push('✗ Missing lowercase letters');
    }

    if (/[0-9]/.test(password)) {
      score += 15;
      details.push('✓ Contains numbers');
    } else {
      details.push('✗ Missing numbers');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 20;
      details.push('✓ Contains special characters');
    } else {
      details.push('✗ Missing special characters');
    }

    const commonPasswords = ['password', '123456', 'qwerty', 'admin'];
    if (commonPasswords.some(common => password.toLowerCase().includes(common))) {
      score -= 30;
      details.push('✗ Contains common password patterns');
    }

    if (score >= 70) {
      setPasswordResult({
        status: 'safe',
        confidence: score,
        details
      });
    } else if (score >= 40) {
      setPasswordResult({
        status: 'suspicious',
        confidence: score,
        details
      });
    } else {
      setPasswordResult({
        status: 'malicious',
        confidence: score,
        details
      });
    }
  };

  const addFirewallRule = () => {
    if (newRule.trim()) {
      setFirewallRules([...firewallRules, newRule.trim()]);
      setNewRule('');
    }
  };

  const analyzeSystemLogs = () => {
    setLogResult({
      status: 'suspicious',
      confidence: 78,
      details: [
        'Unusual login attempt from IP 192.168.1.100',
        'Multiple failed authentication events',
        'Abnormal file access patterns detected',
        'Recommend immediate investigation'
      ]
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'text-cyber-green';
      case 'suspicious': return 'text-cyber-orange';
      case 'malicious': return 'text-destructive';
      default: return 'text-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'safe': return 'bg-cyber-green/10 border-cyber-green/50';
      case 'suspicious': return 'bg-cyber-orange/10 border-cyber-orange/50';
      case 'malicious': return 'bg-destructive/10 border-destructive/50';
      default: return 'bg-muted/10 border-muted/50';
    }
  };

  return (
    <div className="space-y-8">
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <div className="p-3 bg-gradient-cyber rounded-lg">
              <Terminal className="w-6 h-6 text-black" />
            </div>
            Hands-On Security Labs 🧪
          </CardTitle>
          <p className="text-muted-foreground">
            Practice with real AI security tools in simulated environments
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-2 mb-8">
            {labs.map((lab) => (
              <Button
                key={lab.id}
                variant={currentLab === lab.id ? 'default' : 'outline'}
                className={`h-auto p-4 flex flex-col gap-2 ${
                  currentLab === lab.id ? 'bg-gradient-cyber text-black' : ''
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

          {/* Malware Scanner Lab */}
          {currentLab === 'malware' && (
            <div className="space-y-6">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  AI Malware Detection Scanner
                </h3>
                <p className="text-muted-foreground mb-6">
                  Upload a file to analyze using our machine learning-powered malware detection system.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Test Files:</h4>
                    <div className="space-y-2">
                      {[
                        'document.pdf',
                        'trojan_horse.exe',
                        'system_file.dll',
                        'virus_sample.bin',
                        'safe_image.jpg'
                      ].map((filename) => (
                        <button
                          key={filename}
                          onClick={() => simulateMalwareScan(filename)}
                          className="w-full text-left p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <span className="font-mono text-sm">{filename}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {malwareResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(malwareResult.status)}`}>
                      <div className="flex items-center gap-2 mb-3">
                        {malwareResult.status === 'safe' && <CheckCircle className="w-5 h-5 text-cyber-green" />}
                        {malwareResult.status === 'suspicious' && <AlertTriangle className="w-5 h-5 text-cyber-orange" />}
                        {malwareResult.status === 'malicious' && <AlertTriangle className="w-5 h-5 text-destructive" />}
                        <span className={`font-semibold ${getStatusColor(malwareResult.status)}`}>
                          {malwareResult.status.toUpperCase()}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {malwareResult.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {malwareResult.details.map((detail, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-black/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-cyber-green mb-2">🔍 Detection Algorithm:</h4>
                  <pre className="text-xs text-cyber-green">
{`# Simplified malware detection logic
features = extract_features(file)
prediction = model.predict([
  file.entropy,           # Randomness of file content
  file.size,             # File size analysis
  file.extension,        # File type validation
  behavioral_patterns    # Runtime behavior analysis
])

if prediction > 0.8:
    return "MALICIOUS"
elif prediction > 0.5:
    return "SUSPICIOUS"  
else:
    return "SAFE"`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* Phishing Detection Lab */}
          {currentLab === 'phishing' && (
            <div className="space-y-6">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Phishing Email Classifier
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Sample Emails to Analyze:</h4>
                    <div className="space-y-3">
                      {[
                        {
                          subject: "URGENT: Verify your account now!",
                          content: "Your account will be suspended! Click here to verify: bit.ly/verify-now"
                        },
                        {
                          subject: "Meeting reminder - Tomorrow 2 PM",
                          content: "Hi team, don't forget about our project meeting tomorrow at 2 PM in conference room A."
                        },
                        {
                          subject: "Congratulations! You've won $1000!",
                          content: "Claim your prize now by clicking this link: suspicious-bank.com/claim"
                        }
                      ].map((email, index) => (
                        <button
                          key={index}
                          onClick={() => analyzeEmail(email.content)}
                          className="w-full text-left p-3 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="font-semibold text-sm mb-1">{email.subject}</div>
                          <div className="text-xs text-muted-foreground line-clamp-2">{email.content}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {phishingResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(phishingResult.status)}`}>
                      <div className="flex items-center gap-2 mb-3">
                        {phishingResult.status === 'safe' && <CheckCircle className="w-5 h-5 text-cyber-green" />}
                        {phishingResult.status === 'suspicious' && <AlertTriangle className="w-5 h-5 text-cyber-orange" />}
                        {phishingResult.status === 'malicious' && <AlertTriangle className="w-5 h-5 text-destructive" />}
                        <span className={`font-semibold ${getStatusColor(phishingResult.status)}`}>
                          {phishingResult.status === 'malicious' ? 'PHISHING DETECTED' : 
                           phishingResult.status === 'suspicious' ? 'SUSPICIOUS EMAIL' : 'LEGITIMATE EMAIL'}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          {phishingResult.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {phishingResult.details.map((detail, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Password Strength Lab */}
          {currentLab === 'password' && (
            <div className="space-y-6">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  AI Password Strength Analyzer
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Test Your Password:</h4>
                    <div className="space-y-4">
                      <Input
                        type="password"
                        placeholder="Enter a password to analyze..."
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="bg-card border-border"
                      />
                      <Button
                        onClick={() => analyzePassword(passwordInput)}
                        disabled={!passwordInput}
                        className="w-full bg-gradient-cyber text-black hover:opacity-90"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Analyze Password Strength
                      </Button>
                      
                      <div className="space-y-2">
                        <h5 className="text-sm font-semibold text-muted-foreground">Quick Test Examples:</h5>
                        {['password123', 'MySecure@Pass2024!', '12345', 'Tr0ub4dor&3'].map((testPassword) => (
                          <button
                            key={testPassword}
                            onClick={() => {
                              setPasswordInput(testPassword);
                              analyzePassword(testPassword);
                            }}
                            className="block w-full text-left p-2 bg-card border border-border rounded text-sm hover:border-primary/50 transition-colors"
                          >
                            <span className="font-mono">{testPassword}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {passwordResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(passwordResult.status)}`}>
                      <div className="flex items-center gap-2 mb-3">
                        {passwordResult.status === 'safe' && <CheckCircle className="w-5 h-5 text-cyber-green" />}
                        {passwordResult.status === 'suspicious' && <AlertTriangle className="w-5 h-5 text-cyber-orange" />}
                        {passwordResult.status === 'malicious' && <AlertTriangle className="w-5 h-5 text-destructive" />}
                        <span className={`font-semibold ${getStatusColor(passwordResult.status)}`}>
                          {passwordResult.status === 'safe' ? 'STRONG PASSWORD' : 
                           passwordResult.status === 'suspicious' ? 'WEAK PASSWORD' : 'VERY WEAK PASSWORD'}
                        </span>
                        <Badge variant="outline" className="ml-auto">
                          Score: {passwordResult.confidence}/100
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {passwordResult.details.map((detail, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Log Anomaly Detection Lab */}
          {currentLab === 'logs' && (
            <div className="space-y-6">
              <div className="bg-terminal-bg rounded-lg p-6 border border-primary/20">
                <h3 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  System Log Anomaly Detection
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Sample System Logs:</h4>
                    <div className="bg-black/50 rounded-lg p-4 font-mono text-xs text-cyber-green mb-4">
                      <div>2024-01-15 09:15:23 INFO: User john_doe logged in from 192.168.1.50</div>
                      <div>2024-01-15 09:15:45 INFO: File access: /home/john_doe/documents/report.pdf</div>
                      <div>2024-01-15 09:16:12 INFO: Application started: office_suite.exe</div>
                      <div className="text-cyber-orange">2024-01-15 09:45:33 WARN: Failed login attempt from 192.168.1.100</div>
                      <div className="text-cyber-orange">2024-01-15 09:45:34 WARN: Failed login attempt from 192.168.1.100</div>
                      <div className="text-destructive">2024-01-15 09:45:35 ERROR: Multiple failed auth attempts detected</div>
                      <div className="text-destructive">2024-01-15 09:46:01 ERROR: Suspicious file access: /etc/passwd</div>
                      <div>2024-01-15 10:00:15 INFO: Scheduled backup started</div>
                    </div>
                    
                    <Button
                      onClick={analyzeSystemLogs}
                      className="w-full bg-gradient-cyber text-black hover:opacity-90"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Anomaly Detection
                    </Button>
                  </div>

                  {logResult && (
                    <div className={`p-4 rounded-lg border ${getStatusBg(logResult.status)}`}>
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="w-5 h-5 text-cyber-orange" />
                        <span className="font-semibold text-cyber-orange">ANOMALIES DETECTED</span>
                        <Badge variant="outline" className="ml-auto">
                          {logResult.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="space-y-1">
                        {logResult.details.map((detail, index) => (
                          <div key={index} className="text-sm flex items-center gap-2">
                            <div className="w-1 h-1 bg-current rounded-full"></div>
                            {detail}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 bg-black/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-cyber-green mb-2">🤖 AI Analysis Process:</h4>
                  <pre className="text-xs text-cyber-green">
{`# Isolation Forest Anomaly Detection
model = IsolationForest(contamination=0.1)
features = [
  login_frequency,      # Unusual login patterns
  ip_diversity,        # Multiple IPs from same user
  failed_attempts,     # Brute force indicators
  file_access_patterns # Abnormal file access
]
anomaly_score = model.decision_function(features)
# Negative scores indicate anomalies`}
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