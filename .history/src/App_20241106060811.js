import {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

const url = 'http://localhost:3000'

function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(url)
    .then((response) => {
      setTasks(response.data)
    }).catch(error => {
      alert(error.response.data.error )
    )
    })
  }, [])

  const addTask = () => {
    setTasks([...tasks, task])
    setTask('')
  }

  const deleteTask = (deleted) => {
    const withoutRemoved = tasks.filter((item) => item !== deleted)
    setTasks(withoutRemoved)}
  return (
    <div id="container" >
       <h3>Todos</h3>
       <form>
        <input placeholder='Add new task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={e => {
          if(e.key === 'Enter') {
            e.preventDefault()
            addTask()
          }
        }}
        />
       </form>
       <ul>
               {
               tasks.map(item =>(
                <li>{item}
                <button className='delete-button' onClick={() => deleteTask(item)}> Delete</button>
                </li>
                 ))
               }
       </ul>
    </div>
  );
}

export default App;
