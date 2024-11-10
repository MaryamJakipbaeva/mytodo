import {useState} from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  return (
    <div id="container" >
       <h3>Todos</h3>
       <form>
        <input placeholder='Add new task'
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={e => {
          if
        }}
        />
       </form>
       <ul>


       </ul>
    </div>
  );
}

export default App;
