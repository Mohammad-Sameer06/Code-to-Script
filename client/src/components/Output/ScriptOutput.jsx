import React from 'react';
import { AlignLeft, Eye, Clock } from 'lucide-react';

const ScriptOutput = ({ scriptData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-900/20 text-slate-500 gap-4">
        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
        <p className="text-sm font-medium animate-pulse">AI is analyzing code and generating script...</p>
      </div>
    );
  }

  if (!scriptData || scriptData.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-slate-900/20 text-slate-500">
        <p className="text-sm">No script generated yet. Paste code and click generate.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-slate-900/20 p-6 relative">
      <div className="absolute top-0 left-10 bottom-0 w-px bg-slate-800" />
      
      <div className="space-y-6 max-w-3xl mx-auto relative z-10">
        {scriptData.map((segment, index) => (
          <div key={index} className="flex gap-6 group">
            <div className="flex flex-col items-center mt-1">
              <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-semibold text-blue-400 group-hover:border-blue-500 group-hover:bg-blue-500/10 transition-colors shadow-sm shrink-0">
                {index + 1}
              </div>
            </div>
            
            <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg p-5 hover:border-slate-700 transition-colors shadow-sm">
              <div className="flex items-center gap-4 mb-4 pb-3 border-b border-slate-800/50">
                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-950 px-2 py-1 rounded">
                  <Clock className="w-3.5 h-3.5" />
                  {segment.timestamp || '00:00'}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded">
                  Line Focus: {segment.codeLineFocus}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlignLeft className="w-4 h-4 text-slate-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Spoken Text</h4>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      "{segment.spokenText}"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Eye className="w-4 h-4 text-indigo-400 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-xs font-semibold text-indigo-900/0 uppercase tracking-wider mb-1 text-slate-500">Visual Action</h4>
                    <p className="text-sm text-indigo-300">
                      {segment.visualAction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScriptOutput;
