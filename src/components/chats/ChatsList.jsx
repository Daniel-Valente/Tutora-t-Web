import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { useChatsList } from "../../hooks";
import { search } from "../../images";
import Message from "../message/Message";

const ChatsList = () => {
    const userInfo = useSelector(state => state.user);

    const { data: dataChatsList = [], isFetching: fetchingChatsList } = useChatsList(userInfo.uid_user);
    const [chats, setChats] = useState(dataChatsList);

    useEffect(() => {
        !fetchingChatsList && chats.length > 0 && setChats(dataChatsList);
    }, [dataChatsList]);
    
    return (
        <div>
            <div className="search-message">
                <input
                    className="search-input"
                    placeholder="Buscar mensaje o usuario"
                    type="text"
                ></input>
                <button className="search-icon">
                    <img className="search-imag" src={search} alt="search" />
                </button>
            </div>
            <br />
            <br />
            <div className="linea-acostada" />
            <div className="sidebar-chat-list">
                <div className="scrollbox">
                    <div className="scrollbox-inner">
                        { chats.map( ( chat, index ) => <Message chat /> ) }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatsList;
