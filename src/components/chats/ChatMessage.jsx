import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { user } from '../../images';

const ChatMessage = (props) => {
    const { userChat, chat } = props;
    const { message, uid_user } = chat;
    
    const userInfo = useSelector(state => state.user);
    const messageClass = uid_user === userInfo.uid_user ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <Link to={`/perfil/${ userInfo.uid_user }`} style={{ textDecoration: 'none' }}>
              <div className='boton-circular-volteado-5'>
              <img className='icon-user-message'
                src={`
                    ${ uid_user === userInfo.uid_user 
                        ? ( userInfo.imgUrl ? userInfo.imgUrl : user ) 
                        : ( userChat.imgUrl ? userChat.imgUrl : user )  }`} 
                alt={'user-chat'}/>
              </div>
            </Link>
            <p className='parrafo-message'>{message}</p>
        </div>
    )
}

export default ChatMessage;