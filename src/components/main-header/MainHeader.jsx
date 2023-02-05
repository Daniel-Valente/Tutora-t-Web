import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MainHeader = () => {
  return (
    <div className='header'>
      <a className='logo-link'>tutorate</a>

      <button className='button-without-background' onClick={() =>  console.log('hola')}>Iniciar sesion</button>
      <button className='button-shape' onClick={() => console.log('hola')}>Registrate</button>
      <div className='linea' />
    </div>
  )
}

export default MainHeader;