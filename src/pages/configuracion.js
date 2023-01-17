import React, { useState } from "react"
import '../css/principal.css'
import search from '../../image/search.png';
import Configuracion2 from '../../image/configuracion.png';
import salir from '../../image/salida-de-emergencia.png';
import messanger from '../../image/messanger.png';
import user from '../../image/user.png';
import notifications from '../../image/notifications.png';
import User from './user';
import Notificaciones from './notificaciones';
import ModalPublicacion from './modal-publicacion';
function Configuracion() {
  console.log("aqui ando")
  const [activeC, setActiveC] = useState(false);
  const [activen, setActiven] = useState(false);
  const [activeP, setActiveP] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [activeN, setActiveNotificaciones] = useState(false);
  const [activeNN, setActiveNotificaciones2] = useState(false);
  const [activeU, setActiveUser] = useState(false);

  const toggleNotificaciones = () => {
    setActiveNotificaciones2(false);
    setActiveUser(false);
    setActiveNotificaciones(!activeN);
    setActiven(true);
  }
  const toggleUser = () => {
    setActiveNotificaciones(false);
    setActiveNotificaciones2(false);
    setActiveUser(!activeU);
  }
  const toggleNotificaciones2 = () => {
    setActiveUser(false);
    setActiveNotificaciones(false);
    setActiveNotificaciones2(!activeNN);
  }
  const toggleP = () => {
    document.body.style.overflow = 'hidden';
    setActiveP(!activeP);
  }
  const toggle = () => {
    window.location.href = "/perfil"
  }
  const toggleOut = () => {
    window.location.href = "/principal"
  }

  if(activeP===false){
    document.body.style.overflow = 'unset';
  }
  return (
    <div style={{}}>
      <header className="principal-header">
        <a className='logo-link' href='/'>tutorate</a>
        <div className='search'>
          <input className='search-input' placeholder='Buscar...' type="text"></input>
          <button className='search-icon'>
            <img className='search-imag' src={search} />
          </button>
        </div>
        <button className='boton-circular' onClick={toggleUser}> <img className='icon' src={user} /> </button>
        <button className='boton-circular' onClick={toggleNotificaciones}> <img className='icon' src={notifications} /> </button>
        <button className='boton-circular' onClick={toggleNotificaciones2}> <img className='icon' src={messanger} /> </button>
        <div className='linea' />
      </header>
      <body className='principal-body'>
        <User  active={activeU} toggle={toggleUser}>
          <h4 style={{textAlign:'center', padding:'2rem'}}>Mara Alessandra Ruiz Gonzalez</h4>
         
          <button className='boton-cuadrado'><img className='icon-2' src={Configuracion2} />Configuracion</button>
          <button className='boton-cuadrado' onClick={toggleOut}><img className='icon-2' src={salir} />Salir</button>
          <br/>
          <br/>
        </User>
        <Notificaciones active={activeN} toggle={toggleNotificaciones}>
          <h2 style={{textAlign: 'center', paddingTop:'2rem'}}>Notificaciones</h2>
          <p className='p-1'>Futuras notificaciones loren ipsun
          Futuras notificaciones loren ipsun.
          </p>
       
        </Notificaciones>
        <Notificaciones active={activeNN} toggle={toggleNotificaciones2}>
          <h2 style={{textAlign: 'center', paddingTop:'2rem'}}>Mensajes</h2>
          <div style={{float:'left'}}>
          <button className='boton-circular-volteado-5' onClick={toggleUser}> <img className='icon' src={user} /> </button>
          </div>
          <div style={{float:'left', width:'70%'}}>
          <p style={{marginLeft:'10%'}}>
          <label style={{fontSize:'20px'}}>Henry Cavil</label>
          <br/>
            este es un borrador
          </p>
          </div>
          
        </Notificaciones>
        <div className='linea-acostada' />
        <h1 style={{ marginLeft:'35%'}}>Configuracion de la cuenta</h1>
        <div style={{float:'left',marginLeft:'30%'}}>
          <p>Nombre</p>
          <p>Apellido</p>
        </div>
        <div style={{float:'left', marginLeft:'10%'}}>
          <p><input type="text" valor='Mara Alessandra'></input> </p>
          <p>Ruiz Gonzalez</p>
        </div>
    
      </body>
    </div>
  );
}

export default Configuracion;