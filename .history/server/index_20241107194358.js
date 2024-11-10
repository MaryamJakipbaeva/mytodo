import express from 'express'
import cors from 'cors'
import pkg from 'pg'
import dotenv from 'dotenv'

require('dotenv').config();

const environment = process.env.NODE_ENV 

dotenv.config();

const port = 3001;
const { Pool } = pkg;

const openDb = () => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.NODE_ENV === 'development' ? process.env.DB_NAME : process.env.TEST_DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  })
  return pool
}


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM task');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/create', async (req, res) => {
  try {
    const result = await pool.query('INSERT INTO task (description) VALUES ($1) RETURNING id', [req.body.description]);
    res.status(200).json({ id: result.rows[0].id }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/delete/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM task WHERE id = $1', [id]);
    res.status(200).json({ id: id }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
