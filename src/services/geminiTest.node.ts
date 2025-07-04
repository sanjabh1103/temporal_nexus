import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = process.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(API_KEY);

(async () => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
    const prompt = `You are an AI assistant. What is the capital of France?`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    // eslint-disable-next-line no-console
    console.log('Gemini API test result:', text);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Gemini API test error:', error);
    process.exit(1);
  }
})();
