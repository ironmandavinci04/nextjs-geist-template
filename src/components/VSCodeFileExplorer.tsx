"use client";

import React, { useState } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  isOpen?: boolean;
}

const initialFiles: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'components',
        type: 'folder',
        children: [
          { name: 'VSCodeEditor.tsx', type: 'file' },
          { name: 'VSCodeLayout.tsx', type: 'file' },
          { name: 'VSCodeFileExplorer.tsx', type: 'file' },
        ],
      },
      {
        name: 'app',
        type: 'folder',
        children: [
          { name: 'page.tsx', type: 'file' },
          { name: 'layout.tsx', type: 'file' },
        ],
      },
    ],
  },
  {
    name: 'public',
    type: 'folder',
    children: [
      { name: 'favicon.ico', type: 'file' },
    ],
  },
];

const FileTreeNode: React.FC<{ node: FileNode; level: number }> = ({ node, level }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  const indent = level * 16;

  return (
    <div>
      <div
        className="flex cursor-pointer items-center hover:bg-[#2a2a2a]"
        style={{ paddingLeft: `${indent}px` }}
        onClick={node.type === 'folder' ? toggleFolder : undefined}
      >
        <span className="mr-2">
          {node.type === 'folder' ? (
            isOpen ? '📂' : '📁'
          ) : (
            '📄'
          )}
        </span>
        <span className="text-sm">{node.name}</span>
      </div>
      {node.type === 'folder' && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeNode key={index} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export default function VSCodeFileExplorer() {
  return (
    <div className="h-full w-full text-[#d4d4d4]">
      <div className="mb-4 text-sm font-semibold uppercase">Explorer</div>
      <div className="file-tree">
        {initialFiles.map((node, index) => (
          <FileTreeNode key={index} node={node} level={0} />
        ))}
      </div>
    </div>
  );
}
