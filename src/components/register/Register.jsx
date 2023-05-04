import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  isLogIn,
  isRegisterModal,
  isRegisterWithEmail,
  ValidateData,
} from "../../helpers/utils";
import { useCareerList, useAddUser } from "../../hooks";
import { alertState, isRegisterState, userInfo } from "../../reducers";
import Modal from "../modals/Modal";
import RegisterModal from "../modals/RegisterModal";
import Notification from "../notification/Notification";
import RegisterForm from "./RegisterForm";
import { googleIcon } from "../../images";
import { useTheme } from "styled-components";
const Register = () => {
  const theme = useTheme();
  const [isHoverB, setIsHoverB] = useState(false);

  const handleMouseEnterB = () => {
     setIsHoverB(true);
  };
  const handleMouseLeaveB = () => {
     setIsHoverB(false);
  };
  const boxStyleB = {
   background: isHoverB ? theme.bH  : theme.linkColor,
   color:theme.header,
   position: 'relative',
   top:'-20px',
    transition: 'all 0.10s ease',
  };
  const { mutate: addUser } = useAddUser();

  const { data: dataCareers = [], isFetching: fetchingCareers } = useCareerList();
  const [career, setCareer] = useState(dataCareers);
  
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    career: "",
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
      : setValues({ ...values, "career": e.value });
  };

  const handleSubmit = () => {
    addUser(values, {
      onSuccess: (data) => {
        dispatch(
          alertState({
            isOpen: true,
            message: "User was successfully created",
            type: "success",
          })
        );
        dispatch(userInfo(data));
        dispatch(isRegisterState(true));
        isLogIn(dispatch);
        isRegisterWithEmail(dispatch, registerWithEmail);
      },
      onError: (error) => {
        console.log(error);
        dispatch(
          alertState({
            isOpen: true,
            message: error,
            type: "error",
          })
        );
      },
    });

    setValues({
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      career: values.career,
    });
  };

  useEffect(() => {
    !fetchingCareers && dataCareers.length > 0 && setCareer(dataCareers);
    // eslint-disable-next-line
  }, [dataCareers]);

  useEffect(() => {
    !registerWithEmail && setValues({
      username: "",
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      career: values.career,
    });

  }, [ registerWithEmail ]);

  return (
    <div>
      <Modal
        active={registerModal}
        toggle={isRegisterModal}
        dispatch={dispatch}
      >
        <h1 style={{ textAlign: "center", color: theme.userName  }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color: theme.userName2 }}>
          Crea una cuenta con tu correo electrónico.
        </h5>
        <button
       style={boxStyleB} onMouseEnter={handleMouseEnterB}
       onMouseLeave={handleMouseLeaveB} 
          className="boton-correo button1"
          onClick={() => isRegisterWithEmail(dispatch, registerWithEmail)}
        >
          Registrate con correo electronico
        </button>
        <br />
        <p style={{ textAlign: "center", color: theme.userName2 }}  className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </Modal>

      <RegisterModal
        active={registerWithEmail}
        toggle={isRegisterWithEmail}
        dispatch={dispatch}
      >
        <h1 style={{ textAlign: "center", color:theme.userName }}>Registrate</h1>
        <h5 style={{ textAlign: "center", color:theme.userName2 }}>
          Crea una cuenta con tu correo electronico.
        </h5>
        
        <RegisterForm values={values} onChange={onChange} options={career} />
        <br />
        <button className="boton-crea button2" onClick={handleSubmit}>
          Crea tu cuenta
        </button>
        <p style={{color:theme.userName2}} className="aviso-privacidad">
          Al continuar, tu estas aceptas los términos y condiciones
          <br />y el aviso de privacidad.
        </p>
      </RegisterModal>
      <Notification />
    </div>
  );
};

export default Register;
