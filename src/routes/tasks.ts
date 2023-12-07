import express from 'express';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/tasks';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;