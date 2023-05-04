import React, { useEffect, useState } from "react";
import Select from 'react-select';
import { useDispatch, useSelector } from "react-redux";

import Notification from "../components/notification/Notification";
import { useCareerList, useUpdateUser } from "../hooks";
import { user, fondo, perfilUsuarioGrande } from "../images";
import { alertState, userInfo } from "../reducers";
import { Loader } from "../components/loader/Loader";
import { store } from "../store";
import { useTheme } from "styled-components";

const SettingsView = () => {
  const { mutate: updateUser } = useUpdateUser();
  const theme = useTheme();
  const userInfoPerfil = useSelector(state => state.user);

  const [configValue, setConfigValue] = useState({
    uid_user: userInfoPerfil.uid_user,
    imgName: '',
    imgPortadaName: '',
    nombre: userInfoPerfil.name,
    telefono: userInfoPerfil.phone,
    passwordA: '',
    password: '',
    username: userInfoPerfil.username,
    carrera: userInfoPerfil.career
  });

  const [imagePerfilPreview, setImagePerfilPreview] = useState('');
  const [imagePortadaPreview, setImagePortadaPreview] = useState('');

  const [images, setImages] = useState({ imgName: '', imgPortadaName: '' });
  const [ disableSave, setDisableSave ] = useState(true);
  const [options, setOptions] = useState('Cuenta');
  
  const { data: dataCareersList = [], isFetching: fetchingCareersList } = useCareerList();
  const [careerList, setCareerList] = useState(dataCareersList);

  const dispatch = useDispatch();

  const onChange = (e) => {
    if (e.target.files) {
      e.target.name === 'imgName' && setImagePerfilPreview(URL.createObjectURL(e.target.files[0]));
      e.target.name === 'imgPortadaName' && setImagePortadaPreview(URL.createObjectURL(e.target.files[0]));

      setImages({ ...images, [e.target.name]: e.target.files[0].name });
      setConfigValue({ ...configValue, [e.target.name]: e.target.files[0] });
    }
    else {
      setConfigValue({ ...configValue, [e.target.name]: e.target.value });
    }
  };
  const customStyles = {
    singleValue: (base, state) => ({
      ...base,
      color: theme.userName,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? '#ededed' : '',
    }),
    control: (base, state) => ({
      ...base,
      
      background:theme.header,
      height: '50px',
      // match with the menu
      marginTop:'5px',
      borderRadius:  "10px",
      // Overwrittes the different states of border
      borderColor: state.isFocused ?  theme.userName : theme.userName,
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? theme.userName : theme.userName
      }
    }),
    menu: (base) => ({
      ...base,
      
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  }

  const handleSubmit = () => {
    if (configValue.nombre === userInfoPerfil.name) configValue.nombre = '';
    if (configValue.telefono === userInfoPerfil.phone) configValue.telefono = '';
    if (configValue.password === userInfoPerfil.password) configValue.password = '';
    if (configValue.carrera === userInfoPerfil.career) configValue.carrera = '';
    if (configValue.username === userInfoPerfil.username) configValue.username = '';

    updateUser(configValue, {
      onSuccess: (data) => {
        setImagePerfilPreview('');
        setImagePortadaPreview('');

        dispatch(userInfo(data));
        
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
                  src={`${ imagePerfilPreview ? imagePerfilPreview : userInfoPerfil.imgUrl ? userInfoPerfil.imgUrl : perfilUsuarioGrande}`}
                  alt={userInfoPerfil.username} />
                <p>
                  <b>Imagen de portada</b>
                </p>
                <img className="circular-portada"
                  src={`${ imagePortadaPreview ? imagePortadaPreview : userInfoPerfil.imgPortadaUrl ? userInfoPerfil.imgPortadaUrl : fondo}`}
                  alt={userInfoPerfil.username} />
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
                  styles={customStyles}
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
