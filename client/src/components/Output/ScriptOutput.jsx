import React from 'react';
import { AlignLeft, Eye, Clock } from 'lucide-react';

const ScriptOutput = ({ scriptData, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-zinc-950 text-zinc-500 gap-4">
        <div className="w-6 h-6 border-2 border-zinc-800 border-t-zinc-400 rounded-none animate-spin" />
        <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Analyzing</p>
      </div>
    );
  }

  if (!scriptData || scriptData.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950 text-zinc-600">
        <p className="text-xs font-medium uppercase tracking-widest">No script generated</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto bg-zinc-950 p-8 relative">
      <div className="absolute top-0 left-12 bottom-0 w-px bg-zinc-800" />
      
      <div className="space-y-8 max-w-3xl mx-auto relative z-10">
        {scriptData.map((segment, index) => (
          <div key={index} className="flex gap-6 group">
            <div className="flex flex-col items-center mt-0">
              <div className="w-8 h-8 bg-zinc-900 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300 group-hover:border-zinc-400 group-hover:bg-zinc-800 transition-colors shadow-sm shrink-0">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
            
            <div className="flex-1 bg-zinc-900/50 border border-zinc-800 p-5 hover:border-zinc-600 transition-colors shadow-sm">
              <div className="flex items-center gap-4 mb-4 pb-3 border-b border-zinc-800/50">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 bg-zinc-950 px-2 py-1 border border-zinc-800 uppercase tracking-widest">
                  <Clock className="w-3 h-3" />
                  {segment.timestamp || '00:00'}
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-300 bg-zinc-800 px-2 py-1 border border-zinc-700 uppercase tracking-widest">
                  Line: {segment.codeLineFocus}
                </div>
              </div>
              
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <AlignLeft className="w-4 h-4 text-zinc-500 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Voiceover</h4>
                    <p className="text-sm text-zinc-200 leading-relaxed font-medium">
                      "{segment.spokenText}"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Eye className="w-4 h-4 text-zinc-600 mt-1 shrink-0" />
                  <div>
                    <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">Visual Action</h4>
                    <p className="text-sm text-zinc-400">
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
