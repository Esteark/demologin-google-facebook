import { userTypes } from "../types/userTypes";
//Importaciones necesarias para usar la reacion de usuario con email y contraseña en firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toggleLoading } from "./loadingActions";
import { async } from "@firebase/util";
//Importaciones necesarias para usar la reacion de usuario con email y contraseña en firebase
const userRegister = ({ name, email, error }) => {
  return {
    type: userTypes.CREATE_USER,
    payload: { name, email, error },
  };
};

export const userRegisterAsync = ({ email, password, name }) => {
  return async (dispatch) => {
    dispatch(toggleLoading());
    try {
      //Meotodo para crear usuario con correo y contraseña con firebase

      const createUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const UpdateUser = await updateProfile(auth.currentUser, {
        displayName: name,
      });

      dispatch(userRegister({ name, email, error: false }));
      dispatch(toggleLoading());
    } catch (error) {
      console.log(error);
      dispatch(userRegister({ name, email, error: true }));
      dispatch(toggleLoading());
    }
  };
};

const userLogin = (user) => {
  return {
    type: userTypes.LOGIN_USER,
    payload: user,
  };
};

export const userLoginAsync = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      dispatch(
        userLogin({
          name: user.displayName,
          email: user.email,
          error: false,
        })
      );
      sessionStorage.setItem(
        "userToken",
        JSON.stringify(user.auth.currentUser)
      );
    } catch (error) {
      userLogin({ name: "", email: "", error: true });
    }
  };
};

const userLogout = () => {
  return {
    type: userTypes.LOGOUT_USER,
  };
};

export const userLogoutAsync = () => {
  return async (dispatch) => {
    try {
      await signOut(auth);
      dispatch(userLogout());
    } catch (error) {
      console.log(error);
    }
  };
};

export const userLoginProviderAsync = (provider) => {
  return async (dispatch) => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      dispatch(
        userLogin({
          name: user.displayName,
          email: user.email,
          error: false,
        })
      );
    } catch (error) {
      userLogin({ name: "", email: "", error: true });
      console.log(error);
    }
  };
};
