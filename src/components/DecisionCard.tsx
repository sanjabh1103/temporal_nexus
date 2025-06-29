import React from 'react';
import { Clock, TrendingUp, Brain, CheckCircle, AlertCircle, Loader, Sparkles } from 'lucide-react';

interface Decision {
  id: string;
  decision_type: string;
  title: string;
  status: 'analyzing' | 'completed' | 'pending';
  created_at: string;
  priority: 'low' | 'medium' | 'high';
  confidence?: number;
  analysis_result?: any;
}

interface DecisionCardProps {
  decision: Decision;
  index: number;
}

export const DecisionCard: React.FC<DecisionCardProps> = ({ decision, index }) => {
  const getStatusIcon = () => {
    switch (decision.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-collective-400" />;
      case 'analyzing':
        return <Loader className="w-5 h-5 text-temporal-400 animate-spin" />;
      case 'pending':
        return <AlertCircle className="w-5 h-5 text-yellow-400" />;
    }
  };

  const getStatusText = () => {
    switch (decision.status) {
      case 'completed':
        return 'AI Analysis Complete';
      case 'analyzing':
        return 'AI Processing...';
      case 'pending':
        return 'Awaiting Analysis';
    }
  };

  const getPriorityColor = () => {
    switch (decision.priority) {
      case 'high':
        return 'text-red-400 bg-red-400/10';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'low':
        return 'text-green-400 bg-green-400/10';
    }
  };

  const formatDecisionType = (type: string) => {
    return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-white group-hover:text-temporal-300 transition-colors">
              {decision.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}>
              {decision.priority}
            </span>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <Sparkles className="w-4 h-4 text-temporal-400" />
            <p className="text-sm text-gray-400">
              {formatDecisionType(decision.decision_type)} Decision
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className="text-sm text-gray-300">{getStatusText()}</span>
        </div>

        {decision.confidence && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-temporal-400" />
            <span className="text-sm font-medium text-temporal-400">
              {decision.confidence}% confidence
            </span>
          </div>
        )}
      </div>

      {decision.status === 'completed' && decision.analysis_result && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="space-y-2">
            {decision.analysis_result.recommendations?.primary_recommendation && (
              <div className="text-sm text-gray-300">
                <span className="text-temporal-400 font-medium">AI Recommendation:</span>
                <p className="mt-1">{decision.analysis_result.recommendations.primary_recommendation}</p>
              </div>
            )}
            {decision.analysis_result.timing_analysis?.optimal_windows && (
              <div className="text-sm">
                <span className="text-quantum-400 font-medium">Optimal Timing:</span>
                <span className="text-gray-300 ml-2">
                  {decision.analysis_result.timing_analysis.optimal_windows.slice(0, 2).join(', ')}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-3 text-xs text-gray-500">
        Created {new Date(decision.created_at).toLocaleDateString()}
      </div>
    </div>
  );
};