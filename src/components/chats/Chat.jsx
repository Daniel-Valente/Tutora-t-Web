import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { useUserById } from "../../hooks";
import { useChatsListToUser } from "../../hooks/chats/useChatsListToUser";

import ChatMessage from "./ChatMessage";

const Chat = () => {
  const userInfo = useSelector(state => state.user);
  const { uid_userChat } = useParams();

  const { data: dataChatListToUser = [] } = useChatsListToUser(userInfo.uid_user, uid_userChat);
  const [chatToUser, setChatToUser] = useState(dataChatListToUser);

  const { data: dataUserChat = [] } = useUserById(uid_userChat);
  const [userChat, setUserChat] = useState(dataUserChat);

  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    setChatToUser(dataChatListToUser);
  }, [dataChatListToUser]);

  const dummy = useRef();

  return (
    <div>
      <div className="header-chat">
        <div className="name-user-header">Henry Cavil</div>
      </div>
      <br />
      <br />
      <div className="linea-acostada" />
      <div className="section-message">
        <div className="sidebar-messages main-message">
          <div className="scrollbox">
            <div className="scrollbox-inner">
              {
                chatToUser && chatToUser.map( (chat) => <ChatMessage key={ chat.id } chat={chat} userChat={chat} /> ) 
              }
              <span></span>
            </div>
          </div>
        </div>

        <form className="form-chat">
          <input
            className="input-message"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="say something nice"
          />

          <button
            className="form-button-message send-button-message"
            type="submit"
            disabled={!formValue}
          >
            🕊️
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
