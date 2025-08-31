
import React from 'react';

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 3-1.9 3.8-3.8 1.9 3.8 1.9L12 15l1.9-3.8 3.8-1.9-3.8-1.9z" />
    <path d="M5 21v-3.8L1.2 15.3 5 13.4V9.6l3.8-1.9L12.6 11.5" />
    <path d="m19 21-3.8-1.9L11.4 15.3l3.8-1.9L19 9.6" />
  </svg>
);
