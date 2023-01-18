import React from 'react';

import { 
  messanger,  
  notifications, 
  search,
  user
 } from '../../helpers/ExpoImage';

export const Header = ({
    toggleUser,
    toggleNotificaciones,
    toggleNotificaciones2
}) => {
  return (
    <div className="principal-header">
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
    </div>
  )
}
