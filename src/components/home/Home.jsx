import React from "react";
import { useDispatch } from "react-redux";
import { userLogoutAsync } from "../../redux/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(userLogoutAsync());
  };
  return (
    <div>
      Home
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Home;
