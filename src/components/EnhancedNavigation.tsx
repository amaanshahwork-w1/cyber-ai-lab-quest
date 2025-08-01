import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGame } from '@/contexts/GameContext';
import { 
  Home, 
  Flag, 
  User, 
  Trophy, 
  Shield, 
  Gamepad2,
  Menu,
  X,
  Star,
  Zap
} from 'lucide-react';

export const EnhancedNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { userProgress } = useGame();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'CTF Games', href: '/ctf', icon: Flag },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-cyber-cyan to-cyber-purple rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
              CyberLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-cyber-blue/20 text-cyber-cyan border border-cyber-cyan/30'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* User Stats */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 px-2 py-1 bg-cyber-blue/10 rounded-md">
                <Zap className="h-3 w-3 text-cyber-cyan" />
                <span className="text-cyber-cyan font-semibold">{userProgress.level}</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-cyber-orange/10 rounded-md">
                <Star className="h-3 w-3 text-cyber-orange" />
                <span className="text-cyber-orange font-semibold">{userProgress.totalScore}</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigation.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'bg-cyber-blue/20 text-cyber-cyan border border-cyber-cyan/30'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
              
              {/* Mobile User Stats */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm text-muted-foreground">Your Progress</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-cyber-cyan text-cyber-cyan">
                      Level {userProgress.level}
                    </Badge>
                    <Badge variant="outline" className="border-cyber-orange text-cyber-orange">
                      {userProgress.totalScore} pts
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};