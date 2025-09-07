import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GeminiService } from './gemini'

// Mock the Google Generative AI
vi.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: vi.fn().mockImplementation(() => ({
    getGenerativeModel: vi.fn(() => ({
      generateContent: vi.fn(),
    })),
  })),
}))

describe('GeminiService', () => {
  let geminiService: GeminiService

  beforeEach(() => {
    geminiService = new GeminiService()
    vi.clearAllMocks()
  })

  describe('analyzeDecision', () => {
    it('should analyze a career change decision successfully', async () => {
      const mockResponse = {
        text: () => JSON.stringify({
          extracted_data: {
            decision_type: 'career_change',
            key_parameters: {
              current_job: 'Software Engineer',
              desired_path: 'Data Scientist',
            },
            timeframe: '1_year',
            priority_level: 'high',
          },
          timing_analysis: {
            optimal_windows: ['Q2 2024', 'Q3 2024'],
            risk_factors: ['Market volatility'],
            market_conditions: { favorability: 'moderate' },
            personal_readiness: { score: 75 },
          },
          recommendations: {
            primary_recommendation: 'Proceed with skill development',
            alternative_options: ['Delay by 6 months'],
            preparation_steps: ['Learn Python', 'Build portfolio'],
            monitoring_metrics: ['Skill progress', 'Job market trends'],
          },
          confidence_score: 85,
          reasoning: 'Strong market demand for data science skills',
          next_steps: ['Start learning Python', 'Network in data science community'],
        }),
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockResolvedValue({
          response: mockResponse,
        }),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      const result = await geminiService.analyzeDecision(
        'career_change',
        'I want to switch from software engineering to data science',
        { timeframe: '1_year', priority: 'high' }
      )

      expect(result.extracted_data.decision_type).toBe('career_change')
      expect(result.confidence_score).toBe(85)
      expect(result.timing_analysis.optimal_windows).toContain('Q2 2024')
    })

    it('should handle API errors gracefully', async () => {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockRejectedValue(new Error('API Error')),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      await expect(
        geminiService.analyzeDecision('career_change', 'Test input')
      ).rejects.toThrow('Failed to analyze decision with Gemini')
    })

    it('should return fallback response when JSON parsing fails', async () => {
      const mockResponse = {
        text: () => 'Invalid JSON response from API',
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockResolvedValue({
          response: mockResponse,
        }),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      const result = await geminiService.analyzeDecision('career_change', 'Test input')

      expect(result.extracted_data.decision_type).toBe('career_change')
      expect(result.confidence_score).toBe(78) // Default fallback value
      expect(result.reasoning).toBe('Invalid JSON response from API')
    })
  })

  describe('simulateOutcomes', () => {
    it('should simulate decision outcomes successfully', async () => {
      const mockResponse = {
        text: () => JSON.stringify({
          scenarios: {
            best_case: { probability: 0.3, outcome_score: 95 },
            most_likely: { probability: 0.5, outcome_score: 78 },
            worst_case: { probability: 0.2, outcome_score: 45 },
          },
          timeline_projection: {
            short_term: 'Positive initial results',
            medium_term: 'Steady progress',
            long_term: 'Strong success likelihood',
          },
          risk_analysis: {
            high_risks: ['Market downturn'],
            medium_risks: ['Skill gaps'],
            low_risks: ['Personal factors'],
          },
        }),
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockResolvedValue({
          response: mockResponse,
        }),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      const result = await geminiService.simulateOutcomes('career_change', {
        current_job: 'Software Engineer',
        desired_path: 'Data Scientist',
      })

      expect(result.scenarios.best_case.probability).toBe(0.3)
      expect(result.scenarios.most_likely.outcome_score).toBe(78)
      expect(result.risk_analysis.high_risks).toContain('Market downturn')
    })

    it('should handle simulation errors', async () => {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockRejectedValue(new Error('Simulation failed')),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      await expect(
        geminiService.simulateOutcomes('career_change', {})
      ).rejects.toThrow('Failed to simulate outcomes')
    })
  })

  describe('getCollectiveInsights', () => {
    it('should retrieve collective insights successfully', async () => {
      const mockResponse = {
        text: () => 'Based on collective data, similar career transitions show 75% success rate when following structured learning paths.',
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockResolvedValue({
          response: mockResponse,
        }),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      const result = await geminiService.getCollectiveInsights('career_change', {
        id: 'user-123',
        name: 'Test User',
      })

      expect(result.success_rate).toBeGreaterThanOrEqual(70)
      expect(result.success_rate).toBeLessThanOrEqual(100)
      expect(result.common_patterns).toBeInstanceOf(Array)
      expect(result.insights).toContain('collective data')
    })

    it('should handle collective insights errors', async () => {
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockModel = {
        generateContent: vi.fn().mockRejectedValue(new Error('Insights API failed')),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      await expect(
        geminiService.getCollectiveInsights('career_change', { id: 'user-123' })
      ).rejects.toThrow('Failed to get collective insights')
    })
  })

  describe('System Prompts', () => {
    it('should use correct system prompt for career change', async () => {
      const mockResponse = {
        text: () => JSON.stringify({
          extracted_data: { decision_type: 'career_change' },
          confidence_score: 80,
        }),
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockGenerateContent = vi.fn().mockResolvedValue({
        response: mockResponse,
      })

      const mockModel = {
        generateContent: mockGenerateContent,
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      await geminiService.analyzeDecision('career_change', 'Test input')

      const callArgs = mockGenerateContent.mock.calls[0][0]
      expect(callArgs.text).toContain('TEMPORAL NEXUS platform')
      expect(callArgs.text).toContain('optimizing the timing for career changes')
    })

    it('should use correct system prompt for investment decisions', async () => {
      const mockResponse = {
        text: () => JSON.stringify({
          extracted_data: { decision_type: 'investment' },
          confidence_score: 80,
        }),
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const mockGenerateContent = vi.fn().mockResolvedValue({
        response: mockResponse,
      })

      const mockModel = {
        getGenerativeModel: vi.fn(() => mockModel),
      }

      vi.mocked(GoogleGenerativeAI).mockImplementation(() => ({
        getGenerativeModel: vi.fn(() => mockModel),
      } as any))

      await geminiService.analyzeDecision('investment', 'Test input')

      const callArgs = mockGenerateContent.mock.calls[0][0]
      expect(callArgs.text).toContain('optimizing investment timing')
    })
  })
})