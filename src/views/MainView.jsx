import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "../components/login/Login";
import Register from "../components/register/Register";
import { isLoginModal } from "../helpers/utils";
import { CUCEI } from "../images";

const MainView = () => {
  const { value: loginModal } = useSelector(state => state.loginModal);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="linea-acostada" />
      <div>
        <img className="image-cucei" src={CUCEI} />

        <button className="button-HOY" onClick={() => isLoginModal(dispatch, loginModal)}>
          Comienza HOY!
        </button>
      </div>

      <Login />

      <Register />
    </div>
  );
};

export default MainView;
