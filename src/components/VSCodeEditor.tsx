"use client";

import React from 'react';
import Editor from '@monaco-editor/react';

export default function VSCodeEditor() {
  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      console.log('Editor content changed:', value);
    }
  };

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        defaultLanguage="typescript"
        defaultValue="// Welcome to VSCode Clone
// Start coding here..."
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: false,
          scrollBeyondLastLine: false,
          readOnly: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
