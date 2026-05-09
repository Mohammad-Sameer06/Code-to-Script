import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Code2 } from 'lucide-react';

const CodeInput = ({ onSubmit, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Paste your code here\n\nfunction helloWorld() {\n  console.log("Hello");\n}');

  const handleSubmit = () => {
    if (!title.trim() || !code.trim()) {
      alert('Title and code are required');
      return;
    }
    onSubmit({ title, language, rawCode: code });
  };

  return (
    <div className="w-1/2 flex flex-col border-r border-slate-800 bg-slate-900/50">
      <div className="p-4 border-b border-slate-800 flex flex-col gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Project Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-slate-200 placeholder-slate-500"
          />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 text-slate-200"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
            <Code2 className="w-4 h-4" />
            <span>Source Code</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Generate Script</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            renderLineHighlight: "all",
          }}
        />
      </div>
    </div>
  );
};

export default CodeInput;
