import { loadingTypes, modal } from "../types/userTypes";

export const toggleLoading = (value = false) => {
  return {
    type: loadingTypes.TOGGLE_LOADING,
    payload: value,
  };
};

export const toggleModalAction = () => {
  return {
    type: modal.SHOW_MODAL,
  };
};
