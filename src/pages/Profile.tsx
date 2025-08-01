import { UserProfile } from '@/components/UserProfile';

const Profile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cyber-blue/5 to-cyber-purple/5 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-cyan to-cyber-purple bg-clip-text text-transparent">
            Your Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Track your cybersecurity learning journey
          </p>
        </div>
        
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;