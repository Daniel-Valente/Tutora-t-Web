import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { Link, useLocation, useParams } from "react-router-dom";
import { useAddChatToUser, useChatsListToUser, useUserById } from "../hooks";

import ChatMessage from "../components/chats/ChatMessage";
import { useTheme } from "styled-components";

const ChatView = () => {
  const { uid_user, uid_userChat } = useParams();
  const location = useLocation();
  const { prevPath = '' } = location.state || [];

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
    <div className="modalDiv-chat">
      <div style={{background:theme.header}} className="modal-chat">
        <div style={{background:theme.header}} className="header-chat">
          <button style={{background:theme.header}} className="close-panel">
            <Link  to={prevPath} style={{ textDecoration: 'none'}} >X</Link>
          </button>
          <h2 style={{ textAlign: 'center',fontSize: '150%', fontFamily:'sans-serif', color: theme.userName, background:theme.header }}>{userChat.name}</h2>
        </div>
        <br /><br />
        <div style={{background:theme.linea}} className="linea-acostada"/>
        <br />
        <div  className="section-message-chat">
          <div className="sidebar-messages-chat main-message-chat">
            <Scrollbars autoHeight autoHeightMax={ '42vh' }  style={{ width: '44.5vh'}} ref={scrollRef}>
              {
                chatMessages && chatMessages.map((chat, index) => <ChatMessage key={index} chat={chat} userChat={userChat} />)
              }
            </Scrollbars>
          </div>

          <div className="form-chats">
            <input
              style={{background:theme.background, color: theme.userName}}
              className="input-message-chat"
              value={formValue}
              onKeyUp={ submitHandler }
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="treat people with kindness"
            />

            <button
              className="form-button-message-chat send-button-message-chat"
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

export default ChatView;