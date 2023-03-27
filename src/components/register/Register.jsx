import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  isLogIn,
  isRegisterModal,
  isRegisterWithEmail,
  ValidateData,
} from "../../helpers/utils";
import { useCareerList, useAddUser } from "../../hooks";
import { alertState, userLogInState } from "../../reducers";
import Modal from "../modals/Modal";
import RegisterModal from "../modals/RegisterModal";
import Notification from "../notification/Notification";
import RegisterForm from "./RegisterForm";

const Register = () => {
  const { mutate: addUser } = useAddUser();

  const { data: dataCareers = [], isFetching: fetchingCareers } = useCareerList();
  const [career, setCareer] = useState(dataCareers);
  
  const [values, setValues] = useState({
    username: "",
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    carrera: "",
  });

  const { value: registerModal } = useSelector((state) => state.registerModal);
  const { value: registerWithEmail } = useSelector((state) => state.registerWithEmail);
  const dispatch = useDispatch();

  const onChange = (e) => {
    const validation = ValidateData(e.target, values);
    if (!validation.confirm) {
      dispatch(
        alertState({
          isOpen: true,
          message: validation.errorMessage,
          type: "error",
        })
      );
    }

    e.target
      ? setValues({ ...values, [e.target.name]: e.target.value })
      : setValues({ ...values, "carrera": e.value });
  };

  const handleSubmit = () => {

    addUser(values, {
      onSuccess: ({data}) => {
        dispatch(
          alertState({
            isOpen: true,
            message: "User was successfully created",
            type: "success",
          })
        );
        dispatch(userLogInState(data));
        isLogIn(dispatch);
        isRegisterWithEmail(dispatch, registerWithEmail);
      },
      onError: ({ response }) => {
        dispatch(
          alertState({
            isOpen: true,
            message: response.data.error,
            type: "error",
          })
        );
      },
    });

    setValues({
      username: "",
      nombre: "",
      email: "",
      telefono: "",
      password: "",
      confirmPassword: "",
      carrera: values.carrera,
    });
  };

  useEffect(() => {
    !fetchingCareers && dataCareers.length > 0 && setCareer(dataCareers);
    // eslint-disable-next-line
  }, [dataCareers]);

  return (
    <div>
      <Modal
        active={registerModal}
        toggle={isRegisterModal}
        dispatch={dispatch}
      >
        <h1 style={{ textAlign: "center" }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Crea una cuenta con tu correo electrónico o con Google.
        </h5>
        <br />
        <button
          className="boton-correo button1"
          onClick={() => isRegisterWithEmail(dispatch, registerWithEmail)}
        >
          Registrate con correo electronico
        </button>
        <br />
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </Modal>

      <RegisterModal
        active={registerWithEmail}
        toggle={isRegisterWithEmail}
        dispatch={dispatch}
      >
        <h1 style={{ textAlign: "center" }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: "#828181" }}>
          Crea una cuenta con tu correo electronico.
        </h5>
        
        <RegisterForm values={values} onChange={onChange} options={career} />
        <br />
        <button className="boton-crea button2" onClick={handleSubmit}>
          Crea tu cuenta
        </button>
        <p className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </RegisterModal>
      <Notification />
    </div>
  );
};

export default Register;
