import { updateDoc, deleteDoc, doc } from 'firebase/firestore';
import React, {useState, useEffect} from 'react';
import {db, storage} from "../../db/init-db";
import { ref, deleteObject, uploadBytes } from "firebase/storage";
import {v4} from 'uuid';

function TaskCard(props) {
  // created a state to get from it the data needed to edit a task
  const [editTitle, setEditTitle] = useState();
  const [editDescription, setEditDescription] = useState();
  const [editEndDate, setEditEndDate] = useState();
  const [newFile, setNewFile] = useState();

  const [isEditTask, setIsEditTask] = useState(false);

  const saveTask = async (evt, id) => {
    evt.preventDefault();
    const taskDoc = doc(db, 'tasks', id);
    let fileName = '';
    if (newFile) {
      fileName = newFile.name + v4();
      const fileRef = ref(storage, `tasks/${fileName}`);
      await uploadBytes(fileRef, newFile);
    }
    await updateDoc(taskDoc, {
      title: editTitle,
      description: editDescription,
      endDate: editEndDate,
      file: fileName,
    })
    setIsEditTask(false);
    props.setIsChanged(true);
  }

  const deleteTask = async (id) => {
    const taskDoc = doc(db, 'tasks', id);
    await deleteDoc(taskDoc);
    props.setIsChanged(true);
  }

  const deleteFile = async () => {
    const oldFileRef = ref(storage, `tasks/${props.task.file}`);
    await deleteObject(oldFileRef);
    const taskDoc = doc(db, 'tasks', props.task.id);
    // when deleting a file, I delete the name of the deleted file in the task in the database
    await updateDoc(taskDoc, {file: ''})
    props.setIsChanged(true);
  }

  // so that when opening the editing window, the current data is entered in the fields
  useEffect(() =>{
    setEditTitle(props.task.title);
    setEditDescription(props.task.description);
    setEditEndDate(props.task.endDate);
  }, [isEditTask]);

  return (
    <li style={new Date(props.task.endDate) < new Date() ? {color: 'rgba(0,0,0,0.4)'} : {}}>
      <h2>{props.task.title}</h2>
      <p>{props.task.description}</p>
      <time>{props.task.endDate}</time>
      <p>{props.task.file}</p>
      {!isEditTask ? <React.Fragment><button onClick={() => {setIsEditTask(true)}}>Edit</button><button onClick={() => {deleteTask(props.task.id)}}>Delete</button></React.Fragment> : ''}
      {isEditTask ?
        <form action="#" onSubmit={(evt) => saveTask(evt, props.task.id)}>
          <input type="text" name="task-edit-title" placeholder="Title" value={editTitle} onChange={(evt) => {setEditTitle(evt.target.value)}}></input>
          <input type="text" name="task-edit-description" placeholder="Description" value={editDescription} onChange={(evt) => {setEditDescription(evt.target.value)}}></input>
          <input type="date" name="task-edit-end-date" placeholder="End date" value={editEndDate} onChange={(evt) => {setEditEndDate(evt.target.value)}}></input>
          <p>{props.task.file}</p>
          {props.task.file ? <button type="button" onClick={deleteFile}>Delete file</button> :
          <input type="file" name="task-new-file" onChange={(evt) => {setNewFile(evt.target.files[0])}}></input>}
          <button type="submit">Save</button><button onClick={() => {setIsEditTask(false)}}>Cancel</button>
        </form> : ''}
    </li>
  );
}

export default TaskCard;
