import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../modals/modal';

import RegisterModal from '../modals/RegisterModal';
import Notification from '../notification/Notification';
import RegisterForm from './RegisterForm';

const Register = () => {
  const { data: dataCareers = [], isFetching: fetchingCareers } = useCareerListSelect();
  const [careerSelect, setCareerSelect] = useState(dataCareers);
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
  const { value: registerWithEmailModal } = useSelector(state => state.registerWithEmailModal);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const validation = ValidateData(e.target, values);

    if (!validation.confirm) {
      dispatch(viewAlert({
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
    !fetchingCareers && dataCareers.length > 0 && setCareerSelect(dataCareers);
  }, [dataCareers]);

  return (
    <div>
      <Modal active={} toggle={} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Crea una cuenta con tu correo electrónico o con Google.
        </h5>
        <button className="boton-google">Registrate con Google</button>
        <img src={googleIcon} className="google-icon"></img>
        <br />
        <button
          className="boton-correo"
          onClick={() => console.log('hola') }>
          Registrate con correo electronico
        </button>
        <br />
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </Modal>

      <RegisterModal active={} toggle={} dispatch={dispatch}>
        <h1 style={{ textAlign: "center" }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Crea una cuenta con tu correo electronico.
        </h5>
        <RegisterForm
          values={values}
          onChange={onChange}
          options={careerSelect}
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