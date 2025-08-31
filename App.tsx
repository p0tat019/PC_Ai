
import React, { useState } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { RecommendationDisplay } from './components/RecommendationDisplay';
import { getPCRecommendation } from './services/geminiService';
import { UserRequest } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isInitialState, setIsInitialState] = useState(true);

  const handleFormSubmit = async (request: UserRequest) => {
    setIsLoading(true);
    setError(null);
    setRecommendation('');
    setIsInitialState(false);
    
    try {
      const result = await getPCRecommendation(request);
      setRecommendation(result);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : '알 수 없는 오류가 발생했습니다.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" style={{ height: 'calc(100vh - 100px)'}}>
            <div className="lg:col-span-5 h-full">
              <InputForm onSubmit={handleFormSubmit} isLoading={isLoading} />
            </div>
            <div className="lg:col-span-7 h-full">
              <RecommendationDisplay
                isLoading={isLoading}
                recommendation={recommendation}
                error={error}
                isInitialState={isInitialState}
              />
            </div>
          </div>
      </main>
    </div>
  );
};

export default App;
