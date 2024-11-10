import fs from 'fs';
import path from 'path';
import { pool } from './db.js';

const __dirname = import.meta.url;

const initializeTestDb = () => {
  const sql = fs.readFileSync(path.resolve(new URL(__dirname).pathname, '../todp.sql'), "utf8");
  pool.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing SQL file:', error);
    } else {
      console.log('Database initialized with SQL file.');
    }
  });
}

export { initializeTestDb };
