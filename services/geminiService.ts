import { UserRequest } from '../types';

export async function getPCRecommendation(request: UserRequest): Promise<string> {
  try {
    const response = await fetch('/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: '오류 응답을 파싱하는데 실패했습니다.' }));
      throw new Error(`서버 오류: ${response.status} ${response.statusText}. ${errorData.error || ''}`);
    }

    const data = await response.json();
    return data.recommendation;

  } catch (error) {
    console.error("Error fetching recommendation:", error);
    if (error instanceof Error) {
        return `오류가 발생했습니다: ${error.message}. 네트워크 연결을 확인해주세요.`;
    }
    return '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
  }
}
