import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Code2, FolderUp } from 'lucide-react';

const IGNORED_DIRS = ['node_modules', '.git', '.next', 'dist', 'build', '.vscode', '.idea'];
const IGNORED_EXTS = ['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.pdf', '.zip', '.tar', '.gz', '.svg', '.ico'];

const CodeInput = ({ onSubmit, isGenerating }) => {
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('// Paste your code here\n\nfunction helloWorld() {\n  console.log("Hello");\n}');
  const [contextFiles, setContextFiles] = useState([]);
  const [isReadingFiles, setIsReadingFiles] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    if (!title.trim() || !code.trim()) {
      alert('Title and code are required');
      return;
    }
    onSubmit({ title, language, rawCode: code, contextFiles });
  };

  const handleFolderUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    setIsReadingFiles(true);
    setContextFiles([]); // Reset previous

    const validFiles = files.filter(file => {
      // Filter out ignored directories
      const pathParts = file.webkitRelativePath.split('/');
      if (pathParts.some(part => IGNORED_DIRS.includes(part))) {
        return false;
      }
      
      // Filter out ignored extensions
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      if (IGNORED_EXTS.includes(ext)) {
        return false;
      }

      // Filter out files that are too large (e.g., > 1MB)
      if (file.size > 1024 * 1024) {
        return false;
      }

      return true;
    });

    const readPromises = validFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            path: file.webkitRelativePath,
            content: event.target.result
          });
        };
        reader.onerror = () => resolve(null);
        reader.readAsText(file);
      });
    });

    const results = await Promise.all(readPromises);
    const successfulReads = results.filter(Boolean);
    
    setContextFiles(successfulReads);
    setIsReadingFiles(false);
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
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="csharp">C#</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
            <option value="swift">Swift</option>
            <option value="kotlin">Kotlin</option>
            <option value="dart">Dart</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="scss">SCSS</option>
            <option value="json">JSON</option>
            <option value="xml">XML</option>
            <option value="yaml">YAML</option>
            <option value="sql">SQL</option>
            <option value="bash">Bash / Shell</option>
            <option value="markdown">Markdown</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider">
              <Code2 className="w-4 h-4" />
              <span>Source Code</span>
            </div>
            
            {/* Folder Context UI */}
            <div className="flex items-center gap-2">
              <input 
                type="file" 
                webkitdirectory="true" 
                directory="true" 
                multiple 
                ref={fileInputRef} 
                onChange={handleFolderUpload} 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-2 py-1 rounded border border-slate-700 transition-colors"
                title="Upload a folder to give the AI project context"
              >
                <FolderUp className="w-3.5 h-3.5" />
                {isReadingFiles ? 'Reading...' : 'Add Context Folder'}
              </button>
              {contextFiles.length > 0 && (
                <span className="text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full">
                  {contextFiles.length} files loaded
                </span>
              )}
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isGenerating || isReadingFiles}
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
