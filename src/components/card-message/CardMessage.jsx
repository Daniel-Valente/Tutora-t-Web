import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { isChatModal } from '../../helpers/utils';

import { useUpdateChatToUser, useUserById } from '../../hooks';
import { user } from '../../images';
import { useTheme } from 'styled-components';

const CardMessage = (props) => {
    const location = useLocation();

    const { chat } = props;
    const userInfoPerfil = useSelector(state => state.user);
    const dispatch = useDispatch();

    const { mutate: updateSeen } = useUpdateChatToUser(chat.uid_user, chat.uid_userChat);

    const { data: dataUserChat = [], isFetching: fetchingUserChat } = useUserById(chat.uid_userChat);
    const [userChat, setUserChat] = useState(dataUserChat);

    const { data: dataUser = [], isFetching: fetchingUser } = useUserById(chat.uid_user);
    const [userPefil, setUserPerfil] = useState(dataUser);

    const seenHandle = () => {
        isChatModal(dispatch, true);
        updateSeen({ uid_user: chat.uid_user, uid_userChat: chat.uid_userChat }, {
            onSuccess: (response) => {
                console.log(response);
            }
        });
    }

    const formatDate = () => new Date(chat.createdAt).toLocaleTimeString();

    useEffect(() => {
        !fetchingUserChat && dataUserChat && userChat.length > -1 && setUserChat(dataUserChat);
        // eslint-disable-next-line
    }, [dataUserChat]);

    useEffect(() => {
        !fetchingUser && dataUser && userPefil.length > -1 && setUserPerfil(userPefil);
        // eslint-disable-next-line
    }, [dataUser]);
    const theme = useTheme();

    return (
        <div className={`row ${chat.seen === false && chat.uid_user !== userInfoPerfil.uid_user ? 'message-not-view' : ''} card-message`}>

            <Outlet />
            <div className='col-3'>
                <Link to={`/perfil/${userInfoPerfil.uid_user === chat.uid_user ? userChat.uid_user : userPefil.uid_user}`}>
                    <div className='boton-circular-volteado-5'>
                        <img className='icon-user-message'
                            src={`${userInfoPerfil.uid_user === chat.uid_user ? userChat.imgUrl : userPefil.imgUrl ? userPefil.imgUrl : user}`}
                            alt={userChat.username}
                        />
                    </div>
                </Link>
            </div>
            <div className='col-7'>
                <Link to={`${location.pathname.split('/', 3)[2] !== "chats" && location.pathname.split('/', 2)[1] === 'course' ? location.pathname : location.pathname.split('/', 2)[1]}/${userInfoPerfil.uid_user}/to/${userInfoPerfil.uid_user !== chat.uid_user ? chat.uid_user : chat.uid_userChat}`}
                    state={{ background: location, prevPath: location.pathname }}
                    onClick={seenHandle}
                    style={{ textDecoration: 'none', color: 'black' }}>
                    <p style={{ marginLeft: '1%', marginTop: '25px', color:theme.userName2 }}>
                        <label style={{ fontSize: '20px',color:theme.userName }}> <b>{userInfoPerfil.uid_user === chat.uid_user ? userChat.username : userPefil.username}</b> </label>
                        <br />
                        {userInfoPerfil.uid_user === chat.uid_user ? 'Tú: ' + chat.message : chat.message}
                        <div className='format-hours'>{ formatDate() }</div>
                    </p>
                </Link>
            </div>
            <div style={{background:theme.linea}} className='linea-acostada' />
        </div>
    )
}

export default CardMessage;