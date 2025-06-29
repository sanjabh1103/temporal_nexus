import React, { useState } from 'react';
import { Menu, X, Home, BarChart3, Plus, Layers, User, Bell } from 'lucide-react';
import { NotificationSystem } from './NotificationSystem';

interface MobileOptimizedLayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: 'home' | 'dashboard' | 'wizard' | 'quantum') => void;
  user: any;
}

export const MobileOptimizedLayout: React.FC<MobileOptimizedLayoutProps> = ({
  children,
  currentView,
  onViewChange,
  user
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'wizard', label: 'New Decision', icon: Plus },
    { id: 'quantum', label: 'Quantum View', icon: Layers }
  ];

  return (
    <div className="min-h-screen bg-gray-950 relative overflow-hidden">
      {/* Mobile Header */}
      <header className="lg:hidden relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-temporal-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TN</span>
            </div>
            <div>
              <h1 className="text-lg font-bold bg-temporal-gradient bg-clip-text text-transparent">
                TEMPORAL NEXUS
              </h1>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center space-x-2">
            <NotificationSystem />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-white/10 text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
            <div className="p-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id as any);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-temporal-500/20 text-temporal-300'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              
              {/* User Profile in Mobile Menu */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-temporal-400 to-quantum-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{user?.name || 'Guest User'}</p>
                    <p className="text-xs text-gray-400">ID: {user?.id?.slice(0, 8) || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block relative z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => onViewChange('home')}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-temporal-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-sm">TN</span>
                </div>
                <div className="absolute inset-0 bg-temporal-400/20 rounded-lg blur-xl scale-150 group-hover:bg-temporal-300/30 transition-all" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-temporal-gradient bg-clip-text text-transparent">
                  TEMPORAL NEXUS
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Decision Intelligence</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              {navigationItems.slice(1).map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onViewChange(item.id as any)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      currentView === item.id
                        ? 'bg-temporal-500/20 text-temporal-300'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* User Profile & Notifications */}
            <div className="flex items-center space-x-3">
              <NotificationSystem />
              <div className="text-right">
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

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 z-40">
        <div className="grid grid-cols-4 gap-1 p-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                  currentView === item.id
                    ? 'bg-temporal-500/20 text-temporal-300'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Padding for Bottom Nav */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};