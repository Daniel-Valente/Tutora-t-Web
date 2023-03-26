import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, Outlet } from 'react-router-dom';

import { useUpdateChatToUser, useUserById } from '../../hooks';
import { user } from '../../images';

const Message = (props) => {
    const location = useLocation();

    const { chat, input = '' } = props;
    const userInfoPerfil = useSelector(state => state.user);
    const { mutate: updateSeen } = useUpdateChatToUser( chat.uid_user, chat.uid_userChat );

    const { data: dataUserChat = [], isFetching: fetchingUserChat, isLoading: loadingUserChat } = useUserById(chat.uid_userChat);
    const [userChat, setUserChat] = useState(dataUserChat);

    const { data: dataUser = [], isFetching: fetchingUser, isLoading: loadingUser } = useUserById(chat.uid_user);
    const [userPefil, setUserPerfil] = useState(dataUser);

    const filter = input && (userChat.username.toLowerCase().includes(input.toLowerCase()) || chat.message.toLowerCase().includes(input.toLowerCase()));
    
    const seenHandle = () => {
        updateSeen({ uid_user: chat.uid_user, uid_userChat: chat.uid_userChat }, {
            onSuccess: (response) => {
                console.log(response);
            }
        });
    }

    useEffect(() => {
        !fetchingUserChat && dataUserChat && userChat.length > -1  && setUserChat(dataUserChat);
        // eslint-disable-next-line
    }, [dataUserChat]);

    useEffect(() => {
        !fetchingUser && dataUser && userPefil.length > -1 && setUserPerfil(userPefil);
        // eslint-disable-next-line
    }, [dataUser]);
    

    if (loadingUserChat || loadingUser) {
        return (
            <div className='parent'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        filter && input ? <div className={`row ${ chat.seen === false && chat.uid_user !== userInfoPerfil.uid_user  ? 'message-not-view' : '' }`}>
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
                <p style={{ marginLeft: '1%', marginTop: '25px' }}>
                    <label style={{ fontSize: '20px' }}> <b>{userInfoPerfil.uid_user === chat.uid_user ? userChat.username : userPefil.username}</b> </label>
                    <br />
                    {userInfoPerfil.uid_user === chat.uid_user ? 'Tú: ' + chat.message : chat.message}
                </p>
            </div>
            <div className='linea-acostada' />
        </div>
            : !input &&
            <div className={`row ${ chat.seen === false && chat.uid_user !== userInfoPerfil.uid_user ? 'message-not-view' : '' }`}>
                
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
                    <Link to={`/chats/${ userInfoPerfil.uid_user }/to/${ userInfoPerfil.uid_user !== chat.uid_user ? chat.uid_user : chat.uid_userChat  }`} 
                    state={{ background: location }}
                    onClick={ seenHandle } 
                    style={{ textDecoration: 'none', color: 'black' }}>
                    <p style={{ marginLeft: '1%', marginTop: '25px' }}>
                        <label style={{ fontSize: '20px' }}> <b>{userInfoPerfil.uid_user === chat.uid_user ? userChat.username : userPefil.username}</b> </label>
                        <br />
                        {userInfoPerfil.uid_user === chat.uid_user ? 'Tú: ' + chat.message : chat.message}
                    </p>
                    </Link>
                </div>
                <div className='linea-acostada' />
            </div>
    )
}

export default Message