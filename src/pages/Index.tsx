import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import { GlowButton } from "@/components/ui/GlowButton";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        <FeaturesSection />

        {/* CTA Section */}
        <section className="py-24 px-4 relative">
          <div className="hero-glow left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
              <span className="text-foreground">Ready to Transform Your </span>
              <span className="gradient-text">File Management?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
              Join thousands of users who are already experiencing the future of file organization.
            </p>
            <GlowButton 
              size="lg" 
              onClick={() => navigate('/auth?mode=signup')}
              className="group animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              Start Free Today
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </GlowButton>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/50 py-8 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-muted-foreground text-sm">
              © 2025 AI Smart File Assistant. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
