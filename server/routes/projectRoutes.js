const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// POST /api/projects - Create a new project and generate script
router.post('/', projectController.createProject);

// GET /api/projects - Get all projects
router.get('/', projectController.getAllProjects);

// GET /api/projects/:id - Get a single project by ID
router.get('/:id', projectController.getProjectById);

module.exports = router;
