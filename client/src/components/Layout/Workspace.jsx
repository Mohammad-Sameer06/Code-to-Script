import React from 'react';

const Workspace = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col h-full bg-zinc-950 overflow-hidden">
      <header className="h-14 border-b border-zinc-800 flex items-center px-4 shrink-0 bg-zinc-900/50">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">Workspace</h2>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default Workspace;
