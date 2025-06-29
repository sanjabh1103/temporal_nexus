import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { Brain, Clock, Users, Zap, TrendingUp, Activity } from 'lucide-react';

export const QuantumVisualization: React.FC = () => {
  const [activeView, setActiveView] = useState<'probability' | 'timeline' | 'collective'>('probability');

  // Mock data for visualizations
  const probabilityData = [
    { outcome: 'Career Success', probability: 85, quantum_variance: 12 },
    { outcome: 'Financial Gain', probability: 72, quantum_variance: 18 },
    { outcome: 'Life Satisfaction', probability: 91, quantum_variance: 8 },
    { outcome: 'Work-Life Balance', probability: 68, quantum_variance: 22 },
    { outcome: 'Professional Growth', probability: 88, quantum_variance: 15 }
  ];

  const timelineData = [
    { month: 'Jan', optimal_score: 65, market_conditions: 70, personal_readiness: 60 },
    { month: 'Feb', optimal_score: 68, market_conditions: 72, personal_readiness: 64 },
    { month: 'Mar', optimal_score: 75, market_conditions: 78, personal_readiness: 72 },
    { month: 'Apr', optimal_score: 82, market_conditions: 85, personal_readiness: 79 },
    { month: 'May', optimal_score: 88, market_conditions: 90, personal_readiness: 86 },
    { month: 'Jun', optimal_score: 92, market_conditions: 94, personal_readiness: 90 }
  ];

  const collectiveData = [
    { decision_type: 'Career Change', success_rate: 78, total_decisions: 1250 },
    { decision_type: 'Investment', success_rate: 84, total_decisions: 2100 },
    { decision_type: 'Relocation', success_rate: 72, total_decisions: 890 },
    { decision_type: 'Education', success_rate: 89, total_decisions: 1560 },
    { decision_type: 'Health', success_rate: 81, total_decisions: 720 }
  ];

  const views = [
    {
      id: 'probability',
      title: 'Quantum Probability Clouds',
      description: 'Outcome probabilities with uncertainty ranges',
      icon: Brain,
      color: 'temporal'
    },
    {
      id: 'timeline',
      title: 'Temporal Optimization',
      description: 'Optimal timing windows across months',
      icon: Clock,
      color: 'quantum'
    },
    {
      id: 'collective',
      title: 'Collective Intelligence',
      description: 'Success rates from similar decisions',
      icon: Users,
      color: 'collective'
    }
  ];

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Quantum Decision Visualization</h1>
          <p className="text-gray-400">Explore decision landscapes across probability dimensions</p>
        </div>

        {/* View Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {views.map((view) => {
            const Icon = view.icon;
            return (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center space-x-3 px-6 py-4 rounded-xl border transition-all duration-300 ${
                  activeView === view.id
                    ? 'bg-temporal-500/20 border-temporal-500 text-temporal-300'
                    : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <div className="text-left">
                  <div className="font-semibold">{view.title}</div>
                  <div className="text-xs opacity-75">{view.description}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Visualization Container */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {activeView === 'probability' && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Brain className="w-6 h-6 text-temporal-400" />
                <h2 className="text-xl font-bold text-white">Quantum Probability Analysis</h2>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={probabilityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis 
                      dataKey="outcome" 
                      stroke="#9CA3AF"
                      fontSize={12}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Bar 
                      dataKey="probability" 
                      fill="url(#probabilityGradient)"
                      radius={[4, 4, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="probabilityGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#d946ef" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-temporal-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">87%</div>
                  <div className="text-sm text-gray-400">Average Success Rate</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Activity className="w-8 h-8 text-quantum-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">±15%</div>
                  <div className="text-sm text-gray-400">Quantum Variance</div>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <Zap className="w-8 h-8 text-collective-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">High</div>
                  <div className="text-sm text-gray-400">Confidence Level</div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'timeline' && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-quantum-400" />
                <h2 className="text-xl font-bold text-white">Temporal Optimization Timeline</h2>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timelineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Area 
                      type="monotone" 
                      dataKey="optimal_score" 
                      stackId="1"
                      stroke="#0ea5e9" 
                      fill="url(#temporalGradient)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="market_conditions" 
                      stroke="#d946ef"
                      strokeWidth={2}
                      dot={{ fill: '#d946ef', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="personal_readiness" 
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                    <defs>
                      <linearGradient id="temporalGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.8} />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-8 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-temporal-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Optimal Score</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-quantum-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Market Conditions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-collective-400 rounded-full"></div>
                  <span className="text-sm text-gray-300">Personal Readiness</span>
                </div>
              </div>
            </div>
          )}

          {activeView === 'collective' && (
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Users className="w-6 h-6 text-collective-400" />
                <h2 className="text-xl font-bold text-white">Collective Intelligence Insights</h2>
              </div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collectiveData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9CA3AF" fontSize={12} />
                    <YAxis 
                      dataKey="decision_type" 
                      type="category"
                      stroke="#9CA3AF" 
                      fontSize={12}
                      width={100}
                    />
                    <Bar 
                      dataKey="success_rate" 
                      fill="url(#collectiveGradient)"
                      radius={[0, 4, 4, 0]}
                    />
                    <defs>
                      <linearGradient id="collectiveGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#0ea5e9" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                {collectiveData.map((item, index) => (
                  <div key={item.decision_type} className="bg-white/5 rounded-lg p-4 text-center">
                    <div className="text-lg font-bold text-white">{item.total_decisions}</div>
                    <div className="text-xs text-gray-400">{item.decision_type} Decisions</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Insights Panel */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Key Insights</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Optimal timing window: May-June 2024</li>
              <li>• 92% probability of positive outcome</li>
              <li>• Market conditions highly favorable</li>
              <li>• Personal readiness at peak levels</li>
            </ul>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Risk Factors</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Economic uncertainty: Low impact</li>
              <li>• Industry volatility: Moderate</li>
              <li>• Personal constraints: Minimal</li>
              <li>• Competition levels: Manageable</li>
            </ul>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>• Begin preparation immediately</li>
              <li>• Monitor market indicators closely</li>
              <li>• Build skills during waiting period</li>
              <li>• Network within target industry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};