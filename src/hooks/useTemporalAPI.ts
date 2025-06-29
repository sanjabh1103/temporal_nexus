import { useState, useEffect } from 'react';
import { temporalAPI } from '../services/api';
import { Decision, UserProfile } from '../services/supabase';

export const useTemporalAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAPICall = async <T>(apiCall: () => Promise<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await apiCall();
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      console.error('API call error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleAPICall,
    
    // Authentication
    signUp: (email: string, password: string, name: string) =>
      handleAPICall(() => temporalAPI.signUp(email, password, name)),
    
    signIn: (email: string, password: string) =>
      handleAPICall(() => temporalAPI.signIn(email, password)),
    
    createGuestUser: (name?: string) =>
      handleAPICall(() => temporalAPI.createGuestUser(name)),
    
    // User Profile
    getUserProfile: (userId: string) =>
      handleAPICall(() => temporalAPI.getUserProfile(userId)),
    
    updateUserProfile: (userId: string, updates: Partial<UserProfile>) =>
      handleAPICall(() => temporalAPI.updateUserProfile(userId, updates)),
    
    // Decisions
    createDecision: (decisionData: Omit<Decision, 'id' | 'created_at' | 'updated_at'>) =>
      handleAPICall(() => temporalAPI.createDecision(decisionData)),
    
    getDecision: (decisionId: string) =>
      handleAPICall(() => temporalAPI.getDecision(decisionId)),
    
    getUserDecisions: (userId: string) =>
      handleAPICall(() => temporalAPI.getUserDecisions(userId)),
    
    updateDecision: (decisionId: string, updates: Partial<Decision>) =>
      handleAPICall(() => temporalAPI.updateDecision(decisionId, updates)),
    
    // Analysis
    performTimingAnalysis: (decisionId: string, timeframe: string) =>
      handleAPICall(() => temporalAPI.performTimingAnalysis(decisionId, timeframe)),
    
    getCollectiveInsights: (decisionType: string, userProfile: any) =>
      handleAPICall(() => temporalAPI.getCollectiveInsights(decisionType, userProfile)),
    
    // Simulations
    runSimulation: (decisionId: string, simulationType: string, parameters: any) =>
      handleAPICall(() => temporalAPI.runSimulation(decisionId, simulationType, parameters))
  };
};

export const useDecisions = (userId: string) => {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const api = useTemporalAPI();

  useEffect(() => {
    const loadDecisions = async () => {
      setLoading(true);
      const result = await api.getUserDecisions(userId);
      if (result) {
        setDecisions(result);
      }
      setLoading(false);
    };

    if (userId) {
      loadDecisions();
    }
  }, [userId]);

  const createDecision = async (decisionData: Omit<Decision, 'id' | 'created_at' | 'updated_at'>) => {
    const result = await api.createDecision(decisionData);
    if (result) {
      setDecisions(prev => [result, ...prev]);
      return result;
    }
    return null;
  };

  const updateDecision = async (decisionId: string, updates: Partial<Decision>) => {
    const result = await api.updateDecision(decisionId, updates);
    if (result) {
      setDecisions(prev => prev.map(d => d.id === decisionId ? result : d));
      return result;
    }
    return null;
  };

  return {
    decisions,
    loading,
    error,
    createDecision,
    updateDecision,
    refreshDecisions: () => {
      if (userId) {
        api.getUserDecisions(userId).then(result => {
          if (result) setDecisions(result);
        });
      }
    }
  };
};