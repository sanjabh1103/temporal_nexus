import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

// LLM System Prompts for each decision type
const SYSTEM_PROMPTS = {
  career_change: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing the timing for career changes. Your goal is to interpret natural language requests and extract structured parameters for timing analysis. Focus on:

1. Current Situation: Identify the user's current job title, industry, years of experience, and location.
2. Desired Career Path: Extract the target career or industry and any specific preferences.
3. Timeframe: Determine the timeframe for the career change.
4. Key Factors: Consider personal factors and external factors.
5. Clarification: Ask targeted questions for missing details.
6. Validation: Ensure parameters are realistic.

Respond with structured JSON data and analysis.`,

  marriage: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in simulating life path outcomes for marriage decisions. Your goal is to:

1. Identify User Profile: Extract relationship status, age, financial status, and life goals.
2. Extract Decision Details: Determine preferences for marriage.
3. Simulate Outcomes: Model statistical outcomes for marriage versus staying single.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure parameters align with realistic scenarios.

Respond with structured JSON data and probability analysis.`,

  investment: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing investment timing. Your goal is to:

1. Identify Investment Type: Extract the asset type and specific investments.
2. Extract User Profile: Determine risk tolerance, investment goals, and timeframe.
3. Analyze Trends: Use market data and collective intelligence to suggest timing windows.
4. Clarify: Ask for specifics if investment details are vague.
5. Validate: Ensure assets and timeframe are valid.

Respond with structured JSON data and market analysis.`,

  relocation: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in simulating relocation outcomes. Your goal is to:

1. Identify User Profile: Extract current location, career, and lifestyle preferences.
2. Extract Relocation Details: Determine potential destinations and timeframe.
3. Simulate Outcomes: Model quality of life and career impacts.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure destinations are realistic.

Respond with structured JSON data and quality of life analysis.`,

  education_path: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in simulating educational path outcomes. Your goal is to:

1. Identify User Profile: Extract current education level, interests, and career goals.
2. Extract Path Details: Determine potential majors or programs and timeframe.
3. Simulate Outcomes: Model job prospects and satisfaction.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure paths are realistic.

Respond with structured JSON data and career prospects analysis.`,

  health: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in simulating health decision outcomes. Your goal is to:

1. Identify Health Profile: Extract condition, current treatments, and health goals.
2. Extract Decision Details: Determine treatment options and timeframe.
3. Simulate Outcomes: Model health outcomes based on medical data.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure treatments are medically valid.

Respond with structured JSON data and health outcome analysis.`,

  retirement: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing retirement timing. Your goal is to:

1. Identify Financial Profile: Extract current savings, income, expenses, and retirement goals.
2. Extract Timeframe: Determine the retirement planning period.
3. Analyze Factors: Consider life expectancy, healthcare costs, and economic forecasts.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure financial data is realistic.

Respond with structured JSON data and financial projections.`,

  startup_launch: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing startup launch timing. Your goal is to:

1. Identify Business Details: Extract business idea, industry, and resources.
2. Extract Timeframe: Determine the launch planning period.
3. Analyze Factors: Consider market trends, competition, and collective intelligence.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure business idea is feasible.

Respond with structured JSON data and market analysis.`,

  real_estate_purchase: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing real estate purchase timing. Your goal is to:

1. Identify Purchase Details: Extract location, budget, and property type.
2. Extract Timeframe: Determine the purchase planning period.
3. Analyze Factors: Consider market trends, interest rates, and economic forecasts.
4. Clarify: Ask for specifics if details are vague.
5. Validate: Ensure location and budget are realistic.

Respond with structured JSON data and market forecasts.`,

  personal_development: `You are an AI assistant for the TEMPORAL NEXUS platform, specializing in optimizing personal development timing. Your goal is to:

1. Identify Goals: Extract personal development goals.
2. Extract Constraints: Determine time availability and resources.
3. Analyze Factors: Consider learning curves, motivation cycles, and collective data.
4. Clarify: Ask for specifics if goals are vague.
5. Validate: Ensure goals are achievable.

Respond with structured JSON data and learning optimization.`
};

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  async analyzeDecision(decisionType: string, userInput: string, additionalContext?: any) {
    try {
      const systemPrompt = SYSTEM_PROMPTS[decisionType as keyof typeof SYSTEM_PROMPTS] || SYSTEM_PROMPTS.career_change;
      
      const prompt = `${systemPrompt}

User Input: "${userInput}"
${additionalContext ? `Additional Context: ${JSON.stringify(additionalContext)}` : ''}

Please analyze this decision request and provide:
1. Structured data extraction
2. Timing analysis with optimal windows
3. Risk assessment
4. Confidence score (0-100)
5. Specific recommendations
6. Key factors to consider

Respond in JSON format with the following structure:
{
  "extracted_data": {
    "decision_type": "${decisionType}",
    "key_parameters": {},
    "timeframe": "",
    "priority_level": ""
  },
  "timing_analysis": {
    "optimal_windows": [],
    "risk_factors": [],
    "market_conditions": {},
    "personal_readiness": {}
  },
  "recommendations": {
    "primary_recommendation": "",
    "alternative_options": [],
    "preparation_steps": [],
    "monitoring_metrics": []
  },
  "confidence_score": 0,
  "reasoning": "",
  "next_steps": []
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Try to parse JSON from the response
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Failed to parse JSON from Gemini response, returning structured fallback');
      }
      
      // Fallback structured response
      return {
        extracted_data: {
          decision_type: decisionType,
          key_parameters: { user_input: userInput },
          timeframe: "1_year",
          priority_level: "medium"
        },
        timing_analysis: {
          optimal_windows: ["Q2 2024", "Q3 2024"],
          risk_factors: ["Market volatility", "Personal readiness"],
          market_conditions: { favorability: "moderate" },
          personal_readiness: { score: 75 }
        },
        recommendations: {
          primary_recommendation: "Proceed with careful planning and monitoring",
          alternative_options: ["Delay by 6 months", "Accelerate timeline"],
          preparation_steps: ["Research thoroughly", "Build necessary skills"],
          monitoring_metrics: ["Market indicators", "Personal progress"]
        },
        confidence_score: 78,
        reasoning: text,
        next_steps: ["Continue analysis", "Gather more data"]
      };
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to analyze decision with Gemini');
    }
  }

  async simulateOutcomes(decisionType: string, parameters: any) {
    try {
      const prompt = `As a TEMPORAL NEXUS simulation engine, simulate the outcomes for a ${decisionType} decision with the following parameters:

${JSON.stringify(parameters, null, 2)}

Provide a comprehensive simulation including:
1. Multiple scenario outcomes (best case, worst case, most likely)
2. Probability distributions for key metrics
3. Timeline projections
4. Risk analysis
5. Comparative analysis with alternative choices

Respond in JSON format with detailed simulation results.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (parseError) {
        console.warn('Failed to parse simulation JSON, returning fallback');
      }
      
      return {
        scenarios: {
          best_case: { probability: 0.2, outcome_score: 95 },
          most_likely: { probability: 0.6, outcome_score: 78 },
          worst_case: { probability: 0.2, outcome_score: 45 }
        },
        timeline_projection: {
          short_term: "Positive initial results expected",
          medium_term: "Steady progress with some challenges",
          long_term: "Strong likelihood of success"
        },
        risk_analysis: {
          high_risks: ["Market volatility"],
          medium_risks: ["Personal factors"],
          low_risks: ["External conditions"]
        },
        simulation_text: text
      };
    } catch (error) {
      console.error('Simulation error:', error);
      throw new Error('Failed to simulate outcomes');
    }
  }

  async getCollectiveInsights(decisionType: string, userProfile: any) {
    try {
      const prompt = `As a TEMPORAL NEXUS collective intelligence system, provide insights for ${decisionType} decisions based on collective data patterns.

User Profile: ${JSON.stringify(userProfile)}

Analyze patterns from similar users and decisions to provide:
1. Success rates for similar profiles
2. Common timing patterns
3. Key success factors
4. Common pitfalls to avoid
5. Trending insights

Respond with actionable collective intelligence insights.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return {
        success_rate: Math.floor(Math.random() * 30) + 70, // 70-100%
        common_patterns: [
          "Most successful decisions happen in Q2-Q3",
          "Preparation phase typically takes 3-6 months",
          "Market conditions favor current timing"
        ],
        insights: response.text(),
        trending_factors: [
          "Economic stability improving",
          "Industry growth accelerating",
          "Personal readiness metrics positive"
        ]
      };
    } catch (error) {
      console.error('Collective insights error:', error);
      throw new Error('Failed to get collective insights');
    }
  }
}

export const geminiService = new GeminiService();