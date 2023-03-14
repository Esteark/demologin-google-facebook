import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
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

const deleteTaskAction = (id, status) => {
  return {
    type: todoListType.DELETE_TASK,
    payload: {
      id: id,
      status: status,
    },
  };
};

export const deleteTaskActionAsync = (id) => {
  return async (dispatch) => {
    try {
      dispatch(deleteTaskAction("", "loading"));
      const docRef = doc(dataBase, collectionName, id);
      await deleteDoc(docRef);
      dispatch(deleteTaskAction(id, "success"));
    } catch (err) {
      dispatch(deleteTaskAction("", "error"));
    }
  };
};

export const editTaskAction = (task) => {
  return {
    type: todoListType.EDIT_TASK,
    payload: { ...task },
  };
};

const updateTaskAction = (task) => {
  return {
    type: todoListType.UPDATE_TASK,
    payload: { ...task },
  };
};

export const updateTaskActionAsync = (task) => {
  return async (dispatch) => {
    try {
      const docRef = doc(dataBase, collectionName, task.id);
      const data = {
        nameTask: task.nameTask,
        descriptionTask: task.descriptionTask,
      };

      await updateDoc(docRef, data);

      dispatch(
        updateTaskAction({
          task,
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        updateTaskAction({
          task,
          status: "error",
        })
      );
    }
  };
};
