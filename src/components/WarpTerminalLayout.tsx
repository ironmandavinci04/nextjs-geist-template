"use client";

import React from 'react';
import WarpTerminal from './WarpTerminal';

export default function WarpTerminalLayout() {
  return (
    <div className="warp-terminal-layout min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#333333] text-[#d4d4d4] p-4 flex flex-col">
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Warp Terminal Clone</h1>
      </header>
      <main className="flex-1 flex flex-col">
        <WarpTerminal />
      </main>
    </div>
  );
}
