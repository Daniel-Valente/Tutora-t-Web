import React, { useState } from 'react';
import Select from 'react-select';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


const RegisterForm = (pops) => {
  const { values, onChange, options } = pops;

  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);

  return (
    <>
      <input
        type="text"
        placeholder="Nombre completo"
        value={values.name}
        name="name"
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={values.username}
        name="username"
        onChange={onChange}
        required
      />
      <br />
      <input
        type="email"
        placeholder="Correo electrónico"
        value={values.email}
        name="email"
        onChange={onChange}
        required
      />
      <input
        type="text"
        placeholder="Número de teléfono"
        value={values.phone}
        name="phone"
        onChange={onChange}
        required
      />
      <br />
      <input
        type={passwordView ? "text" : "password"}
        value={values.password}
        name="password"
        placeholder="Contraseña"
        onChange={onChange}
        required
      />
      <input
        type={confirmPasswordView ? "text" : "password"}
        value={values.confirmPassword}
        name="confirmPassword"
        placeholder="Confirmar Contraseña"
        onChange={onChange}
        required
      />
      <Select
        placeholder="carrera"
        onChange={onChange}
        name="career"
        options={options}
        className="input-type"
      />
      <button
        className="eye-icon-2"
        onClick={() =>
          passwordView ? setPasswordView(false) : setPasswordView(true)
        }
      >
        {passwordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </button>
      <button
        className="eye-icon-3"
        onClick={() =>
          confirmPasswordView
            ? setConfirmPasswordView(false)
            : setConfirmPasswordView(true)
        }
      >
        {confirmPasswordView ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </button>
    </>
  )
}

export default RegisterForm;