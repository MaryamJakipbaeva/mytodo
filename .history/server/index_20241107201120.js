import express from 'express'
import cors from 'cors'
import {pool} from './db.js'



const port = process.env.PORT 

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
