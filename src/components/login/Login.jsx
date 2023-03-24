import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { isLogIn, isLoginModal, isLoginWithEmail, isResetPassword, ValidateData } from '../../helpers/utils';
import { googleIcon } from '../../images';
import LogInModal from '../modals/LogInModal';
import Modal from '../modals/Modal';
import { alertState, userLogInState } from '../../reducers';
import Notification from '../notification/Notification';
import { useLogIn, useResetPassword } from '../../hooks';
import ResetPasswordModal from '../modals/ResetPasswordModal';

const Login = () => {
  const { mutate: logIn } = useLogIn();
  const { mutate: sendPasswordResetEmail } = useResetPassword();

  const [password, setPassword] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: ''
  });

  const { value: loginModal } = useSelector(state => state.loginModal);
  const { value: resetPasswordModal } = useSelector(state => state.resetPasswordModal);
  const { value: loginWitnEmail } = useSelector(state => state.loginWitnEmail);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const validation = ValidateData(event.target, loginValue);
    if (!validation.confirm) {
      dispatch(
        alertState({
          isOpen: true,
          message: validation.errorMessage,
          type: "error",
        })
      );
    }

    setLoginValue({ ...loginValue, [event.target.name]: event.target.value })
  }

  const resetPassword = () => {
    setLoginValue({
      email: '',
      password: ''
    });

    isLoginWithEmail(dispatch, loginWitnEmail);
    isResetPassword(dispatch, resetPasswordModal);
  }

  const handleSubmit = () => {
    logIn(loginValue, {
      onSuccess: (response) => {
        dispatch(
          alertState({
            isOpen: true,
            message: "Welcome!!!",
            type: "success",
          })
        );

        dispatch(userLogInState(response.data));
        isLogIn(dispatch);
        isLoginWithEmail(dispatch, loginWitnEmail);
      },
      onError: ({ response }) => {
        dispatch(
          alertState({
            isOpen: true,
            message: response.data.error,
            type: "error",
          })
        );
      }
    });
    setLoginValue({
      email: '',
      password: ''
    });
  }

  const handleSubmitResetPassword = () => {
    sendPasswordResetEmail(loginValue, {
      onSuccess: (response) => {
        dispatch(
          alertState({
            isOpen: true,
            message: response.data,
            type: "success",
          })
        );

        isResetPassword(dispatch, resetPasswordModal);
      },
      onError: ({ response }) => {
        dispatch(
          alertState({
            isOpen: true,
            message: response.data.error,
            type: "error",
          })
        );
      }
    });

    setLoginValue({
      email: '',
      password: ''
    });
  }

  return (
    <div>
      <Modal active={loginModal} toggle={isLoginModal} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Bienvenido de vuelta!</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Inicia sesion con tu correo electrónico o con Google.
        </h5>
        <button className="boton-google">Ingresar con Google</button>
        <img src={googleIcon} className="google-icon"></img>
        <br />
        <button className="boton-correo" onClick={() => isLoginWithEmail(dispatch, loginWitnEmail)}>
          Ingresa con correo electronico
        </button>
        <br />
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </Modal>

      <LogInModal active={loginWitnEmail} toggle={isLoginWithEmail} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Iniciar Sesion</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Inicia sesion con tu correo electronico aqui.
        </h5>
        <input type="email" placeholder="Correo electronico" name='email'
          value={loginValue.email}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type={password ? "text" : "password"}
          placeholder="Contraseña" name='password'
          value={loginValue.password}
          onChange={handleChange}
          required
        />
        <button
          className="eye-icon"
          onClick={() => (password ? setPassword(false) : setPassword(true))}
        >
          {password ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
        <br />
        <button className="boton-correo" onClick={handleSubmit} >Ingresa con correo electronico</button>
        <br />
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
        <div className="linea-acostada" />
        <button className="boton-sin-fondo" onClick={resetPassword}>¿Olvidaste tu contraseña? </button>
      </LogInModal>

      <ResetPasswordModal active={resetPasswordModal} toggle={isResetPassword} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Iniciar Sesion</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Recupera tu contraseña aquí.
        </h5>
        <input type="email" placeholder="Correo electronico" name='email'
          value={loginValue.email}
          onChange={handleChange}
          required
        />
        <br />
        <button className="boton-correo" onClick={handleSubmitResetPassword} >Enviar correo</button>
        <br />
      </ResetPasswordModal>

      <Notification />
    </div>
  )
}

export default Login;