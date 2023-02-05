import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Login from "../components/login/Login";
import Register from "../components/register/Register";
import { CUCEI } from "../images";

const MainView = () => {
  return (
    <div>
      <div className="linea-acostada" />
      <div>
        <img className="image-cucei" src={CUCEI} />

        <button className="button-HOY" onClick={() => console.log("hola")}>
          Comienza HOY!
        </button>
      </div>

      <Login />

      <Register />
    </div>
  );
};

export default MainView;
