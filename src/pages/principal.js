import '../css/principal.css'
import CUCEI from '../image/CUCEI.png'
import Modal from './modal'
import googleIcon from '../image/googleIcon.png'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React, { useState } from "react"
import Select from 'react-select';
import ModalRegistro from './modal-registro';
import ModalInicioSesion from './modal-inicioSesion';

import { endPointApi } from '../Api/endPointApi';
import { useEffect } from 'react';
function Principal() {
    const [password, setPassword] = useState(false);
    const [active, setActive] = useState(false);
    const [activeR, setActiveR] = useState(false);
    const [activeS, setActiveS] = useState(false);
    const [activeRC, setActiveRC] = useState(false);
    const [options, setOptions] = useState([]);
    
    const toggle = () => {
        setActive(!active);
    }

    const toggleRegister = () => {
        setActiveR(!activeR);
    }

    const toggleIniciarSesion = () => {
        setActive(false);
        setActiveS(!activeS);
    }
    const toggleRegistrarteCorreo = () => {
        setActiveR(false);
        setActiveRC(!activeRC);
    }
    
    const setCareers = async() => {
        const { data } = await endPointApi.get(`/json/careers`);

        data.map( (data) => {
            const { id, name } = data;
            setOptions((options) => [...options, { value: id, label: name }]);
        } );
    }

    useEffect(() => {
        setCareers();
    }, [])
    

    return (
        <div>
            <header>
                <a className='logo-link'>tutorate</a>

                <button className='button-without-background' onClick={toggle}>Iniciar sesion</button>
                <button className='button-shape' onClick={toggleRegister}>Registrate</button>
                <div className='linea' />
            </header>
            <body>
                <div className='linea-acostada'/>
                <div>
                    <img className='image-cucei' src={CUCEI} />

                    <button className='button-HOY' onClick={toggle}>Comienza HOY!</button>
                </div>
                <Modal active={active} toggle={toggle}>
                    <h1 style={{ textAlign:'center'}}>Bienvenido de vuelta!</h1>
                    <h5 style={{ textAlign:'center', color: '#828181' }}>Inicia sesion con tu correo electrónico o con Google.</h5>
                    <button className='boton-google'>Ingresar con Google</button>
                    <img src={googleIcon} className="google-icon"></img>
                    <br />
                    <button className='boton-correo' onClick={toggleIniciarSesion}>Ingresa con correo electronico</button>
                    <br />
                    <p className='aviso-privacidad'>Al continuar, tu estas aceptas los términos y condiciones<br/>
                        y el aviso de privacidad.</p>
                </Modal>
                <Modal active={activeR} toggle={toggleRegister}>
                    <h1 style={{ textAlign:'center'}}>Registrate</h1>
                    <h5 style={{ textAlign:'center', color: '#828181' }}>Crea una cuenta con tu correo electrónico o con Google.</h5>
                    <button className='boton-google'>Registrate con Google</button>
                    <img src={googleIcon} className="google-icon"></img>
                    <br />
                    <button className='boton-correo' onClick={toggleRegistrarteCorreo}>Registrate con correo electronico</button>
                    <br />
                    <p className='aviso-privacidad'>Al continuar, tu estas aceptas los términos y condiciones<br/>
                        y el aviso de privacidad.</p>
                </Modal>
                <ModalInicioSesion active={activeS} toggle={toggleIniciarSesion}>
                    <h1 style={{ textAlign:'center'}}>Iniciar Sesion</h1>
                    <h5 style={{ textAlign:'center', color: '#828181' }}>Inicia sesion con tu correo electronico aqui.</h5>
                    <input type="email" placeholder='Correo electronico'></input>
                    <br/>
                    <input type={password ? "text" : "password"} placeholder='Contraseña'></input>
                    <button className='eye-icon' onClick={()=> password ? setPassword(false): setPassword(true)}>
                        {password ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </button>
                    <br/>
                    <button className='boton-correo'>Ingresa con correo electronico</button>
                    <br/>
                    <p className='aviso-privacidad'>Al continuar, tu estas aceptas los términos y condiciones<br/>
                        y el aviso de privacidad.</p>
                        <div className='linea-acostada'/>
                    <button className='boton-sin-fondo'>¿Olvidaste tu contraseña? </button>
                </ModalInicioSesion> 
                <ModalRegistro active={activeRC} toggle={toggleRegistrarteCorreo}>
                    <h1 style={{ textAlign:'center'}}>Registrate</h1>
                    <h5 style={{ textAlign:'center', color: '#828181' }}>Crea una cuenta con tu correo electronico.</h5>
                    <input type="text" placeholder='Nombre completo'></input>
                    <br/>
                    <input type="email" placeholder='Correo electronico'></input>
                    <br/>
                    <input type={password ? "text" : "password"} placeholder='Contraseña'></input>
                    <Select options={options} className="input-type" />
                    <button className='eye-icon-2' onClick={()=> password ? setPassword(false): setPassword(true)}>
                        {password ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                    </button>
                    <br/>
                    <button className='boton-crea'>Crea tu cuenta</button>
                    <p className='aviso-privacidad'>Al continuar, tu estas aceptas los términos y condiciones<br/>
                        y el aviso de privacidad.</p>
                </ModalRegistro>

            </body>
        </div>
    );
}

export default Principal;