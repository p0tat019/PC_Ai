
import React from 'react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { CpuIcon } from './icons/CpuIcon';

interface RecommendationDisplayProps {
  recommendation: string;
  isLoading: boolean;
  error: string | null;
  isInitialState: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-8 bg-gray-700 rounded w-3/4"></div>
    <div className="space-y-3 mt-8">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
    <div className="h-8 bg-gray-700 rounded w-1/2 mt-8"></div>
    <div className="space-y-2 mt-4">
        <div className="h-10 bg-gray-700/50 rounded w-full"></div>
        <div className="h-10 bg-gray-800/50 rounded w-full"></div>
        <div className="h-10 bg-gray-700/50 rounded w-full"></div>
        <div className="h-10 bg-gray-800/50 rounded w-full"></div>
    </div>
  </div>
);

const InitialState: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
        <CpuIcon className="w-24 h-24 mb-6 text-gray-700"/>
        <h2 className="text-2xl font-bold text-gray-400">PC 견적을 기다리고 있습니다</h2>
        <p className="mt-2 max-w-md">좌측 양식을 작성하고 'AI 맞춤 견적 받기' 버튼을 눌러 당신만을 위한 최적의 PC 추천을 받아보세요.</p>
    </div>
);

export const RecommendationDisplay: React.FC<RecommendationDisplayProps> = ({
  recommendation,
  isLoading,
  error,
  isInitialState,
}) => {
  const renderContent = () => {
    if (isInitialState) {
      return <InitialState />;
    }
    if (isLoading) {
      return <LoadingSkeleton />;
    }
    if (error) {
      return (
        <div className="text-red-400 bg-red-900/50 p-4 rounded-md">
          <h3 className="font-bold">오류 발생</h3>
          <p>{error}</p>
        </div>
      );
    }
    if (recommendation) {
      return <MarkdownRenderer content={recommendation} />;
    }
    return null;
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-inner h-full overflow-y-auto">
        {renderContent()}
    </div>
  );
};
