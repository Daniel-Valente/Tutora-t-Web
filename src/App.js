import './App.css';
import React, { useState } from "react"
import './front/css/principal.css'
import ChatBot from './components/ChatBot';
import search from './media/search.png';
import imagen1 from './media/Imagen1.png';
import messanger from './media/messanger.png';
import messangerSinFondo from './media/messangerSinFondo.png';
import star from './media/star.png';
import send from './media/send.png';
import user from './media/user.png';
import notifications from './media/notifications.png';
import Post from './front/pages/post';
import Comments from './front/pages/comments';
import { handleBreakpoints } from '@mui/system';
function App() {

  const [activeC, setActiveC] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const toggleComments = () => {
    setActiveC(!activeC);
  }
  const toggle = () => {
    window.location.href = "/perfil"
  }
  function handleMouseEnter(e){
    setIsHovering(true);
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
        <button className='boton-circular'> <img className='icon' src={user} /> </button>
        <button className='boton-circular'> <img className='icon' src={notifications} /> </button>
        <button className='boton-circular'> <img className='icon' src={messanger} /> </button>
        <div className='linea' />
      </header>
      <body className='principal-body'>
        <div className='linea-acostada' />
        <Post>
          <button className='boton-circular-volteado' onClick={toggle}> <img className='icon' src={user} /> </button>
          <h3 className='name'>Mara Alessandra Ruiz Gonzalez</h3>
          <img style={{ width: '50vw', marginTop: '10px' }} src={imagen1} />
          <div className='margins'>
            <img className='star' src={star} />
            <button onClick={toggleComments} className='messangerSinFondo-2'><img className='sinF'  src={messangerSinFondo} /></button>

          </div>
          <div className='linea-acostada' />

          <button className='boton-circular-volteado-2' onClick={toggle}> <img className='icon' src={user} /> </button>
          <p style={{position:'absolute', top:'64.8vh', left:'80px', color:'#858585'}}>1</p>
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
           
            <div className='meGusta'>
              <img className='star' style={{position:'absolute', top:'70vh', left:'0'}} src={star} />
              <p style={{position:'absolute', top:'68.7vh', left:'2vw', color: '#858585'}}>1</p>
              <p style={{position:'absolute', top:'72.5vh', left:'0', color: '#858585'}}>Hace 1 hora</p>
              <input type="text" className='inputCom-2' placeholder='¿Que opinas?...'></input><img className='send-2' src={send} />
            </div>
          </div>
        </Comments>
      </body>
      <ChatBot />
    </div>
  );
}

export default App;