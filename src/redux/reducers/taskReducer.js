import { todoListType } from "../types/userTypes";
const initialState = {
  tasks: [],
  status: "cargando",
  current: {},
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoListType.CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task],
        status: action.payload.status,
      };

    case todoListType.READ_TASKS:
      return {
        ...state,
        tasks: [...action.payload],
      };

    case todoListType.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
        status: action.payload.status,
      };

    case todoListType.EDIT_TASK:
      return {
        ...state,
        current: action.payload,
      };

    case todoListType.UPDATE_TASK:
      const dummyTasks = [...state.tasks];
      const taskIndex = dummyTasks.findIndex(
        (task) => task.id === action.payload.task.id
      );
      dummyTasks[taskIndex] = action.payload.task;

      return {
        ...state,
        tasks: [...dummyTasks],
        status: action.payload.status,
      };

    default:
      return state;
  }
};
