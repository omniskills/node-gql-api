import mongoose from 'mongoose';

const WorkspaceSchema = mongoose.Schema({
  displayName: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
}, { collection: 'workspaces' });

const WorkspaceModel = mongoose.model('Workspace', WorkspaceSchema);

export default WorkspaceModel;
