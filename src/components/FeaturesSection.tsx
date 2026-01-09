import { Brain, Search, Shield, Zap, FolderTree, MessageSquare } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced machine learning algorithms understand your files contextually, extracting insights you never knew existed.",
  },
  {
    icon: Search,
    title: "Smart Search",
    description: "Find any file instantly using natural language queries. Just describe what you're looking for, and we'll find it.",
  },
  {
    icon: FolderTree,
    title: "Intelligent Organization",
    description: "Automatically categorize and organize your files based on content, making file management effortless.",
  },
  {
    icon: MessageSquare,
    title: "Chat with Your Files",
    description: "Ask questions about your documents and get instant, accurate answers powered by AI.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Powered by vector search technology for instant results, no matter how large your file collection.",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your files are encrypted and stored securely. We never share your data with third parties.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 animate-fade-up">
            <span className="text-foreground">Powerful </span>
            <span className="gradient-text">Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
            Everything you need to manage your files smarter, not harder.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
