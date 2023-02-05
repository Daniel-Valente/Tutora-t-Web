import React from 'react';
import { fondo, user } from '../images';

const PerfilView = () => {
  return (
    <div className='principal-body'>
        <img className="fondo" src={ fondo } />
        <img className='boton-circular-perfil icon-perfil' src={ user }/>
        <label style={{textAlign:'left', marginTop:'5%', marginLeft:'27%', fontSize:'300%', fontFamily:'Segoe UI Emoji'}}>
            {  }
        </label>
    </div>
  )
}

export default PerfilView;