import { geminiService } from './gemini';

(async () => {
  try {
    const result = await geminiService.analyzeDecision(
      'career_change',
      'Should I switch from marketing to product management this year?',
      { timeframe: '2025', priority: 'high' }
    );
    // eslint-disable-next-line no-console
    console.log('Gemini API test result:', result);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Gemini API test error:', error);
  }
})();
