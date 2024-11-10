import {useState} from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    setTasks([...tasks, task])
    setTask('')
  }

  const deleteTask = (deleted) => 
  return (
    <div id="container" >
       <h3>Todos</h3>
       <form>
        <input placeholder='Add new task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={e => {
          if(e.key === 'Enter') {
            e.preventDefault();
            addTask()
          }
        }}
        />
       </form>
       <ul>
               {
               tasks.map(item =>(
                <li>{item}</li>
                 ))
               }
       </ul>
    </div>
  );
}

export default App;
