import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MessageModal from '../modals/MessageModal';
import NotificationModal from '../modals/NotificationModal';
import UserModal from '../modals/UserModal';

import { exit, messangesBlack, notifications, settings, user } from '../../images';

const HomeHeader = () => {
  const [ chatWithLimit, setChatWithLimit ] = useState();
  const [first, setfirst] = useState([0,1,2,3,4]);
  
  



  return (
    <div className="principal-header header">
      <a className='logo-link' href='/home'>tutorate</a>
      <div className='search'>
        <input className='search-input' placeholder='Buscar...' type="text"></input>
        <button className='search-icon'>
          <img className='search-imag' src={search} />
        </button>
      </div>

      <button className='boton-circular' 
        onClick={() => console.log('hola')}> 
        <img className='icon' src={user} />
      </button>
      <button className='boton-circular' 
        onClick={() => console.log('hola')}>
          <img className='icon' src={notifications} />
      </button>
      <button className='boton-circular' 
        onClick={() => console.log('hola')}> 
        <img className='icon' src={messangesBlack} />
      </button>
      <div className='linea' />
    
      <UserModal  active={} toggle={} dispatch={dispatch}>
        <div className='row'>
          <Link to={`/perfil/${}`}  style={{ textDecoration: 'none' }}>
            <h4 style={{textAlign:'center', padding:'2rem'}}>
              { userInfo.name }
            </h4>
          </Link>
        </div>
        <div className='row'>
          <Link  to={`/configuracion/${}`}  style={{ textDecoration: 'none' }}>
            <button className='boton-cuadrado'>
              <img className='icon-2' src={ settings }/>Configuracion
            </button>  
          </Link>
        </div>
        <div className='row'>
          <button className='boton-cuadrado' onClick={ () => console.log('hola') } >
            <img className='icon-2' src={ exit } />Salir
          </button>
        </div>
        <br/>
      </UserModal>

      <NotificationModal active={} toggle={} dispatch={dispatch}>
        <h2 style={{textAlign: 'center', paddingTop:'2rem'}}>Notificaciones</h2>
        {
          first.map((element, index) => {
            return (
              <div className='row' key={`${element}-${index}-m`}>
                <p className='p-1'>
                  Futuras notificaciones loren ipsun
                  Futuras notificaciones loren ipsun.
                </p>
              </div>
            )
          })
        }
        <div className='row'>  
          <Link  to={`/configuracion/${}`}  style={{ textDecoration: 'none'}}>
            <button className='boton-cuadrado' style={{ fontSize:'17px', textAlign: 'center' }}>Ver más</button>  
          </Link>
        </div> 
        <br />
      </NotificationModal>

      <MessageModal active={} toggle={} dispatch={dispatch}>
        <h2 style={{textAlign: 'center', paddingTop:'2rem'}}>Mensajes</h2>
        {
          chatWithLimit.map((element, index) => {
            return (
              <div className='row' key={`${index}-${element}-n`}>
                <div className='col-3'>
                  <Link to=''>
                    <div className='boton-circular-volteado-5'>
                      <img className='icon-user-message' src={ user } />
                    </div>
                  </Link>
                </div>
                <div className='col-9'>
                  <p style={{marginLeft:'10%', marginTop: '25px'}}>
                    <label style={{fontSize:'20px'}}> <b>Henry Cavil</b> </label>
                    <br/>
                    este es un borrador
                  </p>
                </div>
              </div>
            )
          })
        }
        <div className='row'>  
          <Link  to={`/chats`}  style={{ textDecoration: 'none'}}>
            <button className='boton-cuadrado' style={{ fontSize:'17px', textAlign: 'center' }}>Ver más</button>  
          </Link>
        </div>
        <br/>
      </MessageModal>
    </div>
  )
}

export default HomeHeader;