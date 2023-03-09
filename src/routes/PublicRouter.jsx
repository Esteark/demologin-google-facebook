import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRouter = ({ isAuth }) => {
  return <div>{isAuth ? <Navigate to={"/"} /> : <Outlet />}</div>;
};

export default PublicRouter;
