import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../../firebase/firebaseConfig";
import { todoListType } from "../types/userTypes";

const collectionName = "toDoList";
const taskCollection = collection(dataBase, collectionName);

const createTaskAction = (task) => {
  return {
    type: todoListType.CREATE_TASK,
    payload: { ...task },
  };
};

const getTaskAction = (tasks) => {
  return {
    type: todoListType.READ_TASKS,
    payload: [...tasks],
  };
};

export const createTaskActionAsync = (task) => {
  return async (dispatch) => {
    try {
      const doc = await addDoc(taskCollection, task);
      const taskDoc = {
        task: { id: doc.id, ...task },
        status: "success",
      };
      dispatch(createTaskAction(taskDoc));
    } catch (error) {
      console.log(error);

      dispatch(
        createTaskAction({
          task: {},
          status: "error",
        })
      );
    }
  };
};

export const getTaskActionAsync = () => {
  return async (dispatch) => {
    try {
      const toDoCollection = collection(dataBase, collectionName);
      const querySnapshot = await getDocs(toDoCollection);
      const tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      dispatch(getTaskAction(tasks));
    } catch (error) {
      dispatch(getTaskAction([]));
    }
  };
};
