// Parameter and type validation schemas for Temporal Nexus backend (Zod)
import { z } from 'zod';

export const DecisionTypes = [
  'career_change',
  'investment',
  'marriage',
  'relocation',
  'health',
  'retirement',
  'startup_launch',
  'real_estate',
  'personal_development',
] as const;

export const DecisionSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  decision_type: z.enum(DecisionTypes),
  title: z.string().min(3),
  description: z.string().min(5),
  timeframe: z.string().min(2),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['analyzing', 'completed', 'pending']).optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  confidence: z.number().optional(),
  results: z.any().optional(),
});

export const SimulationSchema = z.object({
  decisionId: z.string(),
  decisionType: z.enum(DecisionTypes),
  parameters: z.object({}).passthrough(), // Accept any object, further validation per type below
});

// Example: parameter schemas per decision type
export const SimulationParameterSchemas: Record<typeof DecisionTypes[number], z.ZodSchema> = {
  career_change: z.object({
    current_job: z.string(),
    industry: z.string(),
    experience_years: z.number().min(0),
    location: z.string(),
    desired_path: z.string(),
    timeframe: z.string(),
  }),
  investment: z.object({
    asset: z.string(),
    amount: z.number().min(1),
    risk_tolerance: z.enum(['low', 'medium', 'high']),
    timeframe: z.string(),
  }),
  marriage: z.object({
    partner_name: z.string(),
    relationship_years: z.number().min(0),
    location: z.string(),
    timeframe: z.string(),
  }),
  relocation: z.object({
    from: z.string(),
    to: z.string(),
    reason: z.string(),
    timeframe: z.string(),
  }),
  health: z.object({
    condition: z.string(),
    treatment_options: z.array(z.string()),
    timeframe: z.string(),
  }),
  retirement: z.object({
    current_age: z.number().min(18),
    savings: z.number().min(0),
    desired_age: z.number().min(18),
    location: z.string(),
  }),
  startup_launch: z.object({
    industry: z.string(),
    capital: z.number().min(0),
    team_size: z.number().min(1),
    location: z.string(),
    timeframe: z.string(),
  }),
  real_estate: z.object({
    property_type: z.string(),
    budget: z.number().min(1),
    location: z.string(),
    timeframe: z.string(),
  }),
  personal_development: z.object({
    goal: z.string(),
    skills: z.array(z.string()),
    timeframe: z.string(),
  }),
};

export type DecisionType = typeof DecisionTypes[number];
