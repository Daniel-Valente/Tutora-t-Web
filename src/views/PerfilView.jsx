import React, { useEffect, useReducer, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useUserById } from '../hooks/users/userUserById';
import { fondo, user } from '../images';

const PerfilView = () => {

  const { uid_user } = useParams();
  const userInfo = useSelector(state => state.user);

  const { data: dataUserPerfil = [], isLoading: lodingUserPerfil, isFetching: fetchingUserPerfil } = useUserById( uid_user);
  const [ userPerfil, setUserPerfil ] = useState(dataUserPerfil);

  useEffect(() => {
    setUserPerfil(dataUserPerfil);
  }, [dataUserPerfil]);

  if(lodingUserPerfil) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className='principal-body'>
        <img className="fondo"
          src={ userPerfil.imgPortadaUrl ? userPerfil.imgPortadaUrl : fondo} 
            alt={'user-portada'}/>
        <img className='boton-circular-perfil icon-perfil'
          src={userPerfil.imgUrl ? userPerfil.imgUrl : user} 
            alt={'user-perfil'}/>
        <label style={{textAlign:'left', marginTop:'5%', marginLeft:'27%', fontSize:'300%', fontFamily:'Segoe UI Emoji'}}>
            {userPerfil.name}
        </label>
    </div>
  )
}

export default PerfilView;