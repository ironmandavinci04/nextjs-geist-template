"use client";

import React from 'react';
import VSCodeEditor from './VSCodeEditor';
import VSCodeFileExplorer from './VSCodeFileExplorer';
import CopilotSidebar from './CopilotSidebar';
import VSCodeTerminal from './VSCodeTerminal';

export default function VSCodeLayout() {
  return (
    <div className="grid h-screen grid-cols-[250px_1fr_250px] grid-rows-[1fr_200px]">
      {/* File Explorer */}
      <aside className="border-r border-[#333333] p-4">
        <VSCodeFileExplorer />
      </aside>

      {/* Main Editor */}
      <main className="col-start-2 row-span-1">
        <VSCodeEditor />
      </main>

      {/* Copilot Sidebar */}
      <aside className="border-l border-[#333333] p-4">
        <CopilotSidebar />
      </aside>

      {/* Terminal */}
      <div className="col-span-3 border-t border-[#333333] bg-[#1e1e1e]">
        <VSCodeTerminal />
      </div>
    </div>
  );
}
