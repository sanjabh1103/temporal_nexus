import React from 'react';
import { Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

interface Insight {
  type: 'optimal' | 'warning' | 'neutral';
  message: string;
  timeframe: string;
}

interface TimingInsightsProps {
  insights: Insight[];
}

export const TimingInsights: React.FC<TimingInsightsProps> = ({ insights }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'optimal':
        return <CheckCircle className="w-4 h-4 text-collective-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-temporal-400" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'optimal':
        return 'border-l-collective-400';
      case 'warning':
        return 'border-l-yellow-400';
      default:
        return 'border-l-temporal-400';
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-temporal-400" />
        <h3 className="text-lg font-semibold text-white">Timing Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <div
              key={index}
              className={`p-3 bg-white/5 border-l-4 ${getInsightColor(insight.type)} rounded-r-lg`}
            >
              <div className="flex items-start space-x-2">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-300 mb-1">{insight.message}</p>
                  <p className="text-xs text-gray-500">{insight.timeframe}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <Clock className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No timing insights available</p>
            <p className="text-xs text-gray-500 mt-1">Create a decision to see insights</p>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Last updated</span>
          <span className="text-temporal-400">Just now</span>
        </div>
      </div>
    </div>
  );
};