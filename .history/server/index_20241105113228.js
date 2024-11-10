import express from 'express'
import cors from 'cors'
import pkg from 'pg'

const port = 3002
const {Pool} = pkg

const app = express()
app.use(cors())

app.get('/', (req,res) => { 
  const pool = openDb()

  pool.query('select * from task', (error, result) =>{
    if(error) 
  })
  res.status(200).json({result:'Success'})
})

app.listen(port)
