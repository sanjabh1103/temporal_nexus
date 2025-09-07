import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DecisionWizard } from './DecisionWizard'

// Mock the hooks and services
vi.mock('../hooks/useTemporalAPI', () => ({
  useDecisions: vi.fn(() => ({
    createDecision: vi.fn(),
  })),
}))

vi.mock('../utils/storage', () => ({
  UserStorage: {
    getUser: vi.fn(() => ({ id: 'test-user', name: 'Test User' })),
  },
}))

describe('DecisionWizard', () => {
  const mockOnComplete = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the first step with decision type selection', () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    expect(screen.getByText('What type of decision are you making?')).toBeInTheDocument()
    expect(screen.getByText('Career Change')).toBeInTheDocument()
    expect(screen.getByText('Investment Timing')).toBeInTheDocument()
    expect(screen.getByText('Strategic Decision Maker')).toBeInTheDocument()
    expect(screen.getByText('Policy Analyst')).toBeInTheDocument()
  })

  it('allows selecting a decision type and moving to next step', async () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    const careerChangeButton = screen.getByText('Career Change')
    await user.click(careerChangeButton)

    const nextButton = screen.getByText('Next')
    await user.click(nextButton)

    expect(screen.getByText('Tell us about your decision')).toBeInTheDocument()
  })

  it('validates required fields before allowing progression', async () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    // Try to go to step 2 without selecting type
    const nextButton = screen.getByText('Next')
    expect(nextButton).toBeDisabled()
  })

  it('allows filling decision details and moving to next step', async () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    // Select decision type
    const careerChangeButton = screen.getByText('Career Change')
    await user.click(careerChangeButton)

    // Go to step 2
    const nextButton = screen.getByText('Next')
    await user.click(nextButton)

    // Fill in decision details
    const titleInput = screen.getByPlaceholderText(/switch from software engineering/i)
    const descriptionTextarea = screen.getByPlaceholderText(/provide more details/i)

    await user.type(titleInput, 'Switch to Data Science')
    await user.type(descriptionTextarea, 'I want to transition from software engineering to data science role')

    // Go to step 3
    await user.click(nextButton)

    expect(screen.getByText('Timeline & Priority')).toBeInTheDocument()
  })

  it('allows setting timeline and priority', async () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    // Navigate to step 3
    const careerChangeButton = screen.getByText('Career Change')
    await user.click(careerChangeButton)

    let nextButton = screen.getByText('Next')
    await user.click(nextButton)

    const titleInput = screen.getByPlaceholderText(/switch from software engineering/i)
    await user.type(titleInput, 'Test Decision')
    await user.type(screen.getByPlaceholderText(/provide more details/i), 'Test description')

    await user.click(nextButton)

    // Set timeline and priority
    const timeframeSelect = screen.getByDisplayValue('')
    await user.selectOptions(timeframeSelect, '1_year')

    const highPriorityButton = screen.getByText('High')
    await user.click(highPriorityButton)

    // Go to final step
    await user.click(nextButton)

    expect(screen.getByText('Ready to Analyze with AI')).toBeInTheDocument()
  })

  it('shows all 20 decision types including Strategic Intelligence Platform stories', () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    // Check that all decision types are present
    const decisionTypes = [
      'Career Change',
      'Investment Timing',
      'Relocation',
      'Health Decisions',
      'Education Path',
      'Start Business',
      'Marriage Decision',
      'Retirement Planning',
      'Real Estate',
      'Personal Development',
      'Strategic Decision Maker',
      'Policy Analyst',
      'Investment Research Analyst',
      'Adaptive Learning Student',
      'Market Trend Analyst',
      'Research Scientist',
      'Financial Model Validator',
      'Collaborative Predictor',
      'Complex System Educator',
      'Integrated Intelligence User'
    ]

    decisionTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument()
    })
  })

  it('handles back navigation correctly', async () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    // Navigate forward
    const careerChangeButton = screen.getByText('Career Change')
    await user.click(careerChangeButton)

    let nextButton = screen.getByText('Next')
    await user.click(nextButton)

    expect(screen.getByText('Tell us about your decision')).toBeInTheDocument()

    // Navigate back
    const backButton = screen.getByText('Back')
    await user.click(backButton)

    expect(screen.getByText('What type of decision are you making?')).toBeInTheDocument()
  })

  it('disables back button on first step', () => {
    render(<DecisionWizard onComplete={mockOnComplete} />)

    const backButton = screen.getByText('Back')
    expect(backButton).toBeDisabled()
  })

  it('shows loading state during decision creation', async () => {
    // Mock a slow API call
    const mockCreateDecision = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    vi.mocked(vi.importMock('../hooks/useTemporalAPI')).useDecisions.mockReturnValue({
      createDecision: mockCreateDecision,
    })

    render(<DecisionWizard onComplete={mockOnComplete} />)

    // Navigate to final step
    const careerChangeButton = screen.getByText('Career Change')
    await user.click(careerChangeButton)

    let nextButton = screen.getByText('Next')
    await user.click(nextButton)

    await user.type(screen.getByPlaceholderText(/switch from software engineering/i), 'Test')
    await user.type(screen.getByPlaceholderText(/provide more details/i), 'Test')

    await user.click(nextButton)

    const timeframeSelect = screen.getByDisplayValue('')
    await user.selectOptions(timeframeSelect, '1_year')
    await user.click(screen.getByText('High'))

    await user.click(nextButton)

    // Click start analysis
    const startButton = screen.getByText('Start AI Analysis')
    await user.click(startButton)

    expect(screen.getByText('Creating decision and starting AI analysis...')).toBeInTheDocument()
  })
})