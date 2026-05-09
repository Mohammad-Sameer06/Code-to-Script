import React, { useEffect, useState } from 'react';
import { projectAPI } from '../../services/api';
import { Folder, ChevronRight, Video } from 'lucide-react';

const Sidebar = ({ onSelectProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await projectAPI.getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-4 border-b border-zinc-800 flex items-center gap-2 shrink-0">
        <Video className="w-5 h-5 text-zinc-100" />
        <h1 className="font-semibold text-sm tracking-tight text-zinc-100 uppercase">Pipeline</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto py-3">
        <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2 px-4">Recent Projects</h2>
        {loading ? (
          <div className="text-zinc-500 text-xs px-4 animate-pulse">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-zinc-500 text-xs px-4">No projects found.</div>
        ) : (
          <ul className="flex flex-col">
            {projects.map((project) => (
              <li key={project._id}>
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full flex items-center justify-between text-left px-4 py-2 hover:bg-zinc-800 transition-colors group border-l-2 border-transparent hover:border-zinc-400"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Folder className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-200 transition-colors flex-shrink-0" />
                    <span className="text-xs text-zinc-300 truncate group-hover:text-zinc-100 transition-colors">
                      {project.title}
                    </span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
