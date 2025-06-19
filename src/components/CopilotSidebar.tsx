"use client";

import React, { useState } from 'react';

interface Suggestion {
  id: number;
  text: string;
  type: 'improvement' | 'warning' | 'tip';
}

const initialSuggestions: Suggestion[] = [
  {
    id: 1,
    text: "Consider using async/await for better readability",
    type: "improvement"
  },
  {
    id: 2,
    text: "This function might need error handling",
    type: "warning"
  },
  {
    id: 3,
    text: "You could use optional chaining here",
    type: "tip"
  }
];

export default function CopilotSidebar() {
  const [suggestions] = useState<Suggestion[]>(initialSuggestions);
  const [query, setQuery] = useState('');

  const getIconForType = (type: Suggestion['type']) => {
    switch (type) {
      case 'improvement':
        return '💡';
      case 'warning':
        return '⚠️';
      case 'tip':
        return '💭';
      default:
        return '•';
    }
  };

  return (
    <div className="h-full w-full text-[#d4d4d4]">
      <div className="mb-4 text-sm font-semibold uppercase">GitHub Copilot</div>
      
      {/* Search/Query Input */}
      <div className="mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Copilot..."
          className="w-full rounded bg-[#2a2a2a] px-3 py-2 text-sm text-[#d4d4d4] outline-none focus:ring-1 focus:ring-[#0078d4]"
        />
      </div>

      {/* Suggestions List */}
      <div className="space-y-3">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="rounded bg-[#2a2a2a] p-3 hover:bg-[#323232]"
          >
            <div className="flex items-start space-x-2">
              <span>{getIconForType(suggestion.type)}</span>
              <span className="text-sm">{suggestion.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Status Bar */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-xs text-[#6e6e6e]">
          Copilot is ready to assist you...
        </div>
      </div>
    </div>
  );
}
