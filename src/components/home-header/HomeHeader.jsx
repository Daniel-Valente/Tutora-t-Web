import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MessageModal from '../modals/MessageModal';
import NotificationModal from '../modals/NotificationModal';
import UserModal from '../modals/UserModal';

import { exit, messagesBlack, notifications, search, settings, user } from '../../images';
import { isChatModal, isNotificationModal, isOut, isUserModal } from '../../helpers/utils';
import { useChatsListWithLimit, useLogOut } from '../../hooks';
import Message from '../message/Message';
import { userInfo, userLogInState } from '../../reducers';

const HomeHeader = () => {
  const userInfoPerfil = useSelector(state => state.user);
  const { mutate: logOut } = useLogOut();

  const { data: dataChatsWithLimit = [], isFetching: fetchingChats } = useChatsListWithLimit(userInfoPerfil.uid_user, 5);
  const [chatsWithLimit, setChatsWithLimit] = useState(dataChatsWithLimit);

  const [first, setfirst] = useState([0, 1, 2, 3, 4]);

  const { value: userModal } = useSelector(state => state.userModal);
  const { value: chatModal } = useSelector(state => state.chatModal);
  const { value: notificationModal } = useSelector(state => state.notificationModal);

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(userInfo({
      uid_user: '',
      name: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      career: '',
      imagePortadaName: '',
      imagePortadaUrl: '',
      imgName: '',
      imgUrl: '',
    }));

    logOut();

    dispatch(userLogInState({
      apiKey: "",
      appName: "",
      createdAt: "",
      displayName: "",
      email: "",
      emailVerified: false,
      isAnonymous: false,
      lastLoginAt: "",
      phoneNumber: "",
      providerData: {},
      stsTokenManager: {},
      uid: ""
    }));

    isOut(dispatch);
  }

  useEffect(() => {
    !fetchingChats && dataChatsWithLimit && setChatsWithLimit(dataChatsWithLimit);
  }, [dataChatsWithLimit]);

  return (
    <div className="principal-header header">
      <Link className='logo-link' to='/home'>tutorate</Link>
      <div className='search'>
        <input className='search-input' placeholder='Buscar...' type="text"></input>
        <button className='search-icon'>
          <img className='search-imag' src={search} alt="search" />
        </button>
      </div>

      <button className='boton-circular'
        onClick={() => isUserModal(dispatch, userModal)}>
        <img className='icon' src={user} alt="user" />
      </button>
      <button className='boton-circular'
        onClick={() => isNotificationModal(dispatch, notificationModal)}>
        <img className='icon' src={notifications} alt="notifications" />
      </button>
      <button className='boton-circular'
        onClick={() => isChatModal(dispatch, chatModal)}>
        <img className='icon' src={messagesBlack} alt="messagesBlack" />
      </button>
      <div className='linea' />

      <UserModal active={userModal} toggle={isUserModal} dispatch={dispatch}>
        <div className='row'>
          <Link to={`/perfil/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
            <h4 style={{ textAlign: 'center', padding: '2rem' }}>
              {userInfoPerfil.name}
            </h4>
          </Link>
        </div>
        <div className='row'>
          <Link to={`/configuracion/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
            <button className='boton-cuadrado'>
              <img className='icon-2' src={settings} alt="settings" />Configuracion
            </button>
          </Link>
        </div>
        <div className='row'>
          <button className='boton-cuadrado' onClick={handleSubmit} >
            <img className='icon-2' src={exit} alt="exit" />Salir
          </button>
        </div>
        <br />
      </UserModal>

      <NotificationModal active={notificationModal} toggle={isNotificationModal} dispatch={dispatch}>
        <h2 style={{ textAlign: 'center', paddingTop: '2rem' }}>Notificaciones</h2>
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
          <Link to={`/configuracion/`} style={{ textDecoration: 'none' }}>
            <button className='boton-cuadrado' style={{ fontSize: '17px', textAlign: 'center' }}>Ver más</button>
          </Link>
        </div>
        <br />
      </NotificationModal>

      <MessageModal active={chatModal} toggle={isChatModal} dispatch={dispatch}>
        <h2 style={{ textAlign: 'center', paddingTop: '2rem' }}>Mensajes</h2>
        { chatsWithLimit.map((chat, index) => <Message chat={chat} key={chat.id_Message} />) }
        <div className='row'>
          <Link to={`/chats/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
            <button className='boton-cuadrado' style={{ fontSize: '17px', textAlign: 'center' }}>Ver más</button>
          </Link>
        </div>
        <br />
      </MessageModal>
    </div>
  )
}

export default HomeHeader;