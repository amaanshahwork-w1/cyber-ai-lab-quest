import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Activity, 
  Globe, 
  Users, 
  Clock,
  Zap,
  Database,
  Cpu,
  Eye,
  MapPin
} from 'lucide-react';

interface ThreatData {
  id: string;
  type: 'malware' | 'phishing' | 'ddos' | 'breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  timestamp: string;
  status: 'detected' | 'blocked' | 'investigating';
}

export const ThreatIntelligenceDashboard = () => {
  const [realTimeThreats, setRealTimeThreats] = useState<ThreatData[]>([]);
  const [stats, setStats] = useState({
    threatsBlocked: 1247,
    activeSessions: 892,
    cpuUsage: 45,
    memoryUsage: 67,
    networkTraffic: 1.2,
    lastScan: '2 min ago'
  });

  useEffect(() => {
    // Simulate real-time threat data
    const generateThreat = (): ThreatData => {
      const types: ThreatData['type'][] = ['malware', 'phishing', 'ddos', 'breach'];
      const severities: ThreatData['severity'][] = ['low', 'medium', 'high', 'critical'];
      const sources = ['192.168.1.45', '10.0.0.23', '172.16.0.8', 'external-ip-1', 'external-ip-2'];
      const targets = ['web-server-01', 'db-server-02', 'mail-server', 'api-gateway', 'user-workstation'];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        target: targets[Math.floor(Math.random() * targets.length)],
        timestamp: new Date().toLocaleTimeString(),
        status: Math.random() > 0.3 ? 'blocked' : 'detected'
      };
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new threat
        setRealTimeThreats(prev => [generateThreat(), ...prev.slice(0, 9)]);
      }
      
      // Update stats
      setStats(prev => ({
        ...prev,
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 3),
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        networkTraffic: Math.max(0.1, Math.min(5.0, prev.networkTraffic + (Math.random() - 0.5) * 0.5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10 border-red-500/50';
      case 'high': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/50';
      case 'medium': return 'text-orange-500 bg-orange-500/10 border-orange-500/50';
      case 'low': return 'text-green-500 bg-green-500/10 border-green-500/50';
      default: return 'text-muted-foreground bg-muted/10 border-muted/50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'malware': return <Shield className="w-4 h-4" />;
      case 'phishing': return <Eye className="w-4 h-4" />;
      case 'ddos': return <Activity className="w-4 h-4" />;
      case 'breach': return <AlertTriangle className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-card border-cyber-green/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyber-green/20 rounded-lg">
                <Shield className="w-5 h-5 text-cyber-green" />
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-green font-cyber">
                  {stats.threatsBlocked.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Threats Blocked</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-primary/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold text-primary font-cyber">
                  {stats.activeSessions}
                </div>
                <div className="text-xs text-muted-foreground">Active Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-cyber-orange/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyber-orange/20 rounded-lg">
                <Cpu className="w-5 h-5 text-cyber-orange" />
              </div>
              <div>
                <div className="text-2xl font-bold text-cyber-orange font-cyber">
                  {stats.cpuUsage}%
                </div>
                <div className="text-xs text-muted-foreground">CPU Usage</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-accent/20 hover-lift">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Activity className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="text-2xl font-bold text-accent font-cyber">
                  {stats.networkTraffic.toFixed(1)}GB/s
                </div>
                <div className="text-xs text-muted-foreground">Network Traffic</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Threat Feed */}
      <Card className="bg-gradient-card border-primary/20 shadow-glow-cyan">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-gradient-cyber rounded-lg animate-pulse">
              <Activity className="w-5 h-5 text-black" />
            </div>
            <span className="font-cyber">Live Threat Intelligence Feed</span>
            <Badge variant="outline" className="ml-auto text-cyber-green border-cyber-green/50">
              ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {realTimeThreats.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                <p>Monitoring for threats...</p>
              </div>
            ) : (
              realTimeThreats.map((threat) => (
                <div
                  key={threat.id}
                  className="bg-terminal-bg rounded-lg p-4 border border-border hover:border-primary/50 transition-all animate-slide-up"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded ${getSeverityColor(threat.severity)} flex items-center justify-center`}>
                        {getTypeIcon(threat.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold capitalize">{threat.type} Attack</span>
                          <Badge 
                            variant="outline" 
                            className={getSeverityColor(threat.severity)}
                          >
                            {threat.severity.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3 h-3" />
                            <span>Source: {threat.source}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Database className="w-3 h-3" />
                            <span>Target: {threat.target}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-muted-foreground mb-1">
                        {threat.timestamp}
                      </div>
                      <Badge 
                        variant={threat.status === 'blocked' ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {threat.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-cyber-purple/20">
          <CardHeader>
            <CardTitle className="font-cyber text-cyber-purple">Threat Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Malware Attempts</span>
                <span className="font-bold text-cyber-green">↓ 12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Phishing Campaigns</span>
                <span className="font-bold text-cyber-orange">↑ 8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>DDoS Attacks</span>
                <span className="font-bold text-destructive">↑ 23%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Intrusion Attempts</span>
                <span className="font-bold text-cyber-green">↓ 5%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="font-cyber text-primary">System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>CPU Usage</span>
                  <span className="font-mono">{stats.cpuUsage}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-cyber-green h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Memory Usage</span>
                  <span className="font-mono">{stats.memoryUsage}%</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div 
                    className="bg-cyber-orange h-2 rounded-full transition-all duration-500"
                    style={{ width: `${stats.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};