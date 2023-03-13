import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { facebook, google } from "../../firebase/firebaseConfig";
import {
  userLoginAsync,
  userLoginProviderAsync,
} from "../../redux/actions/userAction";
import "./styles.scss";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const userLocal = JSON.parse(sessionStorage("userToken"));
  //   if (userLocal) {
  //     navigate("/");
  //   }
  // }, []);

  const onSubmitForm = (data) => {
    dispatch(userLoginAsync(data));
    if (!user.error) {
      navigate("/");
    }
  };

  const sesionProvider = (provider) => {
    dispatch(userLoginProviderAsync(provider));
  };

  return (
    <section className="SecFormLogin">
      <form className="formRegister" onSubmit={handleSubmit(onSubmitForm)}>
        <label htmlFor="">email</label>
        <input
          type="text"
          {...register("email", { required: "Ingresa un email" })}
        />
        {errors.email && <span>{errors.email.message}</span>}
        <label htmlFor="">contraseña</label>
        <input
          type="password"
          {...register("password", { required: "Ingresa una contraseña" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
        <button type="submit">Iniciar sesión</button>
        <span>¿Notienes una cuenta?</span>
        {user.error ? <span>usuario o contraseña invalida</span> : <></>}
        <Link to="/register" className="btnRegister">
          Registrarse
        </Link>

        <section className="secIcons">
          <figure
            onClick={() => {
              sesionProvider(google);
            }}
          >
            <AiFillGoogleCircle className="icons" />
          </figure>
          <figure
            onClick={() => {
              sesionProvider(facebook);
            }}
          >
            <AiFillFacebook className="icons" />
          </figure>
        </section>
      </form>
    </section>
  );
};

export default Login;
