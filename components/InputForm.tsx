
import React, { useState } from 'react';
import { USE_CASES, RECOMMENDATION_TYPES } from '../constants';
import { UserRequest } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface InputFormProps {
  onSubmit: (request: UserRequest) => void;
  isLoading: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [budget, setBudget] = useState('150만원');
  const [useCases, setUseCases] = useState<string[]>(['게이밍']);
  const [recommendationTypes, setRecommendationTypes] = useState<string[]>(['조립 PC 부품']);
  const [additionalNotes, setAdditionalNotes] = useState('FHD 해상도에서 배틀그라운드, 로스트아크 같은 게임을 원활하게 돌리고 싶어요.');

  const toggleSelection = <T,>(
    currentSelection: T[],
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    item: T
  ) => {
    setter(
      currentSelection.includes(item)
        ? currentSelection.filter((i) => i !== item)
        : [...currentSelection, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ budget, useCases, recommendationTypes, additionalNotes });
  };
  
  const renderToggleButton = (item: string, isSelected: boolean, onClick: () => void) => (
    <button
      key={item}
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
        isSelected
          ? 'bg-cyan-500 text-white shadow-lg'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      {item}
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-800/50 rounded-lg shadow-2xl h-full flex flex-col">
      <div className="space-y-6 flex-grow overflow-y-auto pr-2">
        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
            1. 예산
          </label>
          <input
            type="text"
            id="budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="예) 200만원 이하"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            2. 주요 사용 목적 (다중 선택 가능)
          </label>
          <div className="flex flex-wrap gap-2">
            {USE_CASES.map((useCase) => renderToggleButton(useCase, useCases.includes(useCase), () => toggleSelection(useCases, setUseCases, useCase)))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            3. 원하는 추천 유형 (다중 선택 가능)
          </label>
          <div className="flex flex-wrap gap-2">
            {RECOMMENDATION_TYPES.map((type) => renderToggleButton(type, recommendationTypes.includes(type), () => toggleSelection(recommendationTypes, setRecommendationTypes, type)))}
          </div>
        </div>

        <div>
          <label htmlFor="additional-notes" className="block text-sm font-medium text-gray-300 mb-2">
            4. 추가 요청사항
          </label>
          <textarea
            id="additional-notes"
            rows={5}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
            placeholder="예) 특정 브랜드 선호, 원하는 해상도, 꼭 포함하고 싶은 부품 등"
          ></textarea>
        </div>
      </div>

      <div className="pt-6 border-t border-gray-700/50">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              추천 생성 중...
            </>
          ) : (
            <>
              <SparklesIcon className="w-5 h-5"/>
              AI 맞춤 견적 받기
            </>
          )}
        </button>
      </div>
    </form>
  );
};
