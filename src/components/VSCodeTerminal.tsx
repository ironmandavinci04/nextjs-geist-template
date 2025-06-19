"use client";

import React, { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: number;
  content: string;
  type: 'input' | 'output';
}

export default function VSCodeTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 0, content: 'Welcome to VSCode Terminal', type: 'output' },
    { id: 1, content: 'Type "help" for available commands', type: 'output' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const executeCommand = (command: string) => {
    const newId = history.length;
    const newHistory: TerminalLine[] = [...history, { id: newId, content: `$ ${command}`, type: 'input' }];

    switch (command.toLowerCase()) {
      case 'help':
        newHistory.push({
          id: newId + 1,
          content: `Available commands:
  - help: Show this help message
  - clear: Clear terminal
  - echo [text]: Display text
  - date: Show current date and time`,
          type: 'output' as const
        });
        break;
      case 'clear':
        setHistory([] as TerminalLine[]);
        return;
      case 'date':
        newHistory.push({
          id: newId + 1,
          content: new Date().toString(),
          type: 'output' as const
        });
        break;
      default:
        if (command.startsWith('echo ')) {
          newHistory.push({
            id: newId + 1,
            content: command.slice(5),
            type: 'output' as const
          });
        } else if (command.trim() !== '') {
          newHistory.push({
            id: newId + 1,
            content: `Command not found: ${command}`,
            type: 'output' as const
          });
        }
    }

    setHistory(newHistory);
    setCommandHistory(prev => [...prev, command]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      executeCommand(currentInput);
      setCurrentInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal is clicked
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div 
      className="flex h-full flex-col bg-[#1e1e1e] p-2 text-[#d4d4d4]"
      onClick={handleTerminalClick}
    >
      {/* Terminal Header */}
      <div className="mb-2 flex items-center border-b border-[#333333] pb-2">
        <span className="text-sm font-semibold">Terminal</span>
      </div>

      {/* Terminal Output */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto font-mono text-sm"
      >
        {history.map((line) => (
          <div 
            key={line.id}
            className={`mb-1 ${line.type === 'input' ? 'text-[#d4d4d4]' : 'text-[#9cdcfe]'}`}
          >
            {line.content}
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2 font-mono text-sm text-[#d4d4d4]">$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent font-mono text-sm text-[#d4d4d4] outline-none"
          autoFocus
        />
      </form>
    </div>
  );
}
