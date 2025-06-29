import React, { useState, useEffect } from 'react';
import { MobileOptimizedLayout } from './components/MobileOptimizedLayout';
import { Hero } from './components/Hero';
import { Dashboard } from './components/Dashboard';
import { DecisionWizard } from './components/DecisionWizard';
import { QuantumVisualization } from './components/QuantumVisualization';
import { QuantumVisualization3D } from './components/QuantumVisualization3D';
import { AdvancedTimeline } from './components/AdvancedTimeline';
import { DataExportImport } from './components/DataExportImport';
import { ParticleBackground } from './components/ParticleBackground';
import { UserStorage } from './utils/storage';
import { temporalAPI } from './services/api';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'wizard' | 'quantum'>('home');
  const [user, setUser] = useState(UserStorage.getUser());
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Initialize user and API connection
    const initializeApp = async () => {
      try {
        if (!user) {
          // Create guest user with API integration
          const result = await temporalAPI.createGuestUser();
          if (result) {
            setUser(result.profile);
            UserStorage.createUser(result.profile);
          } else {
            // Fallback to local storage
            const newUser = UserStorage.createUser();
            setUser(newUser);
          }
        }
      } catch (error) {
        console.error('App initialization error:', error);
        // Fallback to local storage
        const newUser = UserStorage.createUser();
        setUser(newUser);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeApp();
  }, [user]);

  const handleViewChange = (view: 'home' | 'dashboard' | 'wizard' | 'quantum') => {
    setCurrentView(view);
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-temporal-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-white mb-2">Initializing Temporal Nexus</h2>
          <p className="text-gray-400">Connecting to AI systems...</p>
        </div>
      </div>
    );
  }

  return (
    <MobileOptimizedLayout
      currentView={currentView}
      onViewChange={handleViewChange}
      user={user}
    >
      <ParticleBackground />
      
      <div className="relative">
        {currentView === 'home' && (
          <div className="space-y-8">
            <Hero onGetStarted={() => setCurrentView('dashboard')} />
          </div>
        )}
        
        {currentView === 'dashboard' && (
          <div className="space-y-8 pb-8">
            <Dashboard onStartDecision={() => setCurrentView('wizard')} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <AdvancedTimeline timeframe="1_year" />
                <DataExportImport />
              </div>
            </div>
          </div>
        )}
        
        {currentView === 'wizard' && (
          <DecisionWizard onComplete={() => setCurrentView('dashboard')} />
        )}
        
        {currentView === 'quantum' && (
          <div className="space-y-8 pb-8">
            <QuantumVisualization />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <QuantumVisualization3D />
            </div>
          </div>
        )}
      </div>
    </MobileOptimizedLayout>
  );
}

export default App;