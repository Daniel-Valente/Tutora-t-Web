import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isRegisterModal, isRegisterWithEmail, ValidateData } from '../../helpers/utils';
import { useCareerList } from '../../hooks';
import { googleIcon } from '../../images';
import { alertState } from '../../reducers';
import Modal from '../modals/Modal';

import RegisterModal from '../modals/RegisterModal';
import Notification from '../notification/Notification';
import RegisterForm from './RegisterForm';

const Register = () => {
  const { data: dataCareers = [], isFetching: fetchingCareers } = useCareerList();
  const [career, setCareer] = useState(dataCareers);
  const [values, setValues] = useState({
    username: '',
    nombre: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    carrera: '',
  });

  const { value: registerModal } = useSelector(state => state.registerModal);
  const { value: registerWithEmail } = useSelector(state => state.registerWithEmail);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const validation = ValidateData(e.target, values);

    if (!validation.confirm) {
      dispatch(alertState({
        isOpen: true,
        message: validation.errorMessage,
        type: 'error'
      }));
    }
    else {
      e.target ? setValues({ ...values, [e.target.name]: e.target.value }) : setValues({ ...values, ['carrera']: e.value })
    }
  }

  const handleSubmit = () => {
    setValues({
      username: '',
      nombre: '',
      email: '',
      telefono: '',
      password: '',
      confirmPassword: '',
      carrera: ''
    });
  }

  useEffect(() => {
    !fetchingCareers && dataCareers.length > 0 && setCareer(dataCareers);
  }, [dataCareers]);

  return (
    <div>
      <Modal active={ registerModal } toggle={ isRegisterModal } dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Crea una cuenta con tu correo electrónico o con Google.
        </h5>
        <button className="boton-google">Registrate con Google</button>
        <img src={googleIcon} className="google-icon"></img>
        <br />
        <button
          className="boton-correo"
          onClick={() => isRegisterWithEmail(dispatch, registerWithEmail) }>
          Registrate con correo electronico
        </button>
        <br />
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </Modal>

      <RegisterModal active={ registerWithEmail } toggle={ isRegisterWithEmail } dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Crea una cuenta con tu correo electronico.
        </h5>
        <RegisterForm
          values={values}
          onChange={onChange}
          options={career}
        />
        <br />
        <button className="boton-crea" onClick={handleSubmit}>Crea tu cuenta</button>
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </RegisterModal>
      <Notification />
    </div>
  )
}

export default Register;