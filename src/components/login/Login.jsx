import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { isLogIn, isLoginModal, isLoginWithEmail, isNewPassword, isResetPassword, isValidateCode, ValidateData } from '../../helpers/utils';
import LogInModal from '../modals/LogInModal';
import Modal from '../modals/Modal';
import { alertState, userLogInState } from '../../reducers';
import Notification from '../notification/Notification';
import { useLogIn, useNewPassword, useResetPassword } from '../../hooks';
import ResetPasswordModal from '../modals/ResetPasswordModal';
import ValidateCodeModal from '../modals/ValidateCodeModal';
import NewPasswordModal from '../modals/NewPasswordModal';
import { googleIcon } from '../../images';
import ViewPassword from '../register/viewPassword';

const Login = () => {
  const { mutate: logIn } = useLogIn();
  const { mutate: sendPasswordResetEmail } = useResetPassword();
  const { mutate: newPassword } = useNewPassword();

  const [codeValidation, setCodeValidation] = useState();
  const [password, setPassword] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    code: null,
  });

  const { value: loginModal } = useSelector(state => state.loginModal);
  const { value: resetPasswordModal } = useSelector(state => state.resetPasswordModal);
  const { value: validateCodeModal } = useSelector(state => state.validateCodeModal);
  const { value: newPasswordModal } = useSelector(state => state.newPasswordModal);
  const { value: loginWitnEmail } = useSelector(state => state.loginWitnEmail);
  const [changeTypePass, setChangeTypePass] = useState(false);
  const [changeTypePass2, setChangeTypePass2] = useState(false);
  const [changeTypePass2Confirm, setChangeTypePass2Confirm] = useState(false);
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
    setCodeValidation(Math.floor(Math.random() * 100000) + 1);
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
  }

  const handleSubmitResetPassword = () => {
    const user = {
      email: loginValue.email,
      code: codeValidation,
    }

    sendPasswordResetEmail(user, {
      onSuccess: (response) => {
        dispatch(
          alertState({
            isOpen: true,
            message: response.data,
            type: "success",
          })
        );

        isResetPassword(dispatch, resetPasswordModal);
        isValidateCode(dispatch, validateCodeModal);
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
  };

  const handleSubmitValidateCode = () => {
    if (codeValidation.toString() === loginValue.code) {
      isValidateCode(dispatch, validateCodeModal);
      isNewPassword(dispatch, newPasswordModal);
    }
    else {
      dispatch(
        alertState({
          isOpen: true,
          message: 'El código ingresado no coincide',
          type: "error",
        })
      );
    }
  };

  const handleSubmitNewPassword = () => {
    newPassword(loginValue, {
      onSuccess: () => {
        dispatch(
          alertState({
            isOpen: true,
            message: 'Nueva Contraseña creada',
            type: "success",
          })
        );

        setLoginValue({
          email: '',
          password: '',
          confirmPassword: '',
          code: null
        });
        
        isNewPassword(dispatch, newPasswordModal);
        isLoginWithEmail(dispatch, loginWitnEmail);
        setCodeValidation(null);
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
  }

  useEffect(() => {
    if (codeValidation) {
      setTimeout(() => {
        setCodeValidation(null);
      }, 300000);
    }
  }, [codeValidation]);

  return (
    <div>
      <Modal active={loginModal} toggle={isLoginModal} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Bienvenido de vuelta!</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Inicia sesion con tu correo electrónico o con Google.
        </h5>
        <button className="boton-correoGoogle buttonGoogle">
          Ingresa con Google
        </button>
        <div>
          <img className="google-icon" src={googleIcon} />
        </div>
        <br/>
        <button className="boton-correoLogin button1" onClick={() => isLoginWithEmail(dispatch, loginWitnEmail)}>
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
          type={changeTypePass ? "text" : "password"}
          placeholder="Contraseña" name='password'
          value={loginValue.password}
          onChange={handleChange}
          required
        />
        <div className="eye-icon" onClick={() => setChangeTypePass(!changeTypePass)}>
            <ViewPassword/>
        </div>
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

      <ValidateCodeModal active={validateCodeModal} toggle={isValidateCode} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Introduce codigo de validacion</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Por favor introduce el codigo que te fue proporcionado al correo electronico.
        </h5>
        <input className='validateInput' type="text" placeholder="Codigo" name='code'
          onChange={handleChange}
          value={loginValue.code}
          required
        />
        <br />
        <button className="boton-correo2 button2" onClick={handleSubmitValidateCode} >Validar codigo</button>
        <br />
      </ValidateCodeModal>

      <NewPasswordModal active={newPasswordModal} toggle={isNewPassword} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Introduce tu nueva contraseña</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Introduce tu nueva contraseña aqui, recuerda que las dos deven de coincidir.
        </h5>
        <input className='pass' type={changeTypePass2 ? "text" : "password"} placeholder="Contraseña nueva" name='password'
          value={loginValue.password}
          onChange={handleChange}
          required
        />
        <br />
        <input className='pass' type={changeTypePass2Confirm ? "text" : "password"} placeholder="Confirmar contraseña nueva" name='confirmPassword'
          value={loginValue.confirmPassword}
          onChange={handleChange}
          required
        />
        <div className="eye-icon-4" onClick={() => setChangeTypePass2(!changeTypePass2)}>
            <ViewPassword/>
        </div>
        <div className="eye-icon-5" onClick={() => setChangeTypePass2Confirm(!changeTypePass2Confirm)}>
            <ViewPassword/>
        </div>
        <br />
        <button className="boton-correo3 button2" onClick={handleSubmitNewPassword} >Cambiar contraseña</button>
        <br />
      </NewPasswordModal>

      <Notification />
    </div>
  )
}

export default Login;