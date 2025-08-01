import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Star, TrendingUp } from 'lucide-react';

interface LeaderboardUser {
  id: string;
  name: string;
  level: number;
  xp: number;
  totalScore: number;
  achievements: number;
  rank: number;
}

// Mock leaderboard data
const leaderboardData: LeaderboardUser[] = [
  {
    id: '1',
    name: 'Alex "H4x0r" Chen',
    level: 15,
    xp: 1250,
    totalScore: 2340,
    achievements: 12,
    rank: 1,
  },
  {
    id: '2',
    name: 'Sarah "CyberNinja" Johnson',
    level: 13,
    xp: 1180,
    totalScore: 2150,
    achievements: 10,
    rank: 2,
  },
  {
    id: '3',
    name: 'Mike "Penetrator" Davis',
    level: 12,
    xp: 1050,
    totalScore: 1980,
    achievements: 9,
    rank: 3,
  },
  {
    id: '4',
    name: 'Emma "Firewall" Wilson',
    level: 11,
    xp: 980,
    totalScore: 1750,
    achievements: 8,
    rank: 4,
  },
  {
    id: '5',
    name: 'David "Crypto" Brown',
    level: 10,
    xp: 900,
    totalScore: 1650,
    achievements: 7,
    rank: 5,
  },
  {
    id: '6',
    name: 'Lisa "SecOps" Taylor',
    level: 9,
    xp: 850,
    totalScore: 1500,
    achievements: 6,
    rank: 6,
  },
  {
    id: '7',
    name: 'You',
    level: 8,
    xp: 750,
    totalScore: 1250,
    achievements: 5,
    rank: 7,
  },
];

export const Leaderboard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <div className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{rank}</div>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30 shadow-glow-yellow';
      case 2:
        return 'from-gray-400/20 to-slate-400/20 border-gray-400/30 shadow-glow-gray';
      case 3:
        return 'from-amber-600/20 to-orange-500/20 border-amber-600/30 shadow-glow-orange';
      default:
        return 'from-cyber-blue/10 to-cyber-purple/10 border-border';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyber-cyan" />
          Global Leaderboard
        </CardTitle>
        <CardDescription>
          Top cybersecurity learners this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboardData.map((user) => (
            <Card 
              key={user.id}
              className={`transition-all duration-300 bg-gradient-to-r ${getRankColor(user.rank)} ${
                user.name === 'You' ? 'ring-2 ring-cyber-cyan' : ''
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    {getRankIcon(user.rank)}
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-cyber-blue text-white font-bold">
                        {user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{user.name}</h3>
                      {user.name === 'You' && (
                        <Badge variant="outline" className="border-cyber-cyan text-cyber-cyan">
                          You
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Level {user.level}</span>
                      <span>{user.xp} XP</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-cyber-orange" />
                        {user.totalScore}
                      </span>
                      <span>{user.achievements} achievements</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyber-cyan">#{user.rank}</div>
                    <div className="text-sm text-muted-foreground">Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-cyber-blue/10 rounded-lg border border-cyber-blue/30">
          <div className="text-center">
            <h4 className="font-semibold text-cyber-cyan mb-2">Climb the Ranks!</h4>
            <p className="text-sm text-muted-foreground">
              Complete more challenges and modules to improve your position on the leaderboard.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};