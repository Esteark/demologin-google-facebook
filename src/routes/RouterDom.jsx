import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../components/login/Login";
import Home from "../components/home/Home";
import Register from "../components/register/Register";
import PrivateRoute from "./PrivateRoute";
import PublicRouter from "./PublicRouter";
import Error404 from "../components/error404/Error404";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Navbar from "../components/navbar/Navbar";

const RouterDom = () => {
  const [isLogin, setIsLogin] = useState(undefined);

  // useEffect(() => {
  //   const userLocal = JSON.parse(sessionStorage.getItem("userToken")) || null;
  //   if (userLocal) {
  //     setIsLogin(true);
  //   } else {
  //     setIsLogin(false);
  //   }
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, [setIsLogin]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar isAuth={isLogin} />}>
          <Route element={<PrivateRoute isAuth={isLogin} />}>
            <Route index element={<Home />} />
          </Route>

          <Route element={<PublicRouter isAuth={isLogin} />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterDom;
