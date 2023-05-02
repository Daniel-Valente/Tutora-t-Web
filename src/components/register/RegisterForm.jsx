import React, { useState } from 'react';
import Select from 'react-select';
import ViewPassword from './viewPassword';


const RegisterForm = (pops) => {
  const { values, onChange, options } = pops;

  const [passwordView, setPasswordView] = useState(false);
  const [confirmPasswordView, setConfirmPasswordView] = useState(false);
  const [changeTypePass, setChangeTypePass] = useState(false);
  const[confirmchangeTypePass, setConfirmChangeTypePass] = useState(false);
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
        type={changeTypePass ? "text" : "password"}
        value={values.password}
        name="password"
        placeholder="Contraseña"
        onChange={onChange}
        required
      />
      <div className="eye-icon-2" onClick={() => setChangeTypePass(!changeTypePass)}>
      <ViewPassword/>
      </div>
      <input
        type={confirmchangeTypePass ? "text" : "password"}
        value={values.confirmPassword}
        name="confirmPassword"
        placeholder="Confirmar Contraseña"
        onChange={onChange}
        required
      />
      <div className="eye-icon-3" onClick={() => setConfirmChangeTypePass(!confirmchangeTypePass)}>
      <ViewPassword/>
      </div>

      
      <Select
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