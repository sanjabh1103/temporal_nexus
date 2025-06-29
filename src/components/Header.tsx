import React from 'react';
import { Brain, Clock, Zap, Users, User } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'home' | 'dashboard' | 'wizard' | 'quantum') => void;
  user: any;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onViewChange, user }) => {
  return (
    <header className="relative z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => onViewChange('home')}
          >
            <div className="relative">
              <Brain className="w-8 h-8 text-temporal-400 group-hover:text-temporal-300 transition-colors" />
              <div className="absolute inset-0 bg-temporal-400/20 rounded-full blur-xl scale-150 group-hover:bg-temporal-300/30 transition-all" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold bg-temporal-gradient bg-clip-text text-transparent">
                TEMPORAL NEXUS
              </h1>
              <p className="text-xs text-gray-400 -mt-1">Decision Intelligence</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                currentView === 'dashboard'
                  ? 'bg-temporal-500/20 text-temporal-300'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => onViewChange('wizard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                currentView === 'wizard'
                  ? 'bg-quantum-500/20 text-quantum-300'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>New Decision</span>
            </button>
            
            <button
              onClick={() => onViewChange('quantum')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                currentView === 'quantum'
                  ? 'bg-collective-500/20 text-collective-300'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Quantum View</span>
            </button>
          </nav>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm text-white">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-gray-400">ID: {user?.id?.slice(0, 8) || 'N/A'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-temporal-400 to-quantum-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};