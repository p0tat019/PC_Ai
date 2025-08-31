
import React from 'react';
import { CpuIcon } from './icons/CpuIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10 p-4 border-b border-gray-700">
      <div className="container mx-auto flex items-center gap-3">
        <CpuIcon className="w-8 h-8 text-cyan-400" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          AI PC 견적 전문가
        </h1>
      </div>
    </header>
  );
};
