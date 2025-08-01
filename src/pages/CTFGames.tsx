import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useGame } from '@/contexts/GameContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Flag, 
  Shield, 
  Lock, 
  Eye, 
  Code, 
  Network, 
  Database, 
  Binary,
  Trophy,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  Target
} from 'lucide-react';

interface CTFChallenge {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  description: string;
  flag: string;
  hints: string[];
  scenario: string;
  icon: any;
}

const ctfChallenges: CTFChallenge[] = [
  {
    id: 'web_vuln_1',
    title: 'SQL Injection Hunt',
    category: 'Web Security',
    difficulty: 'Easy',
    points: 100,
    description: 'Find and exploit a SQL injection vulnerability in a login form.',
    flag: 'CYBER{sql_1nj3ct10n_m4st3r}',
    hints: [
      'Try different SQL payloads in the username field',
      'Look for error messages that reveal database structure',
      'Use OR 1=1 to bypass authentication'
    ],
    scenario: 'You\'ve discovered a web application with a suspicious login form. The developer seems to have made some rookie mistakes with input validation.',
    icon: Database
  },
  {
    id: 'crypto_1',
    title: 'Caesar\'s Secret',
    category: 'Cryptography',
    difficulty: 'Easy',
    points: 75,
    description: 'Decrypt a message encoded with a Caesar cipher.',
    flag: 'CYBER{c4354r_c1ph3r_50lv3d}',
    hints: [
      'Try different shift values from 1 to 25',
      'Look for readable English words',
      'The most common shift is 13 (ROT13)'
    ],
    scenario: 'An intercepted message: "FLORE{p4354e_p1cu3e_50yh3q}" - Can you decode this ancient encryption?',
    icon: Lock
  },
  {
    id: 'forensics_1',
    title: 'Hidden in Plain Sight',
    category: 'Digital Forensics',
    difficulty: 'Medium',
    points: 150,
    description: 'Extract hidden data from an image file using steganography techniques.',
    flag: 'CYBER{st3g4n0gr4phy_m4st3r}',
    hints: [
      'Use tools like steghide or strings command',
      'Check the metadata of the image',
      'Look for LSB (Least Significant Bit) encoding'
    ],
    scenario: 'A suspicious image file was found on a compromised system. Intelligence suggests it contains hidden information.',
    icon: Eye
  },
  {
    id: 'reverse_1',
    title: 'Crackme Challenge',
    category: 'Reverse Engineering',
    difficulty: 'Hard',
    points: 200,
    description: 'Reverse engineer a binary to find the correct password.',
    flag: 'CYBER{r3v3rs3_3ng1n33r1ng}',
    hints: [
      'Use tools like strings, objdump, or a disassembler',
      'Look for hardcoded strings and comparison functions',
      'Try dynamic analysis with a debugger'
    ],
    scenario: 'You\'ve found an executable file that requires a password. No source code available - only the compiled binary.',
    icon: Binary
  },
  {
    id: 'network_1',
    title: 'Packet Analysis',
    category: 'Network Security',
    difficulty: 'Medium',
    points: 125,
    description: 'Analyze network traffic to find sensitive information.',
    flag: 'CYBER{p4ck3t_4n4ly515_pr0}',
    hints: [
      'Use Wireshark or tcpdump to analyze the capture',
      'Look for unencrypted protocols like HTTP or FTP',
      'Check for credentials in plain text'
    ],
    scenario: 'Network traffic captured from a compromised network. Find the flag hidden in the communication.',
    icon: Network
  }
];

