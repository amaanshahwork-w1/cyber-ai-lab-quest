import React, { createContext, useContext, useState, useEffect } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface UserProgress {
  level: number;
  xp: number;
  totalScore: number;
  modulesCompleted: string[];
  ctfChallengesCompleted: string[];
  streak: number;
  lastActivity: Date;
}

interface GameContextType {
  userProgress: UserProgress;
  achievements: Achievement[];
  addXP: (amount: number) => void;
  completeModule: (moduleId: string) => void;
  completeCTFChallenge: (challengeId: string, score: number) => void;
  unlockAchievement: (achievementId: string) => void;
  updateStreak: () => void;
}

const defaultProgress: UserProgress = {
  level: 1,
  xp: 0,
  totalScore: 0,
  modulesCompleted: [],
  ctfChallengesCompleted: [],
  streak: 0,
  lastActivity: new Date(),
};

const defaultAchievements: Achievement[] = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first module',
    icon: '🎯',
    unlocked: false,
  },
  {
    id: 'ctf_beginner',
    title: 'CTF Rookie',
    description: 'Complete your first CTF challenge',
    icon: '🏁',
    unlocked: false,
  },
  {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 7-day learning streak',
    icon: '🔥',
    unlocked: false,
  },
  {
    id: 'security_expert',
    title: 'Security Expert',
    description: 'Complete all security modules',
    icon: '🛡️',
    unlocked: false,
  },
  {
    id: 'ctf_champion',
    title: 'CTF Champion',
    description: 'Score 1000+ points in CTF challenges',
    icon: '👑',
    unlocked: false,
  },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('cyber-lab-progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('cyber-lab-achievements');
    return saved ? JSON.parse(saved) : defaultAchievements;
  });

  useEffect(() => {
    localStorage.setItem('cyber-lab-progress', JSON.stringify(userProgress));
  }, [userProgress]);

  useEffect(() => {
    localStorage.setItem('cyber-lab-achievements', JSON.stringify(achievements));
  }, [achievements]);

  const addXP = (amount: number) => {
    setUserProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / 100) + 1;
      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        lastActivity: new Date(),
      };
    });
  };

  const completeModule = (moduleId: string) => {
    setUserProgress(prev => {
      if (prev.modulesCompleted.includes(moduleId)) return prev;
      
      return {
        ...prev,
        modulesCompleted: [...prev.modulesCompleted, moduleId],
        lastActivity: new Date(),
      };
    });
    
    addXP(50);
    
    if (userProgress.modulesCompleted.length === 0) {
      unlockAchievement('first_steps');
    }
  };

  const completeCTFChallenge = (challengeId: string, score: number) => {
    setUserProgress(prev => {
      if (prev.ctfChallengesCompleted.includes(challengeId)) return prev;
      
      return {
        ...prev,
        ctfChallengesCompleted: [...prev.ctfChallengesCompleted, challengeId],
        totalScore: prev.totalScore + score,
        lastActivity: new Date(),
      };
    });
    
    addXP(score);
    
    if (userProgress.ctfChallengesCompleted.length === 0) {
      unlockAchievement('ctf_beginner');
    }
    
    if (userProgress.totalScore + score >= 1000) {
      unlockAchievement('ctf_champion');
    }
  };

  const unlockAchievement = (achievementId: string) => {
    setAchievements(prev =>
      prev.map(achievement =>
        achievement.id === achievementId && !achievement.unlocked
          ? { ...achievement, unlocked: true, unlockedAt: new Date() }
          : achievement
      )
    );
  };

  const updateStreak = () => {
    const today = new Date();
    const lastActivity = new Date(userProgress.lastActivity);
    const diffTime = Math.abs(today.getTime() - lastActivity.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      setUserProgress(prev => ({ ...prev, streak: prev.streak + 1 }));
      if (userProgress.streak + 1 >= 7) {
        unlockAchievement('streak_master');
      }
    } else if (diffDays > 1) {
      setUserProgress(prev => ({ ...prev, streak: 1 }));
    }
  };

  return (
    <GameContext.Provider value={{
      userProgress,
      achievements,
      addXP,
      completeModule,
      completeCTFChallenge,
      unlockAchievement,
      updateStreak,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};