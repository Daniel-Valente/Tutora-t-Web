import React, { useState } from 'react';
import Select from 'react-select';
import ViewPassword from './viewPassword';
import { useTheme } from 'styled-components';


const RegisterForm = (pops) => {
  const { values, onChange, options } = pops;
  const theme = useTheme();
  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [changeTypePass, setChangeTypePass] = useState(false);
  const[confirmchangeTypePass, setConfirmChangeTypePass] = useState(false);
  return (
    <>
      <input
        style={{backgroundColor:theme.header, color: theme.userName}}
        type="text"
        placeholder="Nombre completo"
        value={values.name}
        name="name"
        onChange={onChange}
        required
      />
      <input
        style={{backgroundColor:theme.header, color: theme.userName}}
        type="text"
        placeholder="Nombre de usuario"
        value={values.username}
        name="username"
        onChange={onChange}
        required
      />
      <br />
      <input
        style={{backgroundColor:theme.header, color: theme.userName}}
        type="email"
        placeholder="Correo electrónico"
        value={values.email}
        name="email"
        onChange={onChange}
        required
      />
      <input
        style={{backgroundColor:theme.header, color: theme.userName}}
        type="text"
        placeholder="Número de teléfono"
        value={values.phone}
        name="phone"
        onChange={onChange}
        required
      />
      <br />

      <input
        style={{backgroundColor:theme.header, color: theme.userName}}
        type={changeTypePass ? "text" : "password"}
        value={values.password}
        name="password"
        placeholder="Contraseña"
        onChange={onChange}
        required
      />
      <div style={{filter:theme.eye}} className="eye-icon-2" onClick={() => setChangeTypePass(!changeTypePass)}>
      <ViewPassword/>
      </div>
      <input
        style={{backgroundColor:theme.header, color: theme.userName}}
        type={confirmchangeTypePass ? "text" : "password"}
        value={values.confirmPassword}
        name="confirmPassword"
        placeholder="Confirmar Contraseña"
        onChange={onChange}
        required
      />
      <div style={{filter:theme.eye}} className="eye-icon-3" onClick={() => setConfirmChangeTypePass(!confirmchangeTypePass)}>
      <ViewPassword/>
      </div>

      
      <Select
        style={{backgroundColor:theme.header, color: theme.userName}}
        placeholder="carrera"
        onChange={onChange}
        name="career"
        options={options}
        className="input-type"
      />
    </>
  )
}

export default RegisterForm;