import React, { useEffect, useState } from 'react';
import { Clock, Brain, Zap, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGetStarted }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="relative overflow-hidden">
      {/* Full-width Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Glassmorphism Container */}
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Content with Glass Effect */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl">
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3 mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Sparkles className="w-5 h-5 text-temporal-400" />
              <span className="text-sm text-white/90 font-medium">Powered by Gemini 2.5 Flash & Quantum Computing</span>
            </div>

            {/* Headline with Serif Font */}
            <h1 className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold leading-tight mb-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="bg-gradient-to-r from-white via-temporal-200 to-white bg-clip-text text-transparent drop-shadow-lg">
                TEMPORAL
              </span>
              <br />
              <span className="text-white drop-shadow-lg">NEXUS</span>
            </h1>

            {/* Subheadline */}
            <p className={`text-lg sm:text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-10 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              The revolutionary decision-making platform that optimizes your choices across
              <span className="text-temporal-300 font-semibold"> time dimensions</span>.
              Minimize regret, maximize outcomes.
            </p>

            {/* CTA Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                onClick={onGetStarted}
                className="group relative px-10 py-5 bg-gradient-to-r from-temporal-500 to-temporal-600 hover:from-temporal-600 hover:to-temporal-700 rounded-2xl font-semibold text-white shadow-2xl shadow-temporal-500/30 hover:shadow-temporal-500/50 transition-all duration-500 hover:scale-105 hover:-translate-y-1 border border-temporal-400/20"
              >
                <span className="flex items-center space-x-3">
                  <span className="text-lg">Start Your Journey</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl font-semibold text-white hover:bg-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-1 shadow-lg">
                <span className="text-lg">Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-6 sm:gap-8 pt-8 transition-all duration-700 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold text-temporal-300 mb-2 group-hover:scale-110 transition-transform duration-300">99.2%</div>
                <div className="text-sm text-white/70 font-medium">Accuracy Rate</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold text-quantum-300 mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
                <div className="text-sm text-white/70 font-medium">Decisions Optimized</div>
              </div>
              <div className="text-center group">
                <div className="text-3xl sm:text-4xl font-bold text-collective-300 mb-2 group-hover:scale-110 transition-transform duration-300">47%</div>
                <div className="text-sm text-white/70 font-medium">Regret Reduction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-temporal-500/30 rounded-full blur-2xl animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-36 h-36 bg-quantum-500/30 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 left-20 w-28 h-28 bg-collective-500/30 rounded-full blur-2xl animate-float opacity-60" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 right-10 w-20 h-20 bg-temporal-400/20 rounded-full blur-xl animate-float opacity-40" style={{ animationDelay: '6s' }} />
      </div>

      {/* Features Section */}
      <div className="relative py-20 lg:py-32 bg-gradient-to-b from-black/20 to-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-20 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Four Dimensions of <span className="text-temporal-300 bg-gradient-to-r from-temporal-300 to-temporal-400 bg-clip-text text-transparent">Decision Intelligence</span>
            </h2>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Harness the power of temporal analysis, simulation, and collective wisdom to make informed decisions
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className={`group relative p-6 lg:p-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-xl hover:shadow-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ animationDelay: `${index * 0.2 + 1}s` }}
                >
                  <div className="relative z-10">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-temporal-500 to-temporal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <Icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-white mb-3 group-hover:text-temporal-200 transition-colors duration-300">{feature.title}</h3>
                    <p className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">{feature.description}</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-temporal-500/10 to-quantum-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                  <div className="absolute -inset-1 bg-gradient-to-r from-temporal-500/20 to-quantum-500/20 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};