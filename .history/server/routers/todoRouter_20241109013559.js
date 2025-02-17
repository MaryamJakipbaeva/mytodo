import { pool } from '../helper/db.js';
import { Router } from 'express';
import { emptyOrRows } from '../helper/utils.js';
import {auth} from '../helper/auth.js'

const router = Router();

router.get('/', (req, res, next) => {
    pool.query('select * from task', (error, result) => {
        if (error) return next(error)
        return res.status(200).json(emptyOrRows(result))
    })
})




router.post('/create',auth, (req, res, next) => {
  pool.query('INSERT INTO task (description) VALUES ($1) RETURNING id',
     [req.body.description], (error, result) => {
    if (error) {
      return next(error);
    }
    res.status(200).json({ id: emptyOrRows(result)[0].id });
  });
});



router.delete('/delete/:id', (req, res, next) => {
  const id = parseInt(req.params.id);
  pool.query('DELETE FROM task WHERE id = $1', [id], (error, result) => {
    if (error) {
      return next(error)
    }
    res.status(200).json({ success: true, message: `Deleted task ${id}` })
  })
})


export default router;
