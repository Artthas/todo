import { collection, addDoc, getDocs } from "firebase/firestore"; 
import {db} from "./init-db";

export const addTask = async () => {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const readTasks = async () => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  return querySnapshot;
}
