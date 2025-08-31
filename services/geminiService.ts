
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from '../constants';
import { UserRequest } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getPCRecommendation(request: UserRequest): Promise<string> {
  const userPrompt = `
    사용자 요청은 다음과 같습니다:
    - 예산: ${request.budget || '지정되지 않음'}
    - 주요 사용 목적: ${request.useCases.join(', ') || '지정되지 않음'}
    - 원하는 추천 유형: ${request.recommendationTypes.join(', ') || '지정되지 않음'}
    - 추가 요청사항: ${request.additionalNotes || '없음'}

    위 요청에 맞춰 전문가로서 추천을 제공해주세요.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });
    
    const text = response.text;
    const cleanedText = text.replace(/^```markdown\n/,'').replace(/```$/,'').trim();
    return cleanedText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `오류가 발생했습니다: ${error.message}. API 키가 올바르게 설정되었는지 확인해주세요.`;
    }
    return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
}
