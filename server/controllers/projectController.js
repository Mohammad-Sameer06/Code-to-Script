const Project = require('../models/Project');
const { generateVideoScript } = require('../services/aiService');

exports.createProject = async (req, res) => {
  try {
    const { title, language, rawCode } = req.body;

    // Basic validation
    if (!title || !language || !rawCode) {
      return res.status(400).json({ message: 'Title, language, and raw code are required.' });
    }

    if (rawCode.length > 50000) {
      return res.status(400).json({ message: 'Code payload exceeds the maximum allowed size.' });
    }

    // Call the AI Service to generate the script
    const generatedScript = await generateVideoScript(rawCode, language);

    // Save to DB
    const newProject = new Project({
      title,
      language,
      rawCode,
      generatedScript
    });

    const savedProject = await newProject.save();
    
    res.status(201).json(savedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Failed to process code and generate script.', error: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Failed to retrieve projects.', error: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }
    res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Failed to retrieve project.', error: error.message });
  }
};
