import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: LucideIcon;
  color: 'temporal' | 'quantum' | 'collective';
  index: number;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color, 
  index 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'temporal':
        return 'text-temporal-400 bg-temporal-400/10';
      case 'quantum':
        return 'text-quantum-400 bg-quantum-400/10';
      case 'collective':
        return 'text-collective-400 bg-collective-400/10';
    }
  };

  return (
    <div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses()}`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className="text-sm font-medium text-collective-400 bg-collective-400/10 px-2 py-1 rounded">
          {change}
        </span>
      </div>

      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-white group-hover:scale-105 transition-transform">
          {value}
        </h3>
        <p className="text-sm text-gray-400">{title}</p>
      </div>
    </div>
  );
};