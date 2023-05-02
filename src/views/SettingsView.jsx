import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";

import Notification from "../components/notification/Notification";
import { useCareerList, useUpdateUser } from "../hooks";
import { user, fondo, perfilUsuarioGrande } from "../images";
import { alertState } from "../reducers";
import { Loader } from "../components/loader/Loader";
import { store } from "../store";
import { useTheme } from "styled-components";

const SettingsView = () => {
  const { mutate: updateUser } = useUpdateUser();
  const theme = useTheme();
  const userInfo = useSelector(state => state.user);
  const { layout: { loading: globalLoader } } = store.getState();

  const [configValue, setConfigValue] = useState({
    uid_user: userInfo.uid_user,
    imgName: '',
    imgPortadaName: '',
    nombre: userInfo.name,
    telefono: userInfo.phone,
    passwordA: '',
    password: '',
    username: userInfo.username,
    carrera: userInfo.career
  });
  const [images, setImages] = useState({ imgName: '', imgPortadaName: '' });
  const [ disableSave, setDisableSave ] = useState(true);
  const [options, setOptions] = useState('Cuenta');
  
  const { data: dataCareersList = [], isFetching: fetchingCareersList } = useCareerList();
  const [careerList, setCareerList] = useState(dataCareersList);

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

  const handleCancel = () => {
    window.location.href = "/home";
  }

  useEffect(() => {
    !fetchingCareersList && dataCareersList.length > 0 && setCareerList(dataCareersList);
    // eslint-disable-next-line
  }, [dataCareersList]);

  return (
    <div>
      {
        globalLoader && <Loader/>
      }
      <div style={{background:theme.linea}} className="linea-acostadaConfiguracion" />
      <h1 style={{ marginLeft: "35%", color:theme.userName }}>Configuracion de la cuenta</h1>
      <div className="row">
        <div className="col-1" />
        <div className="col-9 row">
          <div className={`col-1 card-settings ${options === 'Cuenta' ? 'card-settings-selected ' : ''}`} onClick={() => setOptions('Cuenta')}>Cuenta</div>
          <div className="col-0" />
          <div className={`col-1 card-settings ${options === 'Seguridad' ? 'card-settings-selected ' : ''}`} onClick={() => setOptions('Seguridad')}>Seguridad</div>
        </div>
        <div className="col-1" />
      </div>
      <div className="row">
        <div className="col-1" />
        {
          options === "Cuenta" &&
          <div className="col-9">
            <div className="row">
              <div style={{color:theme.userName}} className="col-3">
                <p>
                  <b>Imagen de perfil</b>
                </p>
                <img className="icon-perfil-setting"
                  src={`${userInfo.imgUrl ? userInfo.imgUrl : perfilUsuarioGrande}`}
                  alt={userInfo.username} />
                <p>
                  <b>Imagen de portada</b>
                </p>
                <img className="circular-portada"
                  src={`${userInfo.imgPortadaUrl ? userInfo.imgPortadaUrl : fondo}`}
                  alt={userInfo.username} />
              </div>
              <div className="col-4">
                <br /><br /><br />
                <div 
                  className="upload-btn-wrapper "
                  onChange={onChange} 
                  onFocus={ () => setDisableSave(false) }>
                  <button className="boton-standar-rw" style={{ marginLeft: "7%" }}>
                    Carga un archivo
                  </button>
                  <br />
                  <br />
                  <input type="text" readOnly value={images.imgName} />
                  <input className="upload-file-buton" name="imgName" type="file" accept="image/*" />
                </div>
                <div
                  className="upload-btn-wrapper "
                  onChange={onChange}
                  onFocus={ () => setDisableSave(false) }
                  style={{ marginTop: "24%" }}
                >
                  <button className="boton-standar-rw" style={{ marginLeft: "7%" }}>
                    Carga un archivo
                  </button>
                  <br />
                  <br />
                  <input  type="text" readOnly value={images.imgPortadaName} />
                  <input className="upload-file-buton" name="imgPortadaName" type="file" accept="image/*" />
                </div>

              </div>
              <div className="col-3 row">
                <div className="col-5">
                <p style={{color:theme.userName}}>
                  <b>Nombre completo</b>
                  <br /><br /><br />
                  <b>Nombre de usuario</b>
                  <br /><br /><br />
                  <b>Telefono</b>
                  <br /><br /><br />
                  <b>Carrera</b>
                </p>
                </div>
                <div className="col-1">
                <input
                  style={{background:theme.header, color: theme.userName}}
                  onFocus={ () => setDisableSave(false) }
                  onChange={onChange}
                  type="text"
                  placeholder="Nombre completo"
                  name="nombre"
                  value={configValue.nombre}
                />
                <input
                  style={{background:theme.header, color: theme.userName}}
                  onFocus={ () => setDisableSave(false) }
                  onChange={onChange}
                  type="text"
                  placeholder="Nombre de usuario"
                  name="username"
                  value={configValue.username}
                />
                <input
                  style={{background:theme.header, color: theme.userName}}
                  onFocus={ () => setDisableSave(false) }
                  onChange={onChange}
                  type="text"
                  placeholder="Telefono"
                  name="telefono"
                  value={configValue.telefono}
                />
                <Select
                  style={{background:theme.header, color: theme.userName}}
                  onFocus={ () => setDisableSave(false) }
                  placeholder='carrera'
                  name="carrera" 
                  options={careerList}
                  defaultValue={careerList[careerList.findIndex(career => career.value === configValue.carrera)]}
                  className='select-career-settings' />
                </div>
              </div>
            </div>
            <br />
            <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
            <button className="cancel-button" disabled={disableSave} onClick={handleSubmit}>Guardar</button>
          </div>
        }
        {
          options === "Seguridad" &&
          <div className="col-9">
            <div className="row">
              <div className="col-2">
                <p>
                  <b>Contraseña anterior</b>
                  <br /><br /><br />
                  <b>Nueva contraseña</b>
                </p>
              </div>
              <div className="col-1">
              <input
                  onFocus={ () => setDisableSave(false) }
                  onChange={onChange}
                  type="password"
                  placeholder="Contraseña anterior"
                  name="passowrdA"
                  value={configValue.passwordA}
                />
                <input
                  onFocus={ () => setDisableSave(false) }
                  onChange={onChange}
                  type="password"
                  placeholder="Nueva contraseña"
                  name="password"
                  value={configValue.password}
                  
                />
              </div>
            </div>
            <br />
            <button className="cancel-button" onClick={handleCancel}>Cancelar</button>
            <button className="cancel-button" disabled={disableSave} onClick={handleSubmit}>Guardar</button>
          </div>
        }
        <div className="col-1" />
      </div>
      <Notification />
    </div>
  );
};

export default SettingsView;
