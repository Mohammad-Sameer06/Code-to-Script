const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  language: {
    type: String,
    required: true,
  },
  rawCode: {
    type: String,
    required: true,
  },
  generatedScript: [{
    timestamp: { type: String },
    spokenText: { type: String },
    codeLineFocus: { type: Number },
    visualAction: { type: String }
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
