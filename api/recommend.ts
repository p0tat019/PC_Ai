import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';
import type { UserRequest } from '../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { budget, useCases, recommendationTypes, additionalNotes } = req.body as UserRequest;
    
    if (!useCases || !recommendationTypes) {
      return res.status(400).json({ error: 'Bad Request: Missing required fields.' });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const userPrompt = `
      사용자 요청은 다음과 같습니다:
      - 예산: ${budget || '지정되지 않음'}
      - 주요 사용 목적: ${useCases.join(', ') || '지정되지 않음'}
      - 원하는 추천 유형: ${recommendationTypes.join(', ') || '지정되지 않음'}
      - 추가 요청사항: ${additionalNotes || '없음'}

      위 요청에 맞춰 전문가로서 추천을 제공해주세요.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });
    
    const text = response.text;
    const cleanedText = text.replace(/^```markdown\n/,'').replace(/```$/,'').trim();
    
    res.status(200).json({ recommendation: cleanedText });

  } catch (error) {
    console.error("Error in Vercel function calling Gemini API:", error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ error: `Gemini API 호출 중 서버에서 오류가 발생했습니다: ${errorMessage}` });
  }
}
