import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { user } from '../../images';

const ChatMessage = (props) => {
    const { userChat, chat } = props;
    const { message, uid_user, createdAt } = chat;
    
    const userInfo = useSelector(state => state.user);
    const messageClass = uid_user === userInfo.uid_user ? 'sent' : 'received';

    const formatDate = () => new Date(createdAt).toLocaleTimeString();

    return (
        <div className={`message ${messageClass}`}>
            <Link to={`/perfil/${ uid_user === userInfo.uid_user ? uid_user : userChat.uid_user }`} style={{ textDecoration: 'none' }}>
              <div className='boton-circular-volteado-5-new'>
              <img className='icon-user-message-chat'
                src={`
                    ${ uid_user === userInfo.uid_user 
                        ? ( userInfo.imgUrl ? userInfo.imgUrl : user ) 
                        : ( userChat.imgUrl ? userChat.imgUrl : user )  }`} 
                alt={'user-chat'}/>
              </div>
            </Link>
            <p className='parrafo-message'>{message}<span className='format-time-chat'> { formatDate() }</span></p>
        </div>
    )
}

export default ChatMessage;