import { todoListType } from "../types/userTypes";
const initialState = {
  tasks: [],
  status: "cargando",
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

    default:
      return state;
  }
};
