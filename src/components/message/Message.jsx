import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useUserById } from '../../hooks';
import { user } from '../../images';

const Message = (props) => {
    const { chat } = props;
    
    const { data: dataUserChat = [], isFetching: fetchingUserChat } = useUserById( chat.uid_userChat );
    const [ userChat, setUserChat ] = useState(dataUserChat);

  useEffect(() => {
    !fetchingUserChat && dataUserChat && setUserChat(dataUserChat);
  }, [dataUserChat]);

    return (
        <div className='row'>
            <div className='col-3'>
                <Link to={`/perfil/${ userChat.uid_user }`}>
                    <div className='boton-circular-volteado-5'>
                        <img className='icon-user-message' 
                        src={`${ userChat.imgUrl ? userChat.imgUrl : user }`} 
                        alt={ userChat.username}
                        />
                    </div>
                </Link>
            </div>
            <div className='col-9'>
                <p style={{ marginLeft: '10%', marginTop: '25px' }}>
                    <label style={{ fontSize: '20px' }}> <b>{ userChat.username }</b> </label>
                    <br />
                    { chat.message }
                </p>
            </div>
        </div>
    )
}

export default Message