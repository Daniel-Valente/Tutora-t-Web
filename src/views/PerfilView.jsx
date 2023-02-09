import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useUserById } from '../hooks/users/userUserById';
import { fondo, user } from '../images';

const PerfilView = () => {
  const { uid_user } = useParams();
  const userInfo = useSelector(state => state.user);

  const [ userValidation, setUserValidation ] = useState( uid_user === userInfo.uid_user ? true : false );
  const { data: dataUserPerfil = [], isFetching: fetchingUserPerfil } = useUserById( !userValidation && uid_user);
  const [ userPerfil, setUserPerfil ] = useState(dataUserPerfil);

  useEffect(() => {
    !fetchingUserPerfil && userPerfil.length > 0 && setUserPerfil(dataUserPerfil);
  }, [dataUserPerfil]);

  return (
    <div className='principal-body'>
        <img className="fondo"
          src={`${ userValidation
            ? ( userInfo.imgPortadaUrl ? userInfo.imgPortadaUrl : fondo )
            : ( userPerfil.imgPortadaUrl ? userPerfil.imgPortadaUrl : fondo )}`} 
            alt={'user-portada'}/>
        <img className='boton-circular-perfil icon-perfil'
          src={`${ userValidation
            ? ( userInfo.imgUrl ? userInfo.imgUrl : user )
            : ( userPerfil.imgUrl ? userPerfil.imgUrl : user )}`} 
            alt={'user-perfil'}/>
        <label style={{textAlign:'left', marginTop:'5%', marginLeft:'27%', fontSize:'300%', fontFamily:'Segoe UI Emoji'}}>
            {`${ userValidation ? userInfo.name : userPerfil.name }`}
        </label>
    </div>
  )
}

export default PerfilView;