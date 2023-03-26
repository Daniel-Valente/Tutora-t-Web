import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { isLogIn, isLoginModal, isLoginWithEmail, isResetPassword, ValidateData } from '../../helpers/utils';
import LogInModal from '../modals/LogInModal';
import Modal from '../modals/Modal';
import { alertState, userLogInState } from '../../reducers';
import Notification from '../notification/Notification';
import { useLogIn, useResetPassword } from '../../hooks';
import ResetPasswordModal from '../modals/ResetPasswordModal';
import ValidateCodeModal from '../modals/ValidateCodeModal';
import NewPasswordModal from '../modals/NewPasswordModal';

const Login = () => {
  const { mutate: logIn } = useLogIn();
  const { mutate: sendPasswordResetEmail } = useResetPassword();

  const [password, setPassword] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { value: loginModal } = useSelector(state => state.loginModal);
  const { value: resetPasswordModal } = useSelector(state => state.resetPasswordModal);
  //const { value: validateCodeModal } = useSelector(state => state.validateCodedModal);
  const { value: loginWitnEmail } = useSelector(state => state.loginWitnEmail);
  const dispatch = useDispatch();

  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
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
        <button className="boton-correo button1" onClick={() => isLoginWithEmail(dispatch, loginWitnEmail)}>
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
        <button className="boton-correo button1" onClick={handleSubmit} >Ingresa con correo electronico</button>
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
        <button className="boton-correo button1" onClick={handleSubmitResetPassword} >Enviar correo</button>
        <br />
      </ResetPasswordModal>
      <ValidateCodeModal  active={true} toggle={isResetPassword} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Introduce codigo de validacion</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Por favor introduce el codigo que te fue proporcionado al correo electronico.
        </h5>
        <input className='validateInput' type="text" placeholder="Codigo" name='code'
          onChange={handleChange}
          required
        />
        <br />
        <button className="boton-correo2 button2" onClick={handleSubmitResetPassword} >Validar codigo</button>
        <br />
      </ValidateCodeModal>
      <NewPasswordModal active={false} toggle={isResetPassword} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Introduce tu nueva contraseña</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Introduce tu nueva contraseña aqui, recuerda que las dos deven de coincidir.
        </h5>
        <input className='pass' type={confirmPasswordView ? "text" : "password"} placeholder="Contraseña nueva" name='password'
          value={loginValue.password}
          onChange={handleChange}
          required
        />
        <br/>
        <input className='pass' type={confirmPasswordView ? "text" : "password"} placeholder="Contraseña nueva" name='password'
          value={loginValue.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
        className="eye-icon-4"
        onClick={() =>
          passwordView ? setPasswordView(false) : setPasswordView(true)
        }
      >
        {passwordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </button>
      <button
        className="eye-icon-5"
        onClick={() =>
          confirmPasswordView
            ? setConfirmPasswordView(false)
            : setConfirmPasswordView(true)
        }
      >
        {confirmPasswordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </button>
      <br/>
        <button className="boton-correo3 button2" onClick={handleSubmitResetPassword} >Cambiar contraseña</button>
        <br />
      </NewPasswordModal>

      <Notification />
    </div>
  )
}

export default Login;