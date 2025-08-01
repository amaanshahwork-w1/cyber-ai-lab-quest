import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useGame } from '@/contexts/GameContext';
import { Trophy, Star, Target, Zap, Calendar, Award } from 'lucide-react';

export const UserProfile = () => {
  const { userProgress, achievements } = useGame();
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const xpToNextLevel = 100 - (userProgress.xp % 100);

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 border-cyber-cyan/30">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-cyber-cyan">
              <AvatarFallback className="bg-cyber-blue text-white text-xl font-bold">
                CL
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl text-cyber-cyan">Cyber Learner</CardTitle>
              <CardDescription className="text-cyber-green">
                Level {userProgress.level} Security Specialist
              </CardDescription>
              <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-cyber-orange" />
                  {userProgress.totalScore} points
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-cyber-cyan" />
                  {userProgress.xp} XP
                </div>
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-cyber-purple" />
                  {unlockedAchievements.length} achievements
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {userProgress.level + 1}</span>
              <span>{xpToNextLevel} XP needed</span>
            </div>
            <Progress 
              value={(userProgress.xp % 100)} 
              className="h-3 bg-background/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-cyber-cyan">{userProgress.level}</div>
            <p className="text-sm text-muted-foreground">Current Level</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-cyber-green">{userProgress.modulesCompleted.length}</div>
            <p className="text-sm text-muted-foreground">Modules Completed</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-cyber-orange">{userProgress.ctfChallengesCompleted.length}</div>
            <p className="text-sm text-muted-foreground">CTF Challenges</p>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-cyber-purple">{userProgress.streak}</div>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cyber-orange" />
            Achievements
          </CardTitle>
          <CardDescription>
            Your cybersecurity learning milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-cyber-green/10 border-cyber-green/30 shadow-glow-green'
                    : 'bg-muted/20 border-muted/30 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-cyber-green mt-1">
                        Unlocked {achievement.unlockedAt.toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="outline" className="border-cyber-green text-cyber-green">
                      Unlocked
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};