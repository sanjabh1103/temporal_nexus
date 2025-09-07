import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
app.use(cors());
app.use(express.json());

// Helper to wrap async route handlers for Express+TS
const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);

// ---------------- Authentication ----------------

// ---------------- User Profile CRUD ----------------
// POST /api/v1/user/profile (create or update)
app.post('/api/v1/user/profile', asyncHandler(async (req: any, res: any) => {
  const { id, name, email, is_guest = false, profile_data = {} } = req.body || {};
  if (!id || !name) return res.status(400).json({ error: 'Missing id or name' });
  try {
    const profile = {
      id,
      name,
      email,
      is_guest,
      profile_data,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('user_profiles').upsert(profile).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// GET /api/v1/user/profile (get by id, ?id=)
app.get('/api/v1/user/profile', asyncHandler(async (req: any, res: any) => {
  const { id } = req.query;
  if (!id) return res.status(400).json({ error: 'Missing id' });
  try {
    const { data, error } = await supabase.from('user_profiles').select('*').eq('id', id).single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// PUT /api/v1/user/profile (update by id)
app.put('/api/v1/user/profile', asyncHandler(async (req: any, res: any) => {
  const { id, ...updates } = req.body || {};
  if (!id) return res.status(400).json({ error: 'Missing id' });
  updates.updated_at = new Date().toISOString();
  try {
    const { data, error } = await supabase.from('user_profiles').update(updates).eq('id', id).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// Signup
app.post('/api/v1/auth/signup', asyncHandler(async (req: any, res: any) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw error;
    res.json({ userId: data.user?.id, token: data.session?.access_token });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
    console.error('Signup error', err as Error);
    res.status(500).json({ error: (err as Error).message });
  }
}));

// Login
app.post('/api/v1/auth/login', asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    res.json({ userId: data.user?.id, token: data.session?.access_token });
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
    console.error('Login error', err as Error);
    res.status(401).json({ error: (err as Error).message });
  }
}));

import { DecisionSchema, SimulationSchema, SimulationParameterSchemas } from './validationSchemas';

// Create Decision
app.post('/api/v1/decisions', asyncHandler(async (req: any, res: any) => {
  // Validate decision payload
  const parseResult = DecisionSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Invalid decision payload', details: parseResult.error.errors });
  }
  const decision = {
    ...parseResult.data,
    id: req.body.id || `decision_${Date.now()}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  try {
    const { data, error } = await supabase.from('decisions').insert([decision]).select().single();
    if (error) throw error;
    res.json(data);
  } catch (err: unknown) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// Read Decision
app.get('/api/v1/decisions/:id', asyncHandler(async (req: Request, res: Response) => {
  const { data, error } = await supabase.from('decisions').select('*').eq('id', req.params.id).single();
  if (error) throw error;
  res.json(data);
}));

// List Decisions
app.get('/api/v1/decisions', asyncHandler(async (_req: Request, res: Response) => {
  const { data, error } = await supabase
    .from('decisions')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  res.json(data);
}));

// Update Decision
app.put('/api/v1/decisions/:id', asyncHandler(async (req: Request, res: Response) => {
  const updates = { ...req.body, updated_at: new Date().toISOString() };
  const { data, error } = await supabase.from('decisions').update(updates).eq('id', req.params.id).select().single();
  if (error) throw error;
  res.json(data);
}));

// Delete Decision
app.delete('/api/v1/decisions/:id', asyncHandler(async (req: Request, res: Response) => {
  const { error } = await supabase.from('decisions').delete().eq('id', req.params.id);
  if (error) throw error;
  res.json({ status: 'deleted' });
}));

// --- Sprint 2: Advanced AI endpoints ---

// Import GeminiServiceNode from server/geminiService.node.ts
import { GeminiServiceNode } from './geminiService.node';
const gemini = new GeminiServiceNode();

// In-memory job queue for simulation/timing jobs
interface JobResult {
  status: string;
  result: any;
}
const jobs: Record<string, JobResult> = {};

// POST /api/v1/simulations (start simulation job)

app.post('/api/v1/simulations', asyncHandler(async (req: any, res: any) => {
  // Validate simulation job payload
  const simParse = SimulationSchema.safeParse(req.body);
  if (!simParse.success) {
    return res.status(400).json({ error: 'Invalid simulation payload', details: simParse.error.errors });
  }
  const { decisionId, decisionType, parameters } = req.body;
  // Validate simulation parameters by type
  const paramSchema = SimulationParameterSchemas[decisionType as keyof typeof SimulationParameterSchemas];
  if (paramSchema) {
    const paramResult = paramSchema.safeParse(parameters);
    if (!paramResult.success) {
      return res.status(400).json({ error: 'Invalid simulation parameters', details: paramResult.error.errors });
    }
  }

  const jobId = `sim_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  jobs[jobId] = { status: 'queued', result: null };
  // Simulate async job (replace with real queue in prod)
  (async () => {
    try {
      jobs[jobId].status = 'running';
      const result = await gemini.simulateOutcomes(decisionType, parameters);
      // Persist to Supabase
      await supabase.from('simulations').insert([{
        id: jobId,
        decision_id: decisionId,
        simulation_type: decisionType,
        parameters,
        results: result,
        created_at: new Date().toISOString(),
        status: 'completed'
      }]);
      jobs[jobId].status = 'completed';
      jobs[jobId].result = result;
    } catch (err) {

      jobs[jobId].status = 'failed';
      jobs[jobId].result = { error: (err as Error).message };
    }
  })();
  res.json({ jobId, status: 'queued' });
}));

// GET /api/v1/simulations/:jobId (poll job status/result)
app.get('/api/v1/simulations/:jobId', asyncHandler(async (req: any, res: any) => {
  const job = jobs[req.params.jobId];
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
}));

// POST /api/v1/timing-analysis (start timing analysis job)
app.post('/api/v1/timing-analysis', asyncHandler(async (req: any, res: any) => {
  // Validate timing analysis job payload
  const simParse = SimulationSchema.safeParse(req.body);
  if (!simParse.success) {
    return res.status(400).json({ error: 'Invalid timing analysis payload', details: simParse.error.errors });
  }
  const { decisionId, decisionType, parameters } = req.body;
  // Validate timing parameters by type
  const paramSchema = SimulationParameterSchemas[decisionType as keyof typeof SimulationParameterSchemas];
  if (paramSchema) {
    const paramResult = paramSchema.safeParse(parameters);
    if (!paramResult.success) {
      return res.status(400).json({ error: 'Invalid timing analysis parameters', details: paramResult.error.errors });
    }
  }

  const jobId = `timing_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
  jobs[jobId] = { status: 'queued', result: null };
  (async () => {
    try {
      jobs[jobId].status = 'running';
      const result = await gemini.analyzeDecision(decisionType, parameters.userInput || '', parameters);
      // Persist to Supabase
      await supabase.from('timing_analysis').insert([{
        id: jobId,
        decision_id: decisionId,
        decision_type: decisionType,
        parameters,
        results: result,
        created_at: new Date().toISOString(),
        status: 'completed'
      }]);
      jobs[jobId].status = 'completed';
      jobs[jobId].result = result;
    } catch (err) {

      jobs[jobId].status = 'failed';
      jobs[jobId].result = { error: (err as Error).message };
    }
  })();
  res.json({ jobId, status: 'queued' });
}));

// GET /api/v1/timing-analysis/:jobId (poll timing analysis status/result)
app.get('/api/v1/timing-analysis/:jobId', asyncHandler(async (req: any, res: any) => {
  const job = jobs[req.params.jobId];
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
}));

// GET /api/v1/collective-insights (retrieve cached insights) - Optional, default POST remains
app.get('/api/v1/collective-insights', asyncHandler(async (req: any, res: any) => {
  const { decisionType, userId } = req.query;
  if (!decisionType || !userId) return res.status(400).json({ error: 'Missing decisionType or userId' });
  try {
    const { data, error } = await supabase.from('collective_insights').select('*').eq('decision_type', decisionType as string).eq('user_profile->>id', userId as string);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// POST /api/v1/collective-insights (get collective intelligence)
app.post('/api/v1/collective-insights', asyncHandler(async (req: any, res: any) => {
  const { decisionType, userProfile } = req.body;
  if (!decisionType || !userProfile) return res.status(400).json({ error: 'Missing decisionType or userProfile' });
  try {
    const insights = await gemini.getCollectiveInsights(decisionType, userProfile);
    // Persist to Supabase
    await supabase.from('collective_insights').insert([{
      id: `insight_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      decision_type: decisionType,
      user_profile: userProfile,
      insights,
      created_at: new Date().toISOString()
    }]);
    res.json(insights);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// GET /api/v1/quantum-cloud/:decisionId (get quantum probability cloud)
app.get('/api/v1/quantum-cloud/:decisionId', asyncHandler(async (req: any, res: any) => {
  try {
    const { data, error } = await supabase.from('simulations').select('results').eq('decision_id', req.params.decisionId);
    if (error) throw error;
    // Synthesize probability cloud from simulation results
    const cloud = (data || []).map((row, i) => {
      const result = row.results || {};
      // Use confidence/likelihood if present, otherwise fallback
      let probability = 0.5;
      if (typeof result.confidence === 'number') probability = result.confidence;
      else if (typeof result.likelihood === 'number') probability = result.likelihood;
      else if (typeof result.probability === 'number') probability = result.probability;
      else if (result && result.analysis_result && typeof result.analysis_result.confidence === 'number') probability = result.analysis_result.confidence;
      return {
        scenario: result.scenario || `Scenario ${i+1}`,
        probability,
        ...result
      };
    });
    res.json({ decisionId: req.params.decisionId, quantumCloud: cloud });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// POST /api/v1/time-travel-test (run time-travel batch analysis)
app.post('/api/v1/time-travel-test', asyncHandler(async (req: any, res: any) => {
  const { decisionType, userInput, test_times } = req.body;
  if (!decisionType || !userInput || !Array.isArray(test_times)) return res.status(400).json({ error: 'Missing or invalid params' });
  try {
    const results = await Promise.all(test_times.map(async (t) => {
      return await gemini.analyzeDecision(decisionType, userInput, { test_time: t });
    }));
    res.json({ decisionType, userInput, test_times, results });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}));

// ----------------- ADVANCED ANALYTICS ENDPOINTS -----------------

/**
 * GET /api/v1/analytics/summary?userId=... [optionally decisionType, from, to]
 * Returns aggregate stats: total decisions, by type, by status, avg confidence, etc.
 */
app.get('/api/v1/analytics/summary', asyncHandler(async (req: any, res: any) => {
  const { userId, decisionType, from, to } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  let query = supabase.from('decisions').select('*').eq('user_id', userId);
  if (decisionType) query = query.eq('decision_type', decisionType);
  if (from) query = query.gte('created_at', from);
  if (to) query = query.lte('created_at', to);
  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  // Aggregate stats
  const total = data.length;
  const byType: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let confidenceSum = 0, confidenceCount = 0;
  data.forEach((d: any) => {
    byType[d.decision_type] = (byType[d.decision_type] || 0) + 1;
    byStatus[d.status] = (byStatus[d.status] || 0) + 1;
    if (typeof d.confidence === 'number') {
      confidenceSum += d.confidence;
      confidenceCount++;
    }
  });
  const avgConfidence = confidenceCount ? confidenceSum / confidenceCount : null;
  res.json({ total, byType, byStatus, avgConfidence });
}));

/**
 * GET /api/v1/analytics/history?userId=...&from=...&to=...
 * Returns all decisions, simulations, and insights for a user in a date range.
 */
app.get('/api/v1/analytics/history', asyncHandler(async (req: any, res: any) => {
  const { userId, from, to } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  // Decisions
  let decQ = supabase.from('decisions').select('*').eq('user_id', userId);
  if (from) decQ = decQ.gte('created_at', from);
  if (to) decQ = decQ.lte('created_at', to);
  const { data: decisions, error: decErr } = await decQ;
  if (decErr) return res.status(500).json({ error: decErr.message });
  // Simulations
  let simQ = supabase.from('simulations').select('*').eq('user_id', userId);
  if (from) simQ = simQ.gte('created_at', from);
  if (to) simQ = simQ.lte('created_at', to);
  const { data: simulations, error: simErr } = await simQ;
  if (simErr) return res.status(500).json({ error: simErr.message });
  // Insights
  let insQ = supabase.from('collective_insights').select('*').eq('user_profile->>id', userId);
  if (from) insQ = insQ.gte('created_at', from);
  if (to) insQ = insQ.lte('created_at', to);
  const { data: insights, error: insErr } = await insQ;
  if (insErr) return res.status(500).json({ error: insErr.message });
  res.json({ decisions, simulations, insights });
}));

/**
 * GET /api/v1/analytics/export?userId=...&format=json|csv
 * Returns all user data (decisions, simulations, insights) as JSON or CSV.
 */
app.get('/api/v1/analytics/export', asyncHandler(async (req: any, res: any) => {
  const { userId, format = 'json' } = req.query;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  // Fetch all
  const [decisions, simulations, insights] = await Promise.all([
    supabase.from('decisions').select('*').eq('user_id', userId),
    supabase.from('simulations').select('*').eq('user_id', userId),
    supabase.from('collective_insights').select('*').eq('user_profile->>id', userId),
  ]);
  if (decisions.error || simulations.error || insights.error) {
    return res.status(500).json({
      error: decisions.error?.message || simulations.error?.message || insights.error?.message,
    });
  }
  if (format === 'csv') {
    // Simple CSV export for decisions only (extend as needed)
    const fields = Object.keys((decisions.data || [])[0] || {});
    const csv = [fields.join(',')]
      .concat((decisions.data || []).map((row: any) => fields.map(f => JSON.stringify(row[f] ?? '')).join(',')))
      .join('\n');
    res.header('Content-Type', 'text/csv');
    res.attachment(`temporal-nexus-export-${userId}.csv`);
    return res.send(csv);
  }
  // Default: JSON
  res.json({ decisions: decisions.data, simulations: simulations.data, insights: insights.data });
}));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API server running on port ${port}`));
