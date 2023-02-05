import React from 'react';
import { user } from '../../images';

const ChatMessage = (props) => {

    const { message, user_uid, photoUrl } = props.message;
    const messageClass = user_uid === user ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={`${photoUrl ? photoUrl : user}`} />
            <p className='parrafo-message'>{message}</p>
        </div>
    )
}

export default ChatMessage;