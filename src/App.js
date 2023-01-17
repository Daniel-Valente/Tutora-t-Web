import './App.css';
import React, { useState } from "react"
import './front/css/principal.css'
import search from './image/search.png';
import Configuracion from './image/configuracion.png';
import salir from './image/salida-de-emergencia.png';
import imagen1 from './image/Imagen1.png';
import messanger from './image/messanger.png';
import messangerSinFondo from './image/messangerSinFondo.png';
import star from './image/star.png';
import send from './image/send.png';
import user from './image/user.png';
import notifications from './image/notifications.png';
import Post from './pages/post';
import Comments from './pages/comments';
import User from './pages/user'
import { handleBreakpoints } from '@mui/system';
import Notificaciones from './pages/notificaciones';
import { useEffect } from 'react';
import ModalPublicacion from './pages/modal-publicacion';
function App() {

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
  const toggleComments = () => {
    setActiveC(!activeC);
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
  function handleMouseEnter(e){
    setIsHovering(true);
  }
  if(activeP===false){
    document.body.style.overflow = 'unset';
  }
  return (
    <div style={{backgroundColor: '#000000'}}>
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
         
          <button className='boton-cuadrado'><img className='icon-2' src={Configuracion} />Configuracion</button>
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
        <div className='wrapper'>
        <div className='windows'>
        <button className='boton-circular-volteado-4' onClick={toggleUser}> <img className='icon' src={user} /> </button>
        <button className='search-input-2' onClick={toggleP} >¿Que tienes en mente?...</button>
        </div>
        </div>
        <ModalPublicacion active={activeP} toggle={toggleP}>
          <h2 style={{textAlign:'center'}}>Crear publicacion</h2>
          <textarea className='inp' placeholder='¿Que tienes en mente Mara?...'></textarea>
        </ModalPublicacion>
        
        
        
    
        <Post active={activeC} toggle={toggleComments}>
          <button className='boton-circular-volteado' onClick={toggle}> <img className='icon' src={user} /> </button>
          <h3 className='name'>COCO</h3>
          <img style={{ width: '50vw', marginTop: '10px' }} src={imagen1} />
          <div className='margins'>
            <img className='star' src={star} />
            <button onClick={toggleComments} className='messangerSinFondo-2'><img className='sinF'  src={messangerSinFondo} /></button>
            <p><a style={{textDecoration:'none'}}>MaraRuiz</a> Aqui va la description #esto #loOtro</p>
          </div>
          <div className='linea-acostada' />

          <button className='boton-circular-volteado-2' onClick={toggle}> <img className='icon' src={user} /> </button>
          <p style={{position:'absolute', top:'67vh', left:'80px', color:'#858585'}}>1</p>
         
          <input type="text" className='inputCom' placeholder='¿Que opinas?...'></input>
          <img className='send' src={send} onMouseEnter={handleMouseEnter} />
        </Post>
        <Post active={activeC} toggle={toggleComments}>
          <button className='boton-circular-volteado' onClick={toggle}> <img className='icon' src={user} /> </button>
          <h3 className='name'>Mara Alessandra Ruiz Gonzalez</h3>
          <img style={{ width: '50vw', marginTop: '10px' }} src={imagen1} />
          <div className='margins'>
            <img className='star' src={star} />
            <button onClick={toggleComments} className='messangerSinFondo-2'><img className='sinF'  src={messangerSinFondo} /></button>
            <p><a style={{textDecoration:'none'}}>MaraRuiz</a> Aqui va la description #esto #loOtro</p>
          </div>
          <div className='linea-acostada' />

          <button className='boton-circular-volteado-2' onClick={toggle}> <img className='icon' src={user} /> </button>
          <p style={{position:'absolute', top:'67vh', left:'80px', color:'#858585'}}>1</p>
          <input type="text" className='inputCom' placeholder='¿Que opinas?...'></input>
          <img className='send' src={send} onMouseEnter={handleMouseEnter} />
        </Post>
        <Comments active={activeC} toggle={toggleComments}>
        <div className='linea-acostada-2' />
        <div className='linea-acostada-3' />
          <div>
            <img style={{ width: '43vw', height: '91.6vh' }} src={imagen1} />
          </div>
          <div className='panelDerecho'>
          <button className='boton-circular-volteado-3' onClick={toggle}> <img className='icon' src={user} /> </button>
            <h3 className='titulo'>Mara Alessandra Ruiz Gonzalez</h3>
            <p><a style={{textDecoration:'none'}}>MaraRuiz</a> Aqui va la description #esto #loOtro</p>
            <p>Aqui van comentarios</p>
            <div className='meGusta'>
              <img className='star' style={{position:'absolute', top:'70vh', left:'0'}} src={star} />
              <p style={{position:'absolute', top:'68.7vh', left:'2vw', color: '#858585'}}>1</p>
              <p style={{position:'absolute', top:'72.5vh', left:'0', color: '#858585'}}>Hace 1 hora</p>
              <input type="text" className='inputCom-2' placeholder='¿Que opinas?...'></input><img className='send-2' src={send} />
            </div>
          </div>
        </Comments>
      </body>
    </div>
  );
}

export default App;