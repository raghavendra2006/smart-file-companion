import { FileSearch, ArrowRight } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background glow effects */}
      <div className="hero-glow top-1/4 left-1/4 animate-pulse-glow" />
      <div className="hero-glow bottom-1/4 right-1/4 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 mb-8 animate-float">
          <FileSearch className="w-10 h-10 text-primary" />
        </div>

        {/* Title */}
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-up">
          <span className="text-foreground">AI Smart</span>
          <br />
          <span className="gradient-text glow-text">File Assistant</span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
          Revolutionize how you manage, search, and interact with your files using cutting-edge AI technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '200ms' }}>
          <GlowButton 
            size="lg" 
            onClick={() => navigate('/auth?mode=signup')}
            className="group"
          >
            Get Started Free
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </GlowButton>
          <GlowButton 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/auth?mode=login')}
          >
            Sign In
          </GlowButton>
        </div>

        {/* Stats or trust indicators */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto animate-fade-up" style={{ animationDelay: '300ms' }}>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary font-display">10K+</div>
            <div className="text-sm text-muted-foreground">Files Processed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary font-display">99%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary font-display">24/7</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
