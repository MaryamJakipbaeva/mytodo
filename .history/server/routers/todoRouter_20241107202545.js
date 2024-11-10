import { pool } from '../helpers/db.js';
import { Router } from 'express';
import {emptyOrRows} from '../helpers/utils.js';

const router = Router();

router.get('/', (req,res,next) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            return res.status(500).json({error: error.message});
        }
        res.status(200).json(result.rows);
    });
});

router.post('/create', (req, res) => {
  pool.query('INSERT INTO task (description) VALUES ($1) RETURNING id', [req.body.description], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ id: result.rows[0].id });
  });
});


router.delete('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM task WHERE id = $1', [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ id: id });
  });
});


export default router;
