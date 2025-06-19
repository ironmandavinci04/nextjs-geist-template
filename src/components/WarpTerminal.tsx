"use client";

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: number;
  content: string;
  type: 'input' | 'output' | 'error';
}

interface Suggestion {
  id: number;
  command: string;
}

const sampleCommands: Suggestion[] = [
  { id: 1, command: 'help' },
  { id: 2, command: 'clear' },
  { id: 3, command: 'echo' },
  { id: 4, command: 'date' },
];

export default function WarpTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 0, content: 'Welcome to Warp Terminal Clone', type: 'output' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom whenever history updates
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentInput(value);

    // Filter suggestions based on current input
    if (value.length > 0) {
      const filtered = sampleCommands.filter(cmd => cmd.command.startsWith(value));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const executeCommand = (command: string) => {
    const newId = history.length;
    const newHistory: TerminalLine[] = [
      ...history,
      { id: newId, content: `$ ${command}`, type: 'input' },
    ];

    const [baseCmd] = command.split(' ');
    switch (baseCmd.toLowerCase()) {
      case 'help':
        newHistory.push({
          id: newId + 1,
          content: `Available commands: ${sampleCommands.map(s => s.command).join(', ')}`,
          type: 'output',
        });
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'echo':
        newHistory.push({
          id: newId + 1,
          content: command.slice(5),
          type: 'output',
        });
        break;
      case 'date':
        newHistory.push({
          id: newId + 1,
          content: new Date().toString(),
          type: 'output',
        });
        break;
      default:
        newHistory.push({
          id: newId + 1,
          content: `Error: Command not found: ${command}`,
          type: 'error',
        });
    }
    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim() !== '') {
      executeCommand(currentInput.trim());
      setCurrentInput('');
      setSuggestions([]);
    }
  };

  return (
    <div className="warp-terminal flex flex-col h-full">
      {/* Terminal Output */}
      <div ref={outputRef} className="terminal-output flex-1 overflow-y-auto bg-black p-4 rounded shadow-inner">
        {history.map(line => (
          <div key={line.id} className={`terminal-line ${line.type === 'error' ? 'text-red-500' : ''}`}>
            {line.content}
          </div>
        ))}
      </div>

      {/* Command Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions bg-gray-800 p-2 rounded mt-1">
          {suggestions.map(sugg => (
            <div 
              key={sugg.id} 
              className="suggestion-item text-sm hover:bg-gray-700 p-1 rounded cursor-pointer"
              // You could add an onClick event here to select a suggestion
            >
              {sugg.command}
            </div>
          ))}
        </div>
      )}

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="terminal-input mt-2 flex">
        <span className="mr-2">$</span>
      <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (currentInput.trim() !== '') {
                console.log('Submitting command:', currentInput);
                executeCommand(currentInput.trim());
                setCurrentInput('');
                setSuggestions([]);
              }
            }
          }}
          className="flex-1 bg-gray-800 p-2 rounded outline-none"
          placeholder="Enter command..."
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
