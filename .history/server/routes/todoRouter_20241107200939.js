import { pool } from '../helpers/db.js';
import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    pool.query('select * from task', (error, result) => {
        if (error) {
            return res.status(500).json({error: error.message});
        }
        res.status(200).json(result.rows);
    });
});



export default router;
