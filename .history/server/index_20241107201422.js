import express from 'express'
import cors from 'cors'
import todoRouter from './routers/todoRouter.js'



const port = process.env.PORT 

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
