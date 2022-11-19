import React from 'react';
import {readTasks} from '../../db/actions';

function App() {
  const tasks = readTasks();

  console.log(tasks);

  return (
    <React.Fragment>
      <form action="#">
        <input type="text" name="task-name"></input>
      </form>
      <ul>
        {/* {tasks?.map((task) => {
          return (
            <li>
              <h2>{task.data.title}</h2>
              <p>{task.data.description}</p>
              <time>{task.data.date}</time>
            </li>
            )
        })} */}
      </ul>
    </React.Fragment>
  );
}

export default App;
