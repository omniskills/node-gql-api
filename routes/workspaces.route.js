import express from 'express';
import workspacesController from '../controllers/workspace.controller';

const router = express.Router();

router.get('/', workspacesController.getWorkspaces);
router.post('/sendEmail', workspacesController.sendEmail);

export default router;
