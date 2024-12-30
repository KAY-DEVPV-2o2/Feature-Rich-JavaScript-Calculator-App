import React from 'react';

interface DisplayProps {
  value: string;
  equation: string;
}

export default function Display({ value, equation }: DisplayProps) {
  return (
    <div className="bg-gray-900 p-4 rounded-lg mb-4 font-mono">
      <div className="text-blue-400 text-right text-sm h-6 overflow-hidden">
        {equation}
      </div>
      <div
        id="display"
        className="text-3xl text-right text-blue-100 h-10 overflow-hidden whitespace-nowrap"
      >
        {value}
      </div>
    </div>
  );
}