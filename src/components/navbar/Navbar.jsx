import React, { useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { userLogoutAsync } from "../../redux/actions/userAction";
import { AiFillPlusCircle } from "react-icons/ai";
import "./styles.scss";
import { toggleModalAction } from "../../redux/actions/loadingActions";

const Navbar = ({ isAuth }) => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userLogoutAsync());
  };
  return (
    <>
      <nav className="navBar">
        <figure>
          <HiOutlinePencilAlt className="icon" />
          <span>To do list</span>
        </figure>

        {isAuth ? (
          <>
            <AiFillPlusCircle
              className="icon"
              onClick={() => dispatch(toggleModalAction())}
            />
            <button onClick={logOut}>Logout</button>
          </>
        ) : (
          <div className="itemNavs">
            <NavLink to="/login" className="nav_item">
              Inciar sesión
            </NavLink>
            <NavLink to="/register" className="nav_item">
              Registro
            </NavLink>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
