import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { TemporalNexusAPI } from './api'

// Mock Supabase
vi.mock('./supabase', () => ({
  supabase: {
    auth: {
      signUp: vi.fn(),
      signInWithPassword: vi.fn(),
    },
    from: vi.fn(() => ({
      insert: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
          order: vi.fn(),
        })),
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn(),
          })),
        })),
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(),
      })),
    })),
  },
}))

describe('TemporalNexusAPI', () => {
  let api: TemporalNexusAPI

  beforeEach(() => {
    api = new TemporalNexusAPI()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Authentication', () => {
    it('should sign up a user successfully', async () => {
      const mockResponse = {
        data: {
          user: { id: 'user-123', email: 'test@example.com' },
          session: { access_token: 'token-123' },
        },
        error: null,
      }

      const { supabase } = await import('./supabase')
      vi.mocked(supabase.auth.signUp).mockResolvedValue(mockResponse)

      const result = await api.signUp('test@example.com', 'password123', 'Test User')

      expect(result).toEqual({
        userId: 'user-123',
        token: 'token-123',
      })
    })

    it('should handle signup errors', async () => {
      const mockError = { message: 'Email already exists' }
      const { supabase } = await import('./supabase')
      vi.mocked(supabase.auth.signUp).mockResolvedValue({ data: null, error: mockError })

      await expect(api.signUp('test@example.com', 'password123', 'Test User')).rejects.toThrow('Email already exists')
    })

    it('should sign in a user successfully', async () => {
      const mockResponse = {
        data: {
          user: { id: 'user-123' },
          session: { access_token: 'token-123' },
        },
        error: null,
      }

      const { supabase } = await import('./supabase')
      vi.mocked(supabase.auth.signInWithPassword).mockResolvedValue(mockResponse)

      const result = await api.signIn('test@example.com', 'password123')

      expect(result).toEqual({
        userId: 'user-123',
        token: 'token-123',
      })
    })
  })

  describe('Decision Management', () => {
    it('should create a decision successfully', async () => {
      const mockDecision = {
        id: 'decision-123',
        user_id: 'user-123',
        decision_type: 'career_change',
        title: 'Test Decision',
        description: 'Test description',
        timeframe: '1_year',
        priority: 'high' as const,
        status: 'analyzing' as const,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      }

      const { supabase } = await import('./supabase')
      const mockInsert = vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockDecision, error: null }),
        })),
      }))

      vi.mocked(supabase.from).mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await api.createDecision({
        user_id: 'user-123',
        decision_type: 'career_change',
        title: 'Test Decision',
        description: 'Test description',
        timeframe: '1_year',
        priority: 'high',
      })

      expect(result).toEqual(mockDecision)
    })

    it('should get user decisions', async () => {
      const mockDecisions = [
        {
          id: 'decision-1',
          user_id: 'user-123',
          decision_type: 'career_change',
          title: 'Decision 1',
          created_at: '2024-01-01T00:00:00Z',
        },
      ]

      const { supabase } = await import('./supabase')
      const mockSelect = vi.fn(() => ({
        eq: vi.fn(() => ({
          order: vi.fn().mockResolvedValue({ data: mockDecisions, error: null }),
        })),
      }))

      vi.mocked(supabase.from).mockReturnValue({
        select: mockSelect,
      } as any)

      const result = await api.getUserDecisions('user-123')

      expect(result).toEqual(mockDecisions)
    })

    it('should update a decision', async () => {
      const mockUpdatedDecision = {
        id: 'decision-123',
        status: 'completed',
        updated_at: '2024-01-02T00:00:00Z',
      }

      const { supabase } = await import('./supabase')
      const mockUpdate = vi.fn(() => ({
        eq: vi.fn(() => ({
          select: vi.fn(() => ({
            single: vi.fn().mockResolvedValue({ data: mockUpdatedDecision, error: null }),
          })),
        })),
      }))

      vi.mocked(supabase.from).mockReturnValue({
        update: mockUpdate,
      } as any)

      const result = await api.updateDecision('decision-123', { status: 'completed' })

      expect(result).toEqual(mockUpdatedDecision)
    })
  })

  describe('Analytics', () => {
    it('should get analytics summary', async () => {
      const mockSummary = {
        total: 5,
        byType: { career_change: 3, investment: 2 },
        byStatus: { completed: 4, analyzing: 1 },
        avgConfidence: 85,
      }

      // Mock the API call to use local fallback
      const originalUseApi = (api as any).useApi
      ;(api as any).useApi = false

      // Mock local decisions
      const mockDecisions = [
        {
          user_id: 'user-123',
          decision_type: 'career_change',
          status: 'completed',
          confidence: 90,
          created_at: '2024-01-01T00:00:00Z',
        },
        {
          user_id: 'user-123',
          decision_type: 'investment',
          status: 'analyzing',
          confidence: 80,
          created_at: '2024-01-02T00:00:00Z',
        },
      ]

      vi.spyOn(api as any, 'getLocalDecisions').mockReturnValue(mockDecisions)

      const result = await api.getAnalyticsSummary('user-123')

      expect(result.total).toBe(2)
      expect(result.byType.career_change).toBe(1)
      expect(result.byType.investment).toBe(1)

      ;(api as any).useApi = originalUseApi
    })
  })

  describe('Guest User Creation', () => {
    it('should create a guest user successfully', async () => {
      const mockProfile = {
        id: 'guest-123',
        name: 'Guest User',
        is_guest: true,
        created_at: '2024-01-01T00:00:00Z',
      }

      const { supabase } = await import('./supabase')
      const mockInsert = vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockProfile, error: null }),
        })),
      }))

      vi.mocked(supabase.from).mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await api.createGuestUser('Guest User')

      expect(result).toEqual({
        userId: expect.stringMatching(/^guest_/),
        profile: expect.objectContaining({
          name: 'Guest User',
          is_guest: true,
        }),
      })
    })
  })

  describe('Simulations', () => {
    it('should run a simulation successfully', async () => {
      const mockSimulation = {
        id: 'sim-123',
        decision_id: 'decision-123',
        simulation_type: 'career_change',
        parameters: { test: 'data' },
        results: { outcome: 'success' },
        status: 'completed',
        created_at: '2024-01-01T00:00:00Z',
      }

      const { supabase } = await import('./supabase')
      const mockInsert = vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn().mockResolvedValue({ data: mockSimulation, error: null }),
        })),
      }))

      vi.mocked(supabase.from).mockReturnValue({
        insert: mockInsert,
      } as any)

      const result = await api.runSimulation('decision-123', 'career_change', { test: 'data' })

      expect(result).toEqual(mockSimulation)
    })
  })

  describe('Error Handling', () => {
    it('should handle API errors gracefully', async () => {
      const { supabase } = await import('./supabase')
      vi.mocked(supabase.from).mockImplementation(() => {
        throw new Error('Database connection failed')
      })

      await expect(api.getUserDecisions('user-123')).rejects.toThrow()
    })
  })
})