import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Clock, Brain, Users, Zap, Loader } from 'lucide-react';
import { useDecisions } from '../hooks/useTemporalAPI';
import { UserStorage } from '../utils/storage';

interface DecisionWizardProps {
  onComplete: () => void;
}

export const DecisionWizard: React.FC<DecisionWizardProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    timeframe: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    details: {}
  });

  const user = UserStorage.getUser();
  const { createDecision } = useDecisions(user?.id || '');

  const decisionTypes = [
    {
      id: 'career_change',
      title: 'Career Change',
      description: 'Optimize timing for career transitions',
      icon: Brain,
      color: 'temporal'
    },
    {
      id: 'investment',
      title: 'Investment Timing',
      description: 'Find optimal investment windows',
      icon: Clock,
      color: 'quantum'
    },
    {
      id: 'relocation',
      title: 'Relocation',
      description: 'Choose the best time and place to move',
      icon: Users,
      color: 'collective'
    },
    {
      id: 'health',
      title: 'Health Decisions',
      description: 'Optimize health and treatment choices',
      icon: Zap,
      color: 'temporal'
    },
    {
      id: 'education_path',
      title: 'Education Path',
      description: 'Select optimal learning timing',
      icon: Brain,
      color: 'quantum'
    },
    {
      id: 'startup_launch',
      title: 'Start Business',
      description: 'Time your entrepreneurial venture',
      icon: Sparkles,
      color: 'collective'
    },
    {
      id: 'marriage',
      title: 'Marriage Decision',
      description: 'Simulate marriage vs staying single',
      icon: Users,
      color: 'temporal'
    },
    {
      id: 'retirement',
      title: 'Retirement Planning',
      description: 'Optimize retirement timing',
      icon: Clock,
      color: 'quantum'
    },
    {
      id: 'real_estate_purchase',
      title: 'Real Estate',
      description: 'Time property purchases optimally',
      icon: Brain,
      color: 'collective'
    },
    {
      id: 'personal_development',
      title: 'Personal Development',
      description: 'Plan learning and skill development',
      icon: Zap,
      color: 'temporal'
    }
  ];

  const handleNext = async () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Create decision with API integration
      setIsSubmitting(true);
      
      try {
        const decisionData = {
          user_id: user?.id || 'guest',
          decision_type: formData.type,
          title: formData.title,
          description: formData.description,
          timeframe: formData.timeframe,
          priority: formData.priority,
          status: 'analyzing' as const
        };

        const result = await createDecision(decisionData);
        
        if (result) {
          console.log('Decision created successfully:', result.id);
          onComplete();
        } else {
          throw new Error('Failed to create decision');
        }
      } catch (error) {
        console.error('Error creating decision:', error);
        // Still complete the wizard even if API fails (fallback to local storage)
        const fallbackDecision = UserStorage.createDecision({
          ...formData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          status: 'analyzing'
        });
        onComplete();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateFormData = (updates: any) => {
    setFormData({ ...formData, ...updates });
  };

  return (
    <div className="min-h-screen pt-8 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Decision Wizard</h1>
          <p className="text-gray-400">Let's optimize your decision across time dimensions with AI analysis</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  i <= step
                    ? 'bg-temporal-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {i}
              </div>
            ))}
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className="bg-temporal-gradient h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">What type of decision are you making?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {decisionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => updateFormData({ type: type.id })}
                      className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                        formData.type === type.id
                          ? 'border-temporal-500 bg-temporal-500/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-temporal-400 mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">{type.title}</h3>
                      <p className="text-gray-400 text-sm">{type.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Tell us about your decision</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Decision Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateFormData({ title: e.target.value })}
                    placeholder="e.g., Switch from Software Engineering to Data Science"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-temporal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    placeholder="Provide more details about your situation and what you're trying to decide. The more context you provide, the better our AI can analyze your decision..."
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:border-temporal-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Timeline & Priority</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Decision Timeframe
                  </label>
                  <select
                    value={formData.timeframe}
                    onChange={(e) => updateFormData({ timeframe: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-temporal-500 focus:outline-none"
                  >
                    <option value="">Select timeframe</option>
                    <option value="3_months">Next 3 months</option>
                    <option value="6_months">Next 6 months</option>
                    <option value="1_year">Next year</option>
                    <option value="2_years">Next 2 years</option>
                    <option value="5_years">Next 5 years</option>
                    <option value="10_years">Next 10 years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Priority Level
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    {(['low', 'medium', 'high'] as const).map((priority) => (
                      <button
                        key={priority}
                        onClick={() => updateFormData({ priority })}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                          formData.priority === priority
                            ? 'border-temporal-500 bg-temporal-500/10'
                            : 'border-white/10 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg font-semibold text-white capitalize">
                            {priority}
                          </div>
                          <div className="text-sm text-gray-400">
                            {priority === 'low' && 'Can wait'}
                            {priority === 'medium' && 'Important'}
                            {priority === 'high' && 'Urgent'}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <Sparkles className="w-16 h-16 text-temporal-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-white mb-4">Ready to Analyze with AI</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Your decision will be processed through our Gemini 2.5 Flash AI, Temporal Optimization Engine, 
                Counterfactual Simulator, and Collective Intelligence network to find the 
                optimal timing and approach.
              </p>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-white mb-2">Decision Summary:</h3>
                <p className="text-gray-300 mb-1"><span className="text-gray-400">Type:</span> {formData.type?.replace('_', ' ')}</p>
                <p className="text-gray-300 mb-1"><span className="text-gray-400">Timeframe:</span> {formData.timeframe?.replace('_', ' ')}</p>
                <p className="text-gray-300"><span className="text-gray-400">Priority:</span> {formData.priority}</p>
              </div>
              
              {isSubmitting && (
                <div className="mt-6 flex items-center justify-center space-x-2 text-temporal-400">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Creating decision and starting AI analysis...</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={step === 1 || isSubmitting}
            className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <button
            onClick={handleNext}
            disabled={
              isSubmitting ||
              (step === 1 && !formData.type) ||
              (step === 2 && (!formData.title || !formData.description)) ||
              (step === 3 && (!formData.timeframe || !formData.priority))
            }
            className="flex items-center space-x-2 px-6 py-3 bg-temporal-gradient rounded-lg font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{step === 4 ? 'Start AI Analysis' : 'Next'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};