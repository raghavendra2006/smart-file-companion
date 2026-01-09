import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { GlowButton } from "@/components/ui/GlowButton";
import { FileSearch, LogOut, Upload, FolderOpen, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User as SupabaseUser } from "@supabase/supabase-js";

interface Profile {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  pinecone_index: string | null;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate('/auth?mode=login');
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/auth?mode=login');
      } else {
        setUser(session.user);
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('first_name, last_name, avatar_url, pinecone_index')
      .eq('user_id', userId)
      .maybeSingle();

    if (!error && data) {
      setProfile(data);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <FileSearch className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-semibold text-lg text-foreground">
                FileAI
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Profile */}
              <div className="flex items-center gap-3">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Avatar" 
                    className="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <User className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
                <span className="text-sm font-medium text-foreground hidden sm:block">
                  {profile?.first_name} {profile?.last_name}
                </span>
              </div>

              <GlowButton 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </GlowButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground mb-2">
            Welcome, {profile?.first_name}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">
            Your AI-powered file assistant is ready to help.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all cursor-pointer group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <Upload className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
              Upload Files
            </h3>
            <p className="text-muted-foreground">
              Drag and drop or click to upload files for AI processing.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-8 hover:border-primary/50 transition-all cursor-pointer group">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <FolderOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
              Browse Files
            </h3>
            <p className="text-muted-foreground">
              View and manage your uploaded files and AI insights.
            </p>
          </div>
        </div>

        {/* Index Status */}
        {profile?.pinecone_index && (
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Vector Index Active
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your personal AI index is ready to process and search your files.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
