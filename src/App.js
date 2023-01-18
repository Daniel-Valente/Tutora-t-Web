import React, { useState } from "react";
import { handleBreakpoints } from '@mui/system';

import { Header } from "./components/header/Header";
import { Body } from "./components/body/Body";

import User from './pages/user'
import Post from './pages/post';
import Comments from './pages/comments';
import Notificaciones from './pages/notificaciones';
import ModalPublicacion from './pages/modal-publicacion';

import './App.css';
import './css/principal.css';

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

  const toggleComments = () => setActiveC(!activeC);

  const toggleP = () => {
    document.body.style.overflow = 'hidden';
    setActiveP(!activeP);
  }

  const toggle = () => window.location.href = "/perfil";

  const toggleConfig = () => window.location.href = "/configuracion";

  const toggleOut = () => window.location.href = "/principal";

  const handleMouseEnter = (e) => setIsHovering(true);

  if(!activeP) document.body.style.overflow = 'unset';

  return (
    <div style={{backgroundColor: '#000000'}}>
      <header >
        <Header
          toggleUser={ toggleUser }
          toggleNotificaciones={ toggleNotificaciones }
          toggleNotificaciones2={ toggleNotificaciones2 }
        />
      </header>
      <body>
        <Body
          activeC={activeC}
          activeN={activeN}
          activeNN={activeNN}
          activeP={activeP}
          activeU={activeU}
          Comments={Comments}
          handleMouseEnter={handleMouseEnter}
          ModalPublicacion={ModalPublicacion}
          Notificaciones={Notificaciones}
          Post={Post}
          toggle={toggle}
          toggleComments={toggleComments}
          toggleConfig={toggleConfig}
          toggleNotificaciones={toggleNotificaciones}
          toggleNotificaciones2={toggleNotificaciones2}
          toggleOut={toggleOut}
          toggleP={toggleP}
          toggleUser={toggleUser}
          User={User}
        />
      </body>
    </div>
  );
}

export default App;