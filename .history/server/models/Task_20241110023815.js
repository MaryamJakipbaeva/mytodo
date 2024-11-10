import { pool } from '../helpers/db.js';

export const selectAllTasks = async () => {
  return await pool.query('SELECT * FROM task');
}

export const insertTask = async (description) => {
  return await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING *', [description]);
}
