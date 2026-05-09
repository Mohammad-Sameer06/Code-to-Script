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
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-full">
      <div className="p-4 border-b border-slate-800 flex items-center gap-2">
        <Video className="w-6 h-6 text-blue-500" />
        <h1 className="font-semibold text-lg tracking-tight">Pipeline</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">Recent Projects</h2>
        {loading ? (
          <div className="text-slate-500 text-sm px-2 animate-pulse">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-slate-500 text-sm px-2">No projects found.</div>
        ) : (
          <ul className="space-y-1">
            {projects.map((project) => (
              <li key={project._id}>
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full flex items-center justify-between text-left px-2 py-2 rounded-md hover:bg-slate-800 transition-colors group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Folder className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                    <span className="text-sm text-slate-300 truncate group-hover:text-white transition-colors">
                      {project.title}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
