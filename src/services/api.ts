import { supabase, Decision, UserProfile, Simulation, TimingAnalysis } from './supabase';
import { geminiService } from './gemini';

// If VITE_API_BASE is defined, client will communicate with our Node/Express API instead of hitting Supabase directly.
const API_BASE: string | undefined = import.meta.env.VITE_API_BASE;

export class TemporalNexusAPI {
  /**
   * Fetch analytics summary (aggregate stats) for a user.
   * @param userId - User ID
   * @param params - Optional: { decisionType, from, to }
   */
  async getAnalyticsSummary(userId: string, params: { decisionType?: string; from?: string; to?: string } = {}) {
    if (this.useApi) {
      const q = new URLSearchParams({ userId, ...params }).toString();
      return this.fetchApi(`/api/v1/analytics/summary?${q}`);
    }
    // Fallback: aggregate from local decisions
    const decisions = this.getLocalDecisions().filter(d => d.user_id === userId);
    // Optionally filter by type/date
    const filtered = decisions.filter(d => {
      if (params.decisionType && d.decision_type !== params.decisionType) return false;
      if (params.from && d.created_at < params.from) return false;
      if (params.to && d.created_at > params.to) return false;
      return true;
    });
    const total = filtered.length;
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let confidenceSum = 0, confidenceCount = 0;
    filtered.forEach(d => {
      byType[d.decision_type] = (byType[d.decision_type] || 0) + 1;
      byStatus[d.status] = (byStatus[d.status] || 0) + 1;
      if (typeof d.confidence === 'number') {
        confidenceSum += d.confidence;
        confidenceCount++;
      }
    });
    const avgConfidence = confidenceCount ? confidenceSum / confidenceCount : null;
    return { total, byType, byStatus, avgConfidence };
  }

  /**
   * Fetch historical analytics (decisions, simulations, insights) for a user.
   * @param userId - User ID
   * @param params - Optional: { from, to }
   */
  async getAnalyticsHistory(userId: string, params: { from?: string; to?: string } = {}) {
    if (this.useApi) {
      const q = new URLSearchParams({ userId, ...params }).toString();
      return this.fetchApi(`/api/v1/analytics/history?${q}`);
    }
    // Fallback: local only (no insights)
    const decisions = this.getLocalDecisions().filter(d => d.user_id === userId &&
      (!params.from || d.created_at >= params.from) && (!params.to || d.created_at <= params.to));
    const simulations = this.getLocalSimulations().filter(s => {
      const dec = decisions.find(d => d.id === s.decision_id);
      return !!dec;
    });
    return { decisions, simulations, insights: [] };
  }

  /**
   * Export all user analytics data as JSON or CSV.
   * @param userId - User ID
   * @param format - 'json' | 'csv'
   */
  async exportAnalyticsData(userId: string, format: 'json' | 'csv' = 'json') {
    if (this.useApi) {
      const q = new URLSearchParams({ userId, format }).toString();
      return this.fetchApi(`/api/v1/analytics/export?${q}`);
    }
    // Fallback: local only, JSON
    const decisions = this.getLocalDecisions().filter(d => d.user_id === userId);
    const simulations = this.getLocalSimulations().filter(s => decisions.some(d => d.id === s.decision_id));
    // No local insights
    if (format === 'csv') {
      // CSV export for decisions only
      const fields = Object.keys(decisions[0] || {});
      const csv = [fields.join(',')]
        .concat(decisions.map(row => fields.map(f => JSON.stringify((row as any)[f] ?? '')).join(',')))
        .join('\n');
      return csv;
    }
    return { decisions, simulations, insights: [] };
  }

  /* ------------------------------------------------------------------
   * Helper: determine whether to use backend API
   * ------------------------------------------------------------------ */
  private get useApi() {
    return Boolean(API_BASE);
  }

