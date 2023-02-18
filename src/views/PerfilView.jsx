import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Post from '../components/Post/Post';
import { useCareerById, usePostsByUser } from '../hooks';
import { useUserById } from '../hooks/users/userUserById';
import { fondo, user } from '../images';

const PerfilView = () => {

  const { uid_user } = useParams();
  const userInfoPerfil = useSelector(state => state.user);

  const { value: commentModal } = useSelector(state => state.commentModal);

  const { data: dataUserPerfil = [], isLoading: lodingUserPerfil } = useUserById(uid_user);
  const [userPerfil, setUserPerfil] = useState(dataUserPerfil);

  const { data: dataCareer, isFetching: fetchingCareer, isLoading: loadingCareer  } = useCareerById(userInfoPerfil.career);
  const [userCareer, setUserCareer] = useState(dataCareer);

  const { data: dataPostsList = [], isFetching: fetchingPostsList, isLoading: loadingPosts } = usePostsByUser(uid_user);
  const [posts, setPosts] = useState(dataPostsList);

  useEffect(() => {
    setUserPerfil(dataUserPerfil);
  }, [dataUserPerfil]);

  useEffect(() => {
    !fetchingCareer && dataCareer && setUserCareer(dataCareer);
  }, [dataCareer]);

  useEffect(() => {
    dataPostsList && setPosts(dataPostsList);
  }, [dataPostsList]);

  if (lodingUserPerfil || loadingPosts || loadingCareer) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className='principal-body'>
      <div className='row'>
        <img className="fondo"
          src={userPerfil.imgPortadaUrl ? userPerfil.imgPortadaUrl : fondo}
          alt={'user-portada'} />
        <img className='boton-circular-perfil icon-perfil'
          src={userPerfil.imgUrl ? userPerfil.imgUrl : user}
          alt={'user-perfil'} />
        <label style={{ textAlign: 'left', marginTop: '5%', fontWeight: 'bold', marginLeft: '27%', fontSize: '300%', fontFamily: 'Segoe UI Emoji' }}>
          {userPerfil.name}
        </label>
        <br />
        <label style={{ textAlign: 'left', marginLeft: '27%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
          <b>Nombre de usuario: </b>{userPerfil.username}
        </label>
        <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
          <b>Carrera: </b>{ userCareer ? userCareer.name : loadingCareer && 'loading...' }
        </label>
      </div>
      <div className='row'>
        <div className='col-2'>
          <br />
          <br />
          {
            userInfoPerfil.uid_user === userPerfil.uid_user
              ? <div>hola</div>
              : <div>
                  <button className='button-follow'>
                    Seguir
                  </button>
                  <button className='button-message'>
                    Enviar mensaje
                  </button>
                </div>
          }
        </div>
        <div className='col-7'>
          <br />
          {
            posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id}/>)
          }
        </div>
        <div className='col-2'>
          <br />
          <br />
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>Cursos creados</b>
          </label>
        </div>
      </div>
    </div>
  )
}

export default PerfilView;