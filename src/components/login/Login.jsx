import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { isLoginModal, isLoginWithEmail } from '../../helpers/utils';
import { googleIcon } from '../../images';
import LogInModal from '../modals/LogInModal';
import Modal from '../modals/Modal';

const Login = () => {
  const [password, setPassword] = useState(false);
  const [loginValue, setLoginValue] = useState({
    email: '',
    password: ''
  });

  const { value: loginModal } = useSelector(state => state.loginModal);
  const { value: loginWitnEmail } = useSelector(state => state.loginWitnEmail);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
  }
console.log(loginModal);
  return (
    <div>
      <Modal active={ loginModal } toggle={ isLoginModal } dispatch={dispatch}>
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

      <LogInModal active={ loginWitnEmail } toggle={ isLoginWithEmail } dispatch={dispatch}>
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
        <button className="boton-sin-fondo">¿Olvidaste tu contraseña? </button>
      </LogInModal>
    </div>
  )
}

export default Login;