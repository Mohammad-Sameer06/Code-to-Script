import React from 'react';

const Workspace = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden">
      <header className="h-14 border-b border-slate-800 flex items-center px-6 shrink-0">
        <h2 className="text-sm font-medium text-slate-300">Workspace</h2>
      </header>
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default Workspace;
