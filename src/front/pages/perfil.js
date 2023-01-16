import React, { useState } from "react"
import '../css/perfil.css'
import user from '../../media/user.png';
import notifications from '../../media/notifications.png';
import search from '../../media/search.png';
import messanger from '../../media/messanger.png';
import fondo from '../../media/fondo-3.jpg';


function Perfil() {
  return (
    <div>
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
        <img className="fondo" src={fondo} />
        <button className='boton-circular-perfil'> <img className='icon-perfil' src={user} /> </button>
        <label style={{textAlign:'left', marginTop:'5%', marginLeft:'27%', fontSize:'300%', fontFamily:'Segoe UI Emoji'}}>Mara Alessandra Ruiz Gonzalez</label>
      </body>

    </div>
  );
}

export default Perfil;