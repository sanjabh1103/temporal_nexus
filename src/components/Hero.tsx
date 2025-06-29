import React from 'react';
import { Clock, Brain, Zap, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const features = [
    {
      icon: Clock,
      title: 'Temporal Optimization',
      description: 'Identify the perfect timing for your life decisions with AI-powered analysis'
    },
    {
      icon: Brain,
      title: 'Counterfactual Simulation',
      description: 'Explore alternative life paths and their probable outcomes'
    },
    {
      icon: Zap,
      title: 'Quantum Decision Engine',
      description: 'Visualize decisions as probability clouds across time dimensions'
    },
    {
      icon: TrendingUp,
      title: 'Collective Intelligence',
      description: 'Leverage wisdom from thousands of similar decisions'
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
              <Sparkles className="w-4 h-4 text-temporal-400" />
              <span className="text-sm text-gray-300">Powered by Gemini 2.5 Flash & Quantum Computing</span>
            </div>

            {/* Headline */}
            <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
              <span className="bg-temporal-gradient bg-clip-text text-transparent">
                TEMPORAL
              </span>
              <br />
              <span className="text-white">NEXUS</span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The revolutionary decision-making platform that optimizes your choices across 
              <span className="text-temporal-400 font-semibold"> time dimensions</span>. 
              Minimize regret, maximize outcomes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
              <button
                onClick={onGetStarted}
                className="group relative px-8 py-4 bg-temporal-gradient rounded-xl font-semibold text-white shadow-2xl shadow-temporal-500/25 hover:shadow-temporal-500/40 transition-all duration-300 hover:scale-105"
              >
                <span className="flex items-center space-x-2">
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-16 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-temporal-400">99.2%</div>
                <div className="text-sm text-gray-400">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-quantum-400">10K+</div>
                <div className="text-sm text-gray-400">Decisions Optimized</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-collective-400">47%</div>
                <div className="text-sm text-gray-400">Regret Reduction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-temporal-500/20 rounded-full blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-quantum-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-collective-500/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Features Section */}
      <div className="relative py-24 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Four Dimensions of <span className="text-temporal-400">Decision Intelligence</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Harness the power of temporal analysis, simulation, and collective wisdom
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-temporal-gradient rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-temporal-gradient opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};