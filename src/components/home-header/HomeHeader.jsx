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
import { useTheme } from 'styled-components';

const HomeHeader = () => {
  const theme = useTheme();
  const [isHoverT, setIsHoverT] = useState(false);

   const handleMouseEnterT = () => {
      setIsHoverT(true);
   };
   const handleMouseLeaveT = () => {
      setIsHoverT(false);
   };

   const boxStyleT = {
    color: isHoverT ? theme.linkHover : theme.linkColor,
    textDecoration: 'none',
     transition: 'all 0.10s ease',
   };
  const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };

   const boxStyle = {
     backgroundColor: isHover ? theme.commentsHover : theme.comments,
     transition: 'all 0.10s ease',
   };
   const [isHoverB1, setIsHoverB1] = useState(false);

   const handleMouseEnterB1 = () => {
      setIsHoverB1(true);
   };
   const handleMouseLeaveB1 = () => {
      setIsHoverB1(false);
   };

   const boxStyleB1 = {
     backgroundColor: isHoverB1 ? theme.botonCircularHover : theme.botonCircular,
     transition: 'all 0.10s ease',
   };
   const [isHoverB2, setIsHoverB2] = useState(false);

   const handleMouseEnterB2 = () => {
      setIsHoverB2(true);
   };
   const handleMouseLeaveB2 = () => {
      setIsHoverB2(false);
   };

   const boxStyleB2 = {
     backgroundColor: isHoverB2 ? theme.botonCircularHover : theme.botonCircular,
     transition: 'all 0.10s ease',
   };
   const [isHoverB3, setIsHoverB3] = useState(false);

   const handleMouseEnterB3 = () => {
      setIsHoverB3(true);
   };
   const handleMouseLeaveB3 = () => {
      setIsHoverB3(false);
   };

   const boxStyleB3 = {
     backgroundColor: isHoverB3 ? theme.botonCircularHover : theme.botonCircular,
     transition: 'all 0.10s ease',
   };
   const [isHoverB4, setIsHoverB4] = useState(false);

   const handleMouseEnterB4 = () => {
      setIsHoverB4(true);
   };
   const handleMouseLeaveB4 = () => {
      setIsHoverB4(false);
   };
   const boxStyleB4 = {
    filter: isHoverB4 ? theme.hover  : '',
    backgroundColor: isHoverB4 ? '#e2e2e2' : theme.header,
    color:theme.status === 'dark' ||    isHoverB4 ? '#000000' : theme.userName,
    transition: 'all 0.10s ease',
   };
   const boxStyleE = {
    filter:theme.status === 'dark' ||    isHoverB4 ? 'invert(0)' : theme.eye,
    transition: 'all 0.10s ease',
   };
   const [isHoverB5, setIsHoverB5] = useState(false);

   const handleMouseEnterB5 = () => {
      setIsHoverB5(true);
   };
   const handleMouseLeaveB5 = () => {
      setIsHoverB5(false);
   };
   const boxStyleB5 = {
    filter: isHoverB5 ? theme.hover  : '',
    backgroundColor: isHoverB5 ? '#e2e2e2' : theme.header,
    color:theme.status === 'dark' ||    isHoverB5 ? '#000000' : theme.userName,
    transition: 'all 0.10s ease',
   };
   const boxStyleE2 = {
    filter:theme.status === 'dark' ||    isHoverB5 ? 'invert(0)' : theme.eye,
    transition: 'all 0.10s ease',
   };
   const [isHoverB6, setIsHoverB6] = useState(false);

   const handleMouseEnterB6 = () => {
      setIsHoverB6(true);
   };
   const handleMouseLeaveB6 = () => {
      setIsHoverB6(false);
   };
   const boxStyleB6 = {
    filter: isHoverB5 ? theme.hover  : '',
    backgroundColor: isHoverB6 ? '#e2e2e2' : theme.header,
    color:theme.status === 'dark' ||    isHoverB6 ? '#000000' : theme.userName,
    transition: 'all 0.10s ease',
    fontSize: '14px',
   };
   const boxStyleE3 = {
    filter:theme.status === 'dark' ||    isHoverB6 ? 'invert(0)' : theme.eye,
    transition: 'all 0.10s ease',
    marginRight:'20px', top:'5px', position:'relative'
   };
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

  const { data: dataUsers, isFetching: fetchingUsers } = useUsersList();
  const [users, setUsers] = useState(dataUsers);

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

  useEffect(() => {
    !fetchingUsers && dataUsers && setUsers(dataUsers);
    console.log(users);
    // eslint-disable-next-line
  }, [dataUsers]);

  return (
    <div style={{backgroundColor:theme.header}} className="principal-header header">
      <Link style={boxStyleT}  onMouseEnter={handleMouseEnterT}
            onMouseLeave={handleMouseLeaveT} className='logo-link' to='/home'>tutorate</Link>
      <div style={boxStyle}  onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} className='search'>
        <input style={{color:theme.userName}}  className='search-input' placeholder='Buscar...' type="text" 
          onFocus={() => isSearchModal(dispatch, searchModal)}
          onChange={ changeHandle }
          value={ searchText }
        />
        <button className='search-icon'>
          <img style={{filter:theme.eye}} className='search-imag' src={search} alt="search" />
        </button>
      </div>

      <button style={boxStyleB1}  onMouseEnter={handleMouseEnterB1}
            onMouseLeave={handleMouseLeaveB1} className='boton-circular'
        onClick={() => isUserModal(dispatch, userModal)}>
        <img style={{filter:theme.iconsCircular}} className='icon' src={user} alt="user" />
      </button>
      <button style={boxStyleB2}  onMouseEnter={handleMouseEnterB2}
            onMouseLeave={handleMouseLeaveB2} className='boton-circular'
        onClick={() => isNotificationModal(dispatch, notificationModal)}>
        <img style={{filter:theme.iconsCircular}} className='icon' src={notifications} alt="notifications" />
      </button>
      <button style={boxStyleB3}  onMouseEnter={handleMouseEnterB3}
            onMouseLeave={handleMouseLeaveB3} className='boton-circular'
        onClick={() => isChatModal(dispatch, chatModal)}>
        <img style={{filter:theme.iconsCircular}} className='icon' src={messagesBlack} alt="messagesBlack" />
      </button>
      <div className='linea' />

      <UserModal active={userModal} toggle={isUserModal} dispatch={dispatch}>
        <div className='row'>
        
          <div className='icon-name'>
          <Link style={{color:theme.userName2, textDecoration: 'none'}}  to={`/perfil/${userInfoPerfil.uid_user}`}>
          <img className='icon-user-2'
                  src={userInfoPerfil.imgName ? userInfoPerfil.imgUrl : user}
                  alt={userInfoPerfil.username} />
            <h4 style={{color:theme.userName, position:'relative', top:'-20px', textAlign: 'center', paddingLeft: '4.5rem', paddingRight: '2rem', fontSize: '19px', fontFamily:'sans-serif'}}>
              {userInfoPerfil.name}
            </h4>
          </Link>
          </div>
        </div>
        <div className='row'>
          <Link to={`/configuracion/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
            <button style={boxStyleB4}  onMouseEnter={handleMouseEnterB4}
            onMouseLeave={handleMouseLeaveB4} className='boton-cuadrado'>
              <img style={boxStyleE}  onMouseEnter={handleMouseEnterB4}
            onMouseLeave={handleMouseLeaveB4} className='icon-2' src={settings} alt="settings" />Configuracion
            </button>
          </Link>
        </div>
        <div className='row'>
          <button style={boxStyleB5}  onMouseEnter={handleMouseEnterB5}
            onMouseLeave={handleMouseLeaveB5} className='boton-cuadrado' onClick={handleSubmit} >
            <img  style={boxStyleE2} className='icon-2' src={exit} alt="exit" />Salir
          </button>
        </div>
        <br />
      </UserModal>

      <NotificationModal active={notificationModal} toggle={isNotificationModal} dispatch={dispatch}>
        <h2 style={{ textAlign: 'center', paddingTop: '1rem', fontSize: '150%', fontFamily:'sans-serif', color: theme.userName }}>Notificaciones</h2>
        <Scrollbars autoHeight autoHeightMax={381} style={{ width: '99%' }}>
          {
            notificationsWithLimit.map((notification, index) => <CardNotification notification={notification} key={index} notificationModal={notificationModal} />)
          }
        </Scrollbars>
      </NotificationModal>

      <MessageModal active={chatModal} toggle={isChatModal} dispatch={dispatch}>
        <h2 style={{ textAlign: 'center', paddingTop: '1rem', fontSize: '150%', fontFamily:'sans-serif', color: theme.userName }}>Mensajes</h2>
        {chatsWithLimit.map((chat, index) => <CardMessage chat={chat} key={chat.id_Message} />)}
        <div className='row'>
          <Link to={`/chats/${userInfoPerfil.uid_user}`} style={{ textDecoration: 'none' }}>
          
          <button style={boxStyleB6}  onMouseEnter={handleMouseEnterB6}
            onMouseLeave={handleMouseLeaveB6} className='boton-cuadrado'> 
            <img style={boxStyleE3}  onMouseEnter={handleMouseEnterB6}
            onMouseLeave={handleMouseLeaveB6} src={mensaje}></img>Ver más</button>
          </Link>
        </div>
        <br />
      </MessageModal>

      <SearchModal active={searchModal} toggle={isSearchModal} dispatch={dispatch}>
        <div style={{ minHeight:'0px'}}>
          <Scrollbars autoHeight autoHeightMax={381} >
            <div/>
              {
                !!users && users.map((user) => user.uid_user !== userInfoPerfil.uid_user &&  <CardUsers user={user} key={user.uid_user} searchText={searchText} action={setSearchText} />)
              }
           
          </Scrollbars>
        </div>
      </SearchModal>
    </div>
  )
}

export default HomeHeader;