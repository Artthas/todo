import { getDocs, collection, addDoc } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import {db, storage} from "../../db/init-db";
import {ref, uploadBytes} from 'firebase/storage';
import {v4} from 'uuid';
import TaskCard from '../task-card/TaskCard';

function App() {
  // created a state to get from it the data needed to create a task
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newFile, setNewFile] = useState();
  
  const [isChanged, setIsChanged] = useState(false);

  const tasksCollectionRef = collection(db, 'tasks');

  // necessary to obtain actual data when creating a task, editing, deleting
  useEffect(() => {
    const getTasks = async () => {
      const data = await getDocs(tasksCollectionRef);
      setTasks(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      setIsChanged(false);
    }
    getTasks();
  }, [isChanged])

  const createTask = async (evt) => {
    evt.preventDefault();
    // i bind a file to a task using a unique name
    const fileName = newFile.name + v4();
    const fileRef = ref(storage, `tasks/${fileName}`);
    await uploadBytes(fileRef, newFile);
    await addDoc(tasksCollectionRef, {title: newTitle, description: newDescription, endDate: newEndDate, file: fileName});
    // reset the fields
    setNewTitle('');
    setNewDescription('');
    setNewEndDate('');
    setIsChanged(true);
  }

  return (
    <React.Fragment>
      <form action="#" onSubmit={createTask}>
        <input type="text" name="task-new-title" placeholder="New title" value={newTitle} onChange={(evt) => {setNewTitle(evt.target.value)}}></input>
        <input type="text" name="task-new-description" placeholder="New description" value={newDescription} onChange={(evt) => {setNewDescription(evt.target.value)}}></input>
        <input type="date" name="task-new-end-date" placeholder="New end date" value={newEndDate} onChange={(evt) => {setNewEndDate(evt.target.value)}}></input>
        <input type="file" name="task-new-file" onChange={(evt) => {setNewFile(evt.target.files[0])}}></input>
        <button type="submit">Create</button>
      </form>
      <ul>
        {tasks.map((task) => {
          return (
            <TaskCard task={task} setIsChanged={setIsChanged} key={task.id}/>
            )
        })}
      </ul>
    </React.Fragment>
  );
}

export default App;
