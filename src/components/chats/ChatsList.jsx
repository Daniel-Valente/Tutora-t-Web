import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

import { useChatsList } from "../../hooks";
import { search } from "../../images";
import Message from "../message/Message";
import { useTheme } from "styled-components";

const ChatsList = ({ openHandle }) => {
    const userInfo = useSelector(state => state.user);
    const theme = useTheme();
    const [searchText, setSearchText] = useState('');

    const { data: dataChatsList = [], isFetching: fetchingChatsList } = useChatsList(userInfo.uid_user);
    const [chats, setChats] = useState(dataChatsList);
    
    const changeHandle = (e) => setSearchText( e.target.value );

    useEffect(() => {
        !fetchingChatsList && dataChatsList && setChats(dataChatsList);
        // eslint-disable-next-line
    }, [dataChatsList]);
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

    return (
        <div>
            <div style={boxStyle}  onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} className="search-message">
                <input
                    style={{color:theme.userName,}}
                    className="search-input-chats"
                    placeholder="Busca por mesaje o usuario"
                    type="text"
                    onChange={ changeHandle }
                    value={ searchText }
                />
                <button className="search-icon">
                    <img style={{filter:theme.eye}} className="search-imag" src={search} alt="search" />
                </button>
            </div>
            <br />
            <br />
            <div style={{background:theme.linea}} className="linea-acostada" />
            <Scrollbars  autoHeight autoHeightMax={ 731 }  style={{ width: 480 }}>
                { chats.map( ( chat, index ) => <Message chat={chat} key={chat.id_Message} input={ searchText } openHandle={openHandle} /> ) }
            </Scrollbars>
        </div>
    );
};

export default ChatsList;
