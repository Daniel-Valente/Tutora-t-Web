import React, { useState } from "react";
import { fondo } from "../images";

const SettingsView = () => {
  const [value, setValue] = useState("");

  const onChange = (e) => {};

  return (
    <div>
      <div className="linea-acostada" />
      <h1 style={{ marginLeft: "35%" }}>Configuracion de la cuenta</h1>

      <div style={{ float: "left", marginLeft: "30%" }}>
        <p>
          <b>Imagen de perfil</b>
        </p>
        <img className="icon-perfil-setting" src={fondo} />
        <p>
          <b>Imagen de portada</b>
        </p>
        <img className="circular-portada" src={fondo} />
        <br />
        <br />
        <p>
          <b>Nombre completo</b>
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
          <input type="text" readOnly value={value} />
          <input className="upload-file-buton" type="file" accept="image/*" />
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
          <input type="text" readOnly value={value} />
          <input className="upload-file-buton" type="file" accept="image/*" />
        </div>

        <br />

        <div style={{ marginTop: "12%" }}>
          <input
            type="text"
            placeholder="Nombre completo"
            name="nombre"
            pattern="^[A-Za-z]"
          />
        </div>
        <div style={{ marginTop: "2%" }}>
          <input
            type="text"
            placeholder="Teléfono"
            name="telefono"
            pattern="^[0-9]{10}$"
          />
        </div>
        <div style={{ marginTop: "2%" }}>
          <input
            type="text"
            placeholder="Nueva contraseña"
            name="password"
            pattern="^[a-zA-Z0-9!@#$%^&*]{8,20}$"
          />
        </div>

        <br />
        <button style={{ marginTop: "3%" }}>Guardar</button>
      </div>
    </div>
  );
};

export default SettingsView;