  private async fetchApi(
    path: string,
    options: RequestInit & { jsonBody?: any } = {}
  ) {
    const { jsonBody, ...rest } = options;
    const fetchOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // allow Supabase cookies if any
      ...rest,
    };
    if (jsonBody) {
      fetchOptions.body = JSON.stringify(jsonBody);
    }
    const res = await fetch(`${API_BASE}${path}`, fetchOptions);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || res.statusText);
    }
    return res.json();
  }
  // Authentication
  async signUp(email: string, password: string, name: string) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name }
        }
      });
      
      if (error) throw error;
      
      // Create user profile
      if (data.user) {
        await this.createUserProfile(data.user.id, name, email, false);
      }
      
      return { userId: data.user?.id, token: data.session?.access_token };
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      return { userId: data.user?.id, token: data.session?.access_token };
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async createGuestUser(name: string = 'Guest User') {
    if (this.useApi) {
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const profile = await this.createUserProfile(guestId, name, undefined, true);
      return { userId: guestId, profile };
    }

    try {
      const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Store guest profile locally and in Supabase
      const profile = await this.createUserProfile(guestId, name, undefined, true);
      
      return { userId: guestId, profile };
    } catch (error) {
      console.error('Guest user creation error:', error);
      throw error;
    }
  }

  // User Profile Management
  async createUserProfile(id: string, name: string, email?: string, isGuest: boolean = false, profile_data: any = {}): Promise<UserProfile> {
    if (this.useApi) {
      const res = await this.fetchApi('/api/v1/user/profile', {
        method: 'POST',
        jsonBody: { id, name, email, is_guest: isGuest, profile_data },
      });
      return res;
    }

    try {
      const profile: UserProfile = {
        id,
        name,
        email,
        created_at: new Date().toISOString(),
        is_guest: isGuest,
        profile_data: {}
      };

      const { data, error } = await supabase
        .from('user_profiles')
        .insert([profile])
        .select()
        .single();

      if (error) {
        console.warn('Supabase profile creation failed, using local storage:', error);
        // Fallback to local storage for guests
        localStorage.setItem(`temporal_nexus_profile_${id}`, JSON.stringify(profile));
        return profile;
      }

      return data;
    } catch (error) {
      console.error('Profile creation error:', error);
      throw error;
    }
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (this.useApi) {
      const res = await this.fetchApi(`/api/v1/user/profile/${userId}`, { method: 'GET' });
      return res;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // Fallback to local storage
        const localProfile = localStorage.getItem(`temporal_nexus_profile_${userId}`);
        return localProfile ? JSON.parse(localProfile) : null;
      }

      return data;
    } catch (error) {
      console.error('Get profile error:', error);
      return null;
    }
  }

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    if (this.useApi) {
      const res = await this.fetchApi(`/api/v1/user/profile/${userId}`, {
        method: 'PUT',
        jsonBody: updates,
      });
      return res;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        // Fallback to local storage
        const localProfile = localStorage.getItem(`temporal_nexus_profile_${userId}`);
        if (localProfile) {
          const updated = { ...JSON.parse(localProfile), ...updates };
          localStorage.setItem(`temporal_nexus_profile_${userId}`, JSON.stringify(updated));
          return updated;
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  // Decision Management
  async createDecision(decisionData: Omit<Decision, 'id' | 'created_at' | 'updated_at'>): Promise<Decision> {
    // If API server present, delegate to backend
    if (this.useApi) {
      try {
        const decision = await this.fetchApi('/decisions', {
          method: 'POST',
          jsonBody: decisionData,
        });
        // Trigger analysis via backend later (future work)
        return decision;
      } catch (error) {
        console.error('Backend createDecision error, falling back to Supabase:', error);
      }
    }
    try {
      const decision: Decision = {
        ...decisionData,
        id: `decision_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('decisions')
        .insert([decision])
        .select()
        .single();

      if (error) {
        console.warn('Supabase decision creation failed, using local storage:', error);
        // Fallback to local storage
        const decisions = this.getLocalDecisions();
        decisions.unshift(decision);
        localStorage.setItem('temporal_nexus_decisions', JSON.stringify(decisions));
        
        // Start analysis in background
        this.analyzeDecisionWithGemini(decision);
        
        return decision;
      }

      // Start analysis in background
      this.analyzeDecisionWithGemini(data);

      return data;
    } catch (error) {
      console.error('Create decision error:', error);
      throw error;
    }
  }

  async getDecision(decisionId: string): Promise<Decision | null> {
    if (this.useApi) {
      try {
        return await this.fetchApi(`/decisions/${decisionId}`);
      } catch (error) {
        console.warn('Backend getDecision failed, falling back:', error);
      }
    }
    try {
      const { data, error } = await supabase
        .from('decisions')
        .select('*')
        .eq('id', decisionId)
        .single();

      if (error) {
        // Fallback to local storage
        const decisions = this.getLocalDecisions();
        return decisions.find(d => d.id === decisionId) || null;
      }

      return data;
    } catch (error) {
      console.error('Get decision error:', error);
      return null;
    }
  }

  async getUserDecisions(userId: string): Promise<Decision[]> {
    if (this.useApi) {
      try {
        return await this.fetchApi(`/decisions?user_id=${encodeURIComponent(userId)}`);
      } catch (error) {
        console.warn('Backend listDecisions failed, falling back:', error);
      }
    }
    try {
      const { data, error } = await supabase
        .from('decisions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        // Fallback to local storage
        return this.getLocalDecisions().filter(d => d.user_id === userId);
      }

      return data || [];
    } catch (error) {
      console.error('Get user decisions error:', error);
      return this.getLocalDecisions().filter(d => d.user_id === userId);
    }
  }

  async updateDecision(decisionId: string, updates: Partial<Decision>): Promise<Decision | null> {
    if (this.useApi) {
      try {
        return await this.fetchApi(`/decisions/${decisionId}`, {
          method: 'PUT',
          jsonBody: updates,
        });
      } catch (error) {
        console.warn('Backend updateDecision failed, falling back:', error);
      }
    }
    try {
      const updatedData = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('decisions')
        .update(updatedData)
        .eq('id', decisionId)
        .select()
        .single();

      if (error) {
        // Fallback to local storage
        const decisions = this.getLocalDecisions();
        const index = decisions.findIndex(d => d.id === decisionId);
        if (index !== -1) {
          decisions[index] = { ...decisions[index], ...updatedData };
          localStorage.setItem('temporal_nexus_decisions', JSON.stringify(decisions));
          return decisions[index];
        }
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Update decision error:', error);
      throw error;
    }
  }

  // Gemini Integration for Decision Analysis
  private async analyzeDecisionWithGemini(decision: Decision) {
    try {
      console.log('Starting Gemini analysis for decision:', decision.id);
      
      // Update status to analyzing
      await this.updateDecision(decision.id, { status: 'analyzing' });

      // Analyze with Gemini
      const analysis = await geminiService.analyzeDecision(
        decision.decision_type,
        `${decision.title}. ${decision.description}`,
        {
          timeframe: decision.timeframe,
          priority: decision.priority
        }
      );

      // Simulate outcomes
      const simulation = await geminiService.simulateOutcomes(
        decision.decision_type,
        analysis.extracted_data
      );

      // Update decision with results
      await this.updateDecision(decision.id, {
        status: 'completed',
        confidence: analysis.confidence_score,
        analysis_result: analysis,
        simulation_result: simulation
      });

      console.log('Gemini analysis completed for decision:', decision.id);
    } catch (error) {
      console.error('Gemini analysis error:', error);
      await this.updateDecision(decision.id, { 
        status: 'pending',
        analysis_result: { error: 'Analysis failed, please try again' }
      });
    }
  }

  // Timing Analysis
  async performTimingAnalysis(decisionId: string, timeframe: string): Promise<any> {
    if (this.useApi) {
      // Start job
      const jobRes = await this.fetchApi('/api/v1/timing-analysis', {
        method: 'POST',
        jsonBody: { decisionId, decisionType: 'timing_analysis', parameters: { timeframe } },
      });
      // Poll job
      let status = jobRes.status;
      let pollRes;
      while (status === 'queued' || status === 'running') {
        await new Promise(r => setTimeout(r, 1000));
        pollRes = await this.fetchApi(`/api/v1/timing-analysis/${jobRes.jobId}`, { method: 'GET' });
        status = pollRes.status;
      }
      return pollRes.result;
    }

    try {
      const decision = await this.getDecision(decisionId);
      if (!decision) throw new Error('Decision not found');

      const analysis = await geminiService.analyzeDecision(
        decision.decision_type,
        `${decision.title}. ${decision.description}`,
        { timeframe, priority: decision.priority }
      );

      return {
        timingWindows: analysis.timing_analysis.optimal_windows,
        marketConditions: analysis.timing_analysis.market_conditions,
        personalReadiness: analysis.timing_analysis.personal_readiness,
        recommendations: analysis.recommendations
      };
    } catch (error) {
      console.error('Timing analysis error:', error);
      throw error;
    }
  }

  // Collective Insights
  async getCollectiveInsights(decisionType: string, userProfile: any): Promise<any> {
    try {
      return await geminiService.getCollectiveInsights(decisionType, userProfile);
    } catch (error) {
      console.error('Collective insights error:', error);
      throw error;
    }
  }

  // Simulation Management
  async runSimulation(decisionId: string, simulationType: string, parameters: any): Promise<Simulation> {
    if (this.useApi) {
      // Start job
      const jobRes = await this.fetchApi('/api/v1/simulations', {
        method: 'POST',
        jsonBody: { decisionId, decisionType: simulationType, parameters },
      });
      // Poll job
      let status = jobRes.status;
      let pollRes;
      while (status === 'queued' || status === 'running') {
        await new Promise(r => setTimeout(r, 1000));
        pollRes = await this.fetchApi(`/api/v1/simulations/${jobRes.jobId}`, { method: 'GET' });
        status = pollRes.status;
      }
      return { ...pollRes.result, id: jobRes.jobId, decision_id: decisionId, simulation_type: simulationType, parameters, status };
    }

    try {
      const decision = await this.getDecision(decisionId);
      if (!decision) throw new Error('Decision not found');

      const simulation: Simulation = {
        id: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        decision_id: decisionId,
        simulation_type: simulationType,
        parameters,
        results: {},
        created_at: new Date().toISOString(),
        status: 'running'
      };

      // Run simulation with Gemini
      const results = await geminiService.simulateOutcomes(decision.decision_type, parameters);
      
      simulation.results = results;
      simulation.status = 'completed';

      // Store simulation (with fallback to local storage)
      try {
        const { data, error } = await supabase
          .from('simulations')
          .insert([simulation])
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (supabaseError) {
        // Fallback to local storage
        const simulations = this.getLocalSimulations();
        simulations.unshift(simulation);
        localStorage.setItem('temporal_nexus_simulations', JSON.stringify(simulations));
        return simulation;
      }
    } catch (error) {
      console.error('Run simulation error:', error);
      throw error;
    }
  }

  async getSimulation(simulationId: string): Promise<Simulation | null> {
    try {
      const { data, error } = await supabase
        .from('simulations')
        .select('*')
        .eq('id', simulationId)
        .single();

      if (error) {
        // Fallback to local storage
        const simulations = this.getLocalSimulations();
        return simulations.find(s => s.id === simulationId) || null;
      }

      return data;
    } catch (error) {
      console.error('Get simulation error:', error);
      return null;
    }
  }

  // Local Storage Helpers
  private getLocalDecisions(): Decision[] {
    const decisions = localStorage.getItem('temporal_nexus_decisions');
    return decisions ? JSON.parse(decisions) : [];
  }

  private getLocalSimulations(): Simulation[] {
    const simulations = localStorage.getItem('temporal_nexus_simulations');
    return simulations ? JSON.parse(simulations) : [];
  }
}

export const temporalAPI = new TemporalNexusAPI();