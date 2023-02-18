import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { decode } from "string-encode-decode";
import Notification from "../components/notification/Notification";
import { useUpdateUser } from "../hooks";
import { user, fondo } from "../images";
import { alertState } from "../reducers";

const SettingsView = () => {
  const { mutate: updateUser } = useUpdateUser();
  const userInfo = useSelector(state => state.user);
  const [configValue, setConfigValue] = useState({
    uid_user: userInfo.uid_user,
    imgName: '',
    imgPortadaName: '',
    nombre: userInfo.name,
    telefono: userInfo.phone,
    password: decode( userInfo.password ),
    username: userInfo.username,
    carrera: userInfo.career
  });
  const [images, setImages] = useState({ imgName: '', imgPortadaName: '' });

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setImages({ ...images, [e.target.name]: e.target.files[0].name });
      setConfigValue({ ...configValue, [e.target.name]: e.target.files[0] });
    }
    else {
      setConfigValue({ ...configValue, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    if (configValue.nombre === userInfo.name) configValue.nombre = '';
    if (configValue.telefono === userInfo.phone) configValue.telefono = '';
    if (configValue.password === userInfo.password) configValue.password = '';
    if (configValue.carrera === userInfo.career) configValue.carrera = '';
    if (configValue.username === userInfo.username) configValue.username = '';

    updateUser(configValue, {
      onSuccess: (response) => {
        console.log(response);
        window.location.href = "/home";
      },
      onError: (response) => {
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
  
  return (
    <div>
      <div className="linea-acostada" />
      <h1 style={{ marginLeft: "35%" }}>Configuracion de la cuenta</h1>

      <div style={{ float: "left", marginLeft: "30%" }}>
        <p>
          <b>Imagen de perfil</b>
        </p>
        <img className="icon-perfil-setting"
          src={`${userInfo.imgUrl ? userInfo.imgUrl : user}`}
          alt={userInfo.username} />
        <p>
          <b>Imagen de portada</b>
        </p>
        <img className="circular-portada"
          src={`${userInfo.imgPortadaUrl ? userInfo.imgPortadaUrl : fondo}`}
          alt={userInfo.username} />
        <br />
        <br />
        <p>
          <b>Nombre completo</b>
        </p>
        <br />
        <p>
          <b>Nombre de usuario</b>
        </p>
        <br />
        <p>
          <b>Teléfono</b>
        </p>
        <br />
        <p>
          <b>Cambiar contraseña</b>
        </p>
        <br />
        <button>Cancelar</button>
      </div>

      <div style={{ float: "left", marginLeft: "5%", marginTop: "4%" }}>
        <div className="upload-btn-wrapper " onChange={onChange}>
          <button className="boton-standar-rw" style={{ marginLeft: "7%" }}>
            Carga un archivo
          </button>
          <br />
          <br />
          <input type="text" readOnly value={images.imgName} />
          <input className="upload-file-buton" name="imgName" type="file" accept="image/*" />
        </div>

        <br />

        <div
          className="upload-btn-wrapper "
          onChange={onChange}
          style={{ marginTop: "25%" }}
        >
          <button className="boton-standar-rw" style={{ marginLeft: "7%" }}>
            Carga un archivo
          </button>
          <br />
          <br />
          <input type="text" readOnly value={images.imgPortadaName} />
          <input className="upload-file-buton" name="imgPortadaName" type="file" accept="image/*" />
        </div>

        <br />

        <div style={{ marginTop: "12%" }}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Nombre completo"
            name="nombre"
            value={configValue.nombre}
          />
        </div>
        <div style={{ marginTop: "2%" }}>
          <input
            onChange={onChange}
            type="text"
            placeholder="username"
            name="username"
            value={configValue.username}
          />
        </div>
        <div style={{ marginTop: "2%" }}>
          <input
            onChange={onChange}
            type="text"
            placeholder="Telefono"
            name="telefono"
            value={configValue.telefono}
          />
        </div>
        <div style={{ marginTop: "2%" }}>
          <input
            onChange={onChange}
            type="password"
            placeholder="Nueva contraseña"
            name="password"
            value={configValue.password}
          />
        </div>

        <br />
        <button style={{ marginTop: "3%" }} onClick={handleSubmit}>Guardar</button>
      </div>
      <Notification />
    </div>
  );
};

export default SettingsView;
