import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Decision {
  id: string;
  user_id: string;
  decision_type: string;
  title: string;
  description: string;
  timeframe: string;
  priority: 'low' | 'medium' | 'high';
  status: 'analyzing' | 'completed' | 'pending';
  created_at: string;
  updated_at: string;
  confidence?: number;
  analysis_result?: any;
  simulation_result?: any;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  created_at: string;
  is_guest: boolean;
  profile_data?: any;
}

export interface Simulation {
  id: string;
  decision_id: string;
  simulation_type: string;
  parameters: any;
  results: any;
  created_at: string;
  status: 'running' | 'completed' | 'failed';
}

export interface TimingAnalysis {
  id: string;
  decision_id: string;
  timeframe: string;
  optimal_windows: any;
  market_conditions: any;
  personal_readiness: any;
  created_at: string;
}