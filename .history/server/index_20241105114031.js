import express from 'express'
import cors from 'cors'
import pkg from 'pg'

const port = 3001
const {Pool} = pkg

const app = express()
app.use(cors())


app.get('/', (req,res) => { 
  const pool = openDb()

  pool.query('select * from task', (error, result) =>{
    if(error) {
      return res.status(500).json({error: error.message})

    }
    return res.status(200).json(result.rows)
  })
})

const openDb = () => {
  const pool= new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todo', 
    password: 'Maryzor_2004',
    port: 5433
  })
  return pool
}

app.listen(port)