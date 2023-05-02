import React from "react";
import { useDispatch, useSelector} from "react-redux";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import { isLoginModal } from "../helpers/utils";
import { CUCEI, CUCEIDARKS } from "../images";
import { useTheme } from "styled-components";
import { store } from "../store";
import { Loader } from "../components/loader/Loader";

const MainView = () => {
  const { layout: { loading: globalLoader } } = store.getState();
  const { value: loginModal } = useSelector(state => state.loginModal);
  const dispatch = useDispatch();
  const theme = useTheme();

  return (
    <div>
      {
        globalLoader && <Loader/>
      }
      <div style={{background:theme.linea}} className="linea-acostadaLogin" />
      <div>
        <img className="image-cucei" src={ theme.status === 'dark' ? CUCEIDARKS : CUCEI} />

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
