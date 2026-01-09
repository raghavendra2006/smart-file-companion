import { FileSearch } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-border/50 bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
              <FileSearch className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-semibold text-lg text-foreground">
              FileAI
            </span>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <GlowButton 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/auth?mode=login')}
            >
              Sign In
            </GlowButton>
            <GlowButton 
              size="sm"
              onClick={() => navigate('/auth?mode=signup')}
            >
              Get Started
            </GlowButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
