import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { useParams } from "react-router-dom";
import { useAddChatToUser, useChatsListToUser, useUserById } from "../../hooks";

import ChatMessage from "./ChatMessage";
import { useTheme } from "styled-components";

const Chat = () => {
  const { uid_user, uid_userChat } = useParams();

  const scrollRef = useRef('null');

  const { data: dataChat } = useChatsListToUser(uid_user, uid_userChat);
  const [chatMessages, setChatMessage] = useState(dataChat);
  const { mutate: sendMessage } = useAddChatToUser(uid_user, uid_userChat);

  const { data: dataUserChat = [] } = useUserById(uid_userChat);
  const [userChat, setUserChat] = useState(dataUserChat);

  const [formValue, setFormValue] = useState("");

  const sendMessageHandler = () => {
    const messages = {
      uid_user,
      uid_userChat,
      message: formValue
    }
    sendMessage(messages, {
      onSuccess: (response) => {
        console.log(response);
        setFormValue("");
      }
    });
  }

  const submitHandler = ( event ) => 
    event.code === 'Enter' && sendMessageHandler()

  useEffect(() => {
    setChatMessage(dataChat);
    // eslint-disable-next-line
  }, [dataChat]);

  useEffect(() => {
    setUserChat(dataUserChat);
    // eslint-disable-next-line
  }, [dataUserChat]);

  useEffect(() => {
    scrollRef.current && scrollRef.current.scrollToBottom();
  },[dataChat]);
  const theme = useTheme();
  return (
    <div style={{background:theme.background}} className="modalDiv">
      <div style={{background:theme.background}} className="modal">
        <div style={{background:theme.background}} className="header-chat">
          <div style={{color:theme.userName}} className="name-user-header">{userChat.name}</div>
        </div>
        <br />
        <br />
        <div className="linea-acostada" />
        <br />
        <div className="section-message">
          <div className="sidebar-messages main-message">
            <Scrollbars  autoHeight autoHeightMax={ 731 } style={{ width: '99%' }} ref={scrollRef}>
              {
                chatMessages && chatMessages.map((chat, index) => <ChatMessage key={index} chat={chat} userChat={userChat}  />)
              }
            </Scrollbars>
            <div className="scrollbox">
              <div className="scrollbox-inner">
              </div>
            </div>
          </div>

          <div style={{background:theme.comments}} className="form-chat">
            <input
              style={{color:theme.userName, background:theme.background}}
              className="input-message"
              value={formValue}
              onKeyUp={ submitHandler }
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="treat people with kindness"
            />

            <button
              className="form-button-message send-button-message"
              type="submit"
              onClick={sendMessageHandler}
              disabled={!formValue}
            >
              🕊️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
