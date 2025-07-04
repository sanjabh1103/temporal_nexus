import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiServiceNode {
  model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  async analyzeDecision(decisionType: string, userInput: string, additionalContext?: any): Promise<string> {
    // PRD-specific system prompts
    const prompts: Record<string, (userInput: string, ctx: any) => string> = {
      'career_change': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing the timing for career changes via the /api/v1/timing-analysis endpoint.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: current job, industry, experience, location, desired path, timeframe. Validate and clarify as needed.`,
      'marriage': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, simulating marriage vs staying single.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: relationship status, age, financials, life goals. Simulate outcomes. Clarify and validate as needed.`,
      'investment': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, optimizing investment timing.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: asset type, risk, goals, timeframe. Clarify and validate as needed.`,
      'relocation': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, simulating relocation outcomes.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: current location, destination, timeframe, preferences. Model quality of life and career impacts.`,
      'education_path': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, simulating education path outcomes.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: education level, interests, goals, options, timeframe. Validate majors. Return job prospects and satisfaction.`,
      'health': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, optimizing health treatment timing.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: current treatments, health goals, options, timeframe. Clarify and validate as needed.`,
      'retirement': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, optimizing retirement timing.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: savings, income, expenses, retirement goals, timeframe. Clarify and validate as needed.`,
      'startup_launch': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, optimizing startup launch timing.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: business idea, market, competition, planning period. Analyze trends and feasibility.`,
      'real_estate': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, optimizing real estate purchase timing.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: location, budget, property type, timeframe. Analyze market and forecasts.`,
      'personal_development': (u, ctx) => `You are an AI assistant for the TEMPORAL NEXUS platform, optimizing personal development timing.\nUser Input: "${u}"\nContext: ${JSON.stringify(ctx)}\nExtract: goals, constraints, resources, timeframe. Analyze learning curves and motivation cycles.`
    };
    const fn = prompts[decisionType] || ((u, ctx) => `Analyze a ${decisionType} decision.\nUser Input: "${u}"\n${ctx ? `Context: ${JSON.stringify(ctx)}` : ''}`);
    const prompt = fn(userInput, additionalContext);
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async simulateOutcomes(decisionType: string, parameters: any): Promise<string> {
    // PRD-specific simulation prompts
    const simPrompts: Record<string, (params: any) => string> = {
      'career_change': (p) => `Simulate optimal career change timing using: ${JSON.stringify(p)}. Return optimal_timing_windows and rationale.`,
      'marriage': (p) => `Simulate marriage vs staying single with: ${JSON.stringify(p)}. Return outcome projections and regrets.`,
      'investment': (p) => `Simulate investment timing for: ${JSON.stringify(p)}. Return optimal buy/sell windows and risk.`,
      'relocation': (p) => `Simulate relocation outcomes for: ${JSON.stringify(p)}. Return quality of life and career impact.`,
      'education_path': (p) => `Simulate education path outcomes for: ${JSON.stringify(p)}. Return job prospects and satisfaction scores.`,
      'health': (p) => `Simulate health treatment outcomes for: ${JSON.stringify(p)}. Return health projections and risks.`,
      'retirement': (p) => `Simulate retirement timing for: ${JSON.stringify(p)}. Return optimal retirement windows and financial projections.`,
      'startup_launch': (p) => `Simulate startup launch timing for: ${JSON.stringify(p)}. Return market timing and success likelihood.`,
      'real_estate': (p) => `Simulate real estate purchase timing for: ${JSON.stringify(p)}. Return optimal purchase windows and forecasts.`,
      'personal_development': (p) => `Simulate personal development timing for: ${JSON.stringify(p)}. Return optimal learning schedule and progress plan.`
    };
    const fn = simPrompts[decisionType] || ((params) => `Simulate outcomes for a ${decisionType} decision with parameters: ${JSON.stringify(params, null, 2)}`);
    const prompt = fn(parameters);
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async getCollectiveInsights(decisionType: string, userProfile: any): Promise<string> {
    const prompt = `Provide collective intelligence insights for ${decisionType} decisions. User profile: ${JSON.stringify(userProfile)}`;
    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}