const CTFGames = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<CTFChallenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [solvedChallenges, setSolvedChallenges] = useState<Set<string>>(new Set());
  const [hints, setHints] = useState<{ [key: string]: number }>({});
  const { completeCTFChallenge, userProgress } = useGame();
  const { toast } = useToast();

  const handleSubmitFlag = () => {
    if (!selectedChallenge) return;

    if (flagInput.trim() === selectedChallenge.flag) {
      setSolvedChallenges(prev => new Set([...prev, selectedChallenge.id]));
      completeCTFChallenge(selectedChallenge.id, selectedChallenge.points);
      
      toast({
        title: "🎉 Challenge Solved!",
        description: `You earned ${selectedChallenge.points} points!`,
      });
      
      setFlagInput('');
      setSelectedChallenge(null);
    } else {
      toast({
        title: "❌ Incorrect Flag",
        description: "Try again! Check the flag format: CYBER{...}",
        variant: "destructive",
      });
    }
  };

  const useHint = (challengeId: string) => {
    setHints(prev => ({
      ...prev,
      [challengeId]: (prev[challengeId] || 0) + 1
    }));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Hard': return 'bg-red-500/10 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Web Security': return Database;
      case 'Cryptography': return Lock;
      case 'Digital Forensics': return Eye;
      case 'Reverse Engineering': return Binary;
      case 'Network Security': return Network;
      default: return Shield;
    }
  };

  const totalPoints = ctfChallenges.reduce((sum, challenge) => 
    solvedChallenges.has(challenge.id) ? sum + challenge.points : sum, 0
  );

  const completionPercentage = (solvedChallenges.size / ctfChallenges.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cyber-blue/5 to-cyber-purple/5 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
            Cyber CTF Arena
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Test your cybersecurity skills with hands-on capture-the-flag challenges
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-gradient-to-r from-cyber-blue/10 to-cyber-purple/10 border-cyber-cyan/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-6 w-6 text-cyber-orange" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-cyan">{solvedChallenges.size}</div>
                <p className="text-sm text-muted-foreground">Challenges Solved</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-green">{totalPoints}</div>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-orange">{userProgress.level}</div>
                <p className="text-sm text-muted-foreground">Current Level</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyber-purple">{completionPercentage.toFixed(0)}%</div>
                <p className="text-sm text-muted-foreground">Completion</p>
              </div>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </CardContent>
        </Card>

        {/* Challenge List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-cyber-cyan" />
                  Available Challenges
                </CardTitle>
                <CardDescription>
                  Choose a challenge to start hacking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ctfChallenges.map((challenge) => {
                    const IconComponent = challenge.icon;
                    const isSolved = solvedChallenges.has(challenge.id);
                    
                    return (
                      <Card 
                        key={challenge.id}
                        className={`cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
                          selectedChallenge?.id === challenge.id 
                            ? 'ring-2 ring-cyber-cyan shadow-glow-cyan' 
                            : ''
                        } ${isSolved ? 'bg-cyber-green/10 border-cyber-green/30' : ''}`}
                        onClick={() => setSelectedChallenge(challenge)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`p-2 rounded-lg ${isSolved ? 'bg-cyber-green/20' : 'bg-cyber-blue/20'}`}>
                                <IconComponent className="h-5 w-5 text-cyber-cyan" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold flex items-center gap-2">
                                  {challenge.title}
                                  {isSolved && <CheckCircle className="h-4 w-4 text-cyber-green" />}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-2">
                                  {challenge.description}
                                </p>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <Badge variant="outline" className={getDifficultyColor(challenge.difficulty)}>
                                    {challenge.difficulty}
                                  </Badge>
                                  <Badge variant="outline">
                                    {challenge.category}
                                  </Badge>
                                  <div className="flex items-center gap-1 text-sm text-cyber-orange">
                                    <Star className="h-3 w-3" />
                                    {challenge.points} pts
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Challenge Details */}
          <div>
            {selectedChallenge ? (
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-cyber-orange" />
                    {selectedChallenge.title}
                  </CardTitle>
                  <CardDescription>
                    {selectedChallenge.category} • {selectedChallenge.difficulty}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      {selectedChallenge.scenario}
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h4 className="font-semibold mb-2">Challenge Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {selectedChallenge.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Points</h4>
                    <div className="flex items-center gap-1 text-cyber-orange">
                      <Star className="h-4 w-4" />
                      {selectedChallenge.points} points
                    </div>
                  </div>

                  {/* Hints */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Hints</h4>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => useHint(selectedChallenge.id)}
                        disabled={(hints[selectedChallenge.id] || 0) >= selectedChallenge.hints.length}
                      >
                        Get Hint
                      </Button>
                    </div>
                    {Array.from({ length: hints[selectedChallenge.id] || 0 }, (_, i) => (
                      <Alert key={i} className="mb-2">
                        <AlertDescription>
                          💡 {selectedChallenge.hints[i]}
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>

                  {/* Flag Submission */}
                  <div>
                    <h4 className="font-semibold mb-2">Submit Flag</h4>
                    <div className="space-y-2">
                      <Input
                        placeholder="CYBER{your_flag_here}"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSubmitFlag()}
                      />
                      <Button 
                        onClick={handleSubmitFlag}
                        className="w-full"
                        disabled={!flagInput.trim()}
                      >
                        Submit Flag
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="sticky top-6">
                <CardContent className="p-6 text-center">
                  <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Select a Challenge</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose a CTF challenge from the list to get started
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { CTFGames };