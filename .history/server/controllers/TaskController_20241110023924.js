import { selectAllTasks, insertTask } from '../models/Task.js';
import { ApiError } from '../helpers/ApiError.js';

export const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTasks();
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
}

export const postTask = async (req, res, next) => {
  try {
    const { description } = req.body;
    if (!description || description.length === 0) {
      throw new ApiError('Invalid description for task', 400);
    }
    const result = await insertTask(description);
    res.status(201).json({ id: result.rows[0].id });
  } catch (error) {
    next(error);
  }
}

