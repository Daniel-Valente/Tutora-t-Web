import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import MessageModal from '../modals/MessageModal';
import NotificationModal from '../modals/NotificationModal';
import UserModal from '../modals/UserModal';

import { exit, mensaje, messagesBlack, notifications, search, settings, user } from '../../images';
import { isChatModal, isNotificationModal, isOut, isSearchModal, isUserModal } from '../../helpers/utils';
import { useChatsListWithLimit, useNotificationsWithLimit, useUsersList } from '../../hooks';
import { userInfo } from '../../reducers';
import CardMessage from '../card-message/CardMessage';
import CardNotification from '../card-notification/CardNotification';
import Scrollbars from 'react-custom-scrollbars-2';
import { SearchModal } from '../modals/SearchModal';
import CardUsers from '../card-users/CardUsers';

const HomeHeader = () => {
  const userInfoPerfil = useSelector(state => state.user);

  const { value: userModal } = useSelector(state => state.userModal);
  const { value: chatModal } = useSelector(state => state.chatModal);
  const { value: searchModal } = useSelector(state => state.searchModal);
  const { value: notificationModal } = useSelector(state => state.notificationModal);

  const [ searchText, setSearchText ] = useState('');

  const { data: dataChatsWithLimit = [], isFetching: fetchingChats } = useChatsListWithLimit(userInfoPerfil.uid_user, 5);
  const [chatsWithLimit, setChatsWithLimit] = useState(dataChatsWithLimit);

  const { data: dataNotificationsWithLimit = [], isFetching: fetchingNotifications } = useNotificationsWithLimit(userInfoPerfil.uid_user, 10);
  const [notificationsWithLimit, setNotificationsWithLimit] = useState(dataNotificationsWithLimit);

  // const { data: dataUsers, isFetching: fetchingUsers } = useUsersList();
  // const [users, setUsers] = useState(dataUsers);

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
      verify: false
    }));

    isOut(dispatch);
  }

  const changeHandle = (e) => setSearchText( e.target.value );

  useEffect(() => {
    !fetchingChats && dataChatsWithLimit && setChatsWithLimit(dataChatsWithLimit);
    // eslint-disable-next-line
  }, [dataChatsWithLimit]);

  useEffect(() => {
    !fetchingNotifications && dataNotificationsWithLimit && setNotificationsWithLimit(dataNotificationsWithLimit);
    // eslint-disable-next-line
  }, [dataNotificationsWithLimit]);

  // useEffect(() => {
  //   !fetchingUsers && dataUsers && setUsers(dataUsers);
  //   console.log(users);
  //   // eslint-disable-next-line
  // }, [dataUsers]);

  return (
    <div className="principal-header header">
      <Link className='logo-link' to='/home'>tutorate</Link>
      <div className='search'>
        <input className='search-input' placeholder='Buscar...' type="text" 
          onFocus={() => isSearchModal(dispatch, searchModal)}
          onChange={ changeHandle }
          value={ searchText }
        />
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
        
          <div className='icon-name'>
          <Link  to={`/perfil/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
          <img className='icon-user-2'
                  src={userInfoPerfil.imgName ? userInfoPerfil.imgUrl : user}
                  alt={userInfoPerfil.username} />
            <h4  style={{ position:'relative', top:'-20px', textAlign: 'center', paddingLeft: '4.5rem', paddingRight: '2rem', fontSize: '19px', fontFamily:'sans-serif', color: '#6b6b6b' }}>
              {userInfoPerfil.name}
            </h4>
          </Link>
          </div>
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
        <h2 style={{ textAlign: 'center', paddingTop: '1rem', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>Notificaciones</h2>
        <Scrollbars autoHeight autoHeightMax={381} style={{ width: '99%' }}>
          {
            notificationsWithLimit.map((notification, index) => <CardNotification notification={notification} key={index} notificationModal={notificationModal} />)
          }
        </Scrollbars>
      </NotificationModal>

      <MessageModal active={chatModal} toggle={isChatModal} dispatch={dispatch}>
        <h2 style={{ textAlign: 'center', paddingTop: '1rem', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>Mensajes</h2>
        {chatsWithLimit.map((chat, index) => <CardMessage chat={chat} key={chat.id_Message} />)}
        <div className='row'>
          <Link to={`/chats/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
          
          <button className='boton-cuadrado' style={{ fontSize: '19px',fontFamily:'sans-serif', color: '#6B6B6B' }}> <img style={{marginRight:'20px', top:'5px', position:'relative'}} src={mensaje}></img>Ver más</button>
          </Link>
        </div>
        <br />
      </MessageModal>

      <SearchModal active={searchModal} toggle={isSearchModal} dispatch={dispatch}>
        <div style={{borderRadius:'10px'}}>
          <Scrollbars autoHeight autoHeightMax={381} >
            <div/>
            <div style={{backgroundColor:'pink'}}>
              {
                // !!users && users.map((user) => user.uid_user !== userInfoPerfil.uid_user &&  <CardUsers user={user} key={user.uid_user} searchText={searchText} action={setSearchText} />)
              }
            </div>
          </Scrollbars>
        </div>
      </SearchModal>
    </div>
  )
}

export default HomeHeader;