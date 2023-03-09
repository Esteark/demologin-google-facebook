import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRegisterAsync } from "../../redux/actions/userAction";
import "./styles.scss";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.loading);

  const submitForm = (data) => {
    dispatch(userRegisterAsync(data));
  };

  return (
    <form className="formRegister" onSubmit={handleSubmit(submitForm)}>
      <label>Nombre</label>
      <input
        type="text"
        placeholder="Ingrese su nombre"
        {...register("name", { required: "Nombre es requerido" })}
        className={errors.name ? "inputError" : ""}
      />
      <span>{errors.name && errors.name.message}</span>
      <label htmlFor="">Email</label>
      <input
        type="text"
        placeholder="Ingrese su email"
        {...register("email", { required: "email es requerido" })}
        className={errors.email ? "inputError" : ""}
      />
      <span>{errors.email && errors.email.message}</span>
      <label htmlFor="">Contraseña</label>
      <input
        type="password"
        placeholder="ingrese su contraseña"
        {...register("password", { required: "la contraseña es requerida" })}
        className={errors.password ? "inputError" : ""}
      />
      <span>{errors.password && errors.password.message}</span>
      <button type="submit" disabled={loading}>
        Registrarse
      </button>

      {loading && <span>Cargando....</span>}
      <Link to="/login">Ir al Login</Link>
    </form>
  );
};

export default Register;
