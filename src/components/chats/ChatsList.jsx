import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

import { useChatsList } from "../../hooks";
import { search } from "../../images";
import Message from "../message/Message";

const ChatsList = ({ openHandle }) => {
    const userInfo = useSelector(state => state.user);

    const [searchText, setSearchText] = useState('');

    const { data: dataChatsList = [], isFetching: fetchingChatsList, isLoading: loadingChatsList } = useChatsList(userInfo.uid_user);
    const [chats, setChats] = useState(dataChatsList);
    
    const changeHandle = (e) => setSearchText( e.target.value );

    useEffect(() => {
        !fetchingChatsList && dataChatsList && setChats(dataChatsList);
        // eslint-disable-next-line
    }, [dataChatsList]);

    if (loadingChatsList) {
        return (
            <div className='parent'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <div>
            <div className="search-message">
                <input
                    className="search-input-chats"
                    placeholder="Buscar mensaje o usuario"
                    type="text"
                    onChange={ changeHandle }
                    value={ searchText }
                />
                <button className="search-icon">
                    <img className="search-imag" src={search} alt="search" />
                </button>
            </div>
            <br />
            <br />
            <div className="linea-acostada" />
            <Scrollbars  style={{ width: 480, height: 731 }}>
                { chats.map( ( chat, index ) => <Message chat={chat} key={chat.id_Message} input={ searchText } openHandle={openHandle} /> ) }
            </Scrollbars>
        </div>
    );
};

export default ChatsList;
