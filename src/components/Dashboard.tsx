import React, { useState, useEffect } from 'react';
import { Plus, Clock, TrendingUp, Brain, Zap, Calendar, Star, ArrowRight, Loader, AlertCircle } from 'lucide-react';
import { UserStorage } from '../utils/storage';
import { DecisionCard } from './DecisionCard';
import { MetricsCard } from './MetricsCard';
import { TimingInsights } from './TimingInsights';
import { useDecisions, useTemporalAPI } from '../hooks/useTemporalAPI';

interface DashboardProps {
  onStartDecision: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartDecision }) => {
  const user = UserStorage.getUser();
  const { decisions, loading, error, refreshDecisions } = useDecisions(user?.id || '');
  const [insights, setInsights] = useState(UserStorage.getInsights());
  const [collectiveInsights, setCollectiveInsights] = useState<any>(null);
  const api = useTemporalAPI();

  useEffect(() => {
    // Load collective insights
    const loadCollectiveInsights = async () => {
      if (user) {
        const result = await api.getCollectiveInsights('general', user);
        if (result) {
          setCollectiveInsights(result);
        }
      }
    };

    loadCollectiveInsights();

    // Simulate real-time updates
    const interval = setInterval(() => {
      setInsights(UserStorage.getInsights());
      refreshDecisions();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [user?.id]);

  const metrics = [
    {
      title: 'Active Decisions',
      value: decisions.filter(d => d.status === 'analyzing').length,
      change: '+12%',
      icon: Brain,
      color: 'temporal' as const
    },
    {
      title: 'Completed Analysis',
      value: decisions.filter(d => d.status === 'completed').length,
      change: '+8%',
      icon: Clock,
      color: 'quantum' as const
    },
    {
      title: 'Average Confidence',
      value: decisions.length > 0 
        ? `${Math.round(decisions.reduce((acc, d) => acc + (d.confidence || 0), 0) / decisions.length)}%`
        : '0%',
      change: '+5%',
      icon: TrendingUp,
      color: 'collective' as const
    },
    {
      title: 'AI Accuracy',
      value: collectiveInsights?.success_rate ? `${collectiveInsights.success_rate}%` : '97.2%',
      change: '+2%',
      icon: Zap,
      color: 'temporal' as const
    }
  ];

  const quickActions = [
    { title: 'Career Change', description: 'Optimize timing for career transitions', icon: TrendingUp, type: 'career_change' },
    { title: 'Investment Timing', description: 'Find the best time to invest', icon: Calendar, type: 'investment' },
    { title: 'Life Decisions', description: 'Marriage, relocation, education', icon: Star, type: 'marriage' },
    { title: 'Health Choices', description: 'Treatment and lifestyle decisions', icon: Brain, type: 'health' }
  ];

  if (loading && decisions.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-12 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-temporal-400 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-medium text-white mb-2">Loading your decisions...</h3>
          <p className="text-gray-400">Connecting to Temporal Nexus AI</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Decision Dashboard</h1>
            <p className="text-gray-400">Monitor your temporal optimization journey with AI insights</p>
            {error && (
              <div className="flex items-center space-x-2 mt-2 text-yellow-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">Using offline mode - some features may be limited</span>
              </div>
            )}
          </div>
          <button
            onClick={onStartDecision}
            className="flex items-center space-x-2 px-6 py-3 bg-temporal-gradient rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>New AI Analysis</span>
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricsCard key={metric.title} {...metric} index={index} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Decisions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Recent Decisions</h2>
              <button 
                onClick={refreshDecisions}
                className="text-temporal-400 hover:text-temporal-300 text-sm font-medium"
              >
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {decisions.slice(0, 5).map((decision, index) => (
                <DecisionCard key={decision.id} decision={decision} index={index} />
              ))}
              
              {decisions.length === 0 && !loading && (
                <div className="text-center py-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No decisions yet</h3>
                  <p className="text-gray-400 mb-6">Start your first AI-powered temporal optimization</p>
                  <button
                    onClick={onStartDecision}
                    className="px-6 py-2 bg-temporal-500 text-white rounded-lg hover:bg-temporal-600 transition-colors"
                  >
                    Create Decision
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timing Insights */}
            <TimingInsights insights={insights} />

            {/* AI Insights */}
            {collectiveInsights && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">AI Collective Insights</h3>
                <div className="space-y-3">
                  {collectiveInsights.common_patterns?.slice(0, 3).map((pattern: string, index: number) => (
                    <div key={index} className="p-3 bg-white/5 border-l-4 border-l-temporal-400 rounded-r-lg">
                      <p className="text-sm text-gray-300">{pattern}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Success Rate</span>
                    <span className="text-collective-400 font-medium">{collectiveInsights.success_rate}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Start AI Analysis</h3>
              <div className="space-y-3">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.title}
                      onClick={onStartDecision}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                    >
                      <Icon className="w-5 h-5 text-temporal-400" />
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-white">{action.title}</div>
                        <div className="text-xs text-gray-400">{action.description}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};