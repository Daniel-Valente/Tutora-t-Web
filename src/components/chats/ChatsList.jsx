import React, { useEffect, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

import { useChatsList } from "../../hooks";
import { search } from "../../images";
import Message from "../message/Message";

const ChatsList = () => {
    const userInfo = useSelector(state => state.user);

    const { data: dataChatsList = [], isFetching: fetchingChatsList } = useChatsList(userInfo.uid_user);
    const [chats, setChats] = useState(dataChatsList);

    useEffect(() => {
        !fetchingChatsList && dataChatsList && setChats(dataChatsList);
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
            <Scrollbars  style={{ width: 480, height: 731 }}>
                { chats.map( ( chat, index ) => <Message chat={chat} key={chat.id_Message} /> ) }
            </Scrollbars>
        </div>
    );
};

export default ChatsList;
