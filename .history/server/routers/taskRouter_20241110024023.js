import express from 'express';
import { getTasks, postTask } from '../controllers/TaskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', postTask);

export default router;
