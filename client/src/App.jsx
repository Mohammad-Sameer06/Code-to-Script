import React, { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Workspace from './components/Layout/Workspace';
import CodeInput from './components/Editor/CodeInput';
import ScriptOutput from './components/Output/ScriptOutput';
import { projectAPI } from './services/api';

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateScript = async (projectData) => {
    try {
      setIsGenerating(true);
      // In a real app, you might want to show a toast here
      const response = await projectAPI.createProject(projectData);
      setActiveProject(response.data);
      // We would ideally refresh the sidebar here, but for simplicity we're just setting active project
      // To properly refresh sidebar, we could lift the projects state up to App.jsx or use a context/event bus.
      // For this implementation, a page reload or selecting from sidebar again will show it.
      // Let's just alert success for now.
    } catch (error) {
      console.error('Failed to generate script', error);
      alert(error.response?.data?.message || 'Failed to generate script');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectProject = (project) => {
    setActiveProject(project);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-950 text-slate-200">
      <Sidebar onSelectProject={handleSelectProject} />
      <Workspace>
        <CodeInput 
          onSubmit={handleGenerateScript} 
          isGenerating={isGenerating} 
        />
        <ScriptOutput 
          scriptData={activeProject?.generatedScript} 
          isLoading={isGenerating} 
        />
      </Workspace>
    </div>
  );
}

export default App;
