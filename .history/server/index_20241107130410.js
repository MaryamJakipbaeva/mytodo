import express from 'express';
import cors from 'cors'
import pkg from 'pg'

const port = 3001;
const { Pool } = pkg;


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo',
  password: 'Maryzor_2004',
  port: 5432
});

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
