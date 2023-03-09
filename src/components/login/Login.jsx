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
    <>
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
        <Link to="/register">Registrarse</Link>
      </form>

      <figure
        className="sesionGoogle"
        onClick={() => {
          sesionProvider(google);
        }}
      >
        <img
          src="https://antoniofernandez.com/assets/blog/node-google-login.png"
          alt=""
          width={50}
        />
      </figure>
      <figure
        className="sesionGoogle"
        onClick={() => {
          sesionProvider(facebook);
        }}
      >
        <img
          src="https://thumbs.dreamstime.com/b/icono-del-logo-de-facebook-voronezh-rusia-noviembre-circular-en-color-azul-164585774.jpg"
          alt=""
          width={50}
        />
      </figure>
    </>
  );
};

export default Login;
