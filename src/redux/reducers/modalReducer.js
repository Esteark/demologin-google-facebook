import { modal } from "../types/userTypes";
const initialState = {
  modal: false,
};
export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case modal.SHOW_MODAL:
      return {
        ...state,
        modal: !state.modal,
      };

    default:
      return state;
  }
};
