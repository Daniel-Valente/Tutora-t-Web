import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { Link, useLocation, useParams } from "react-router-dom";
import { useAddChatToUser, useChatsListToUser, useUserById } from "../hooks";

import ChatMessage from "../components/chats/ChatMessage";

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

  const submitHandle = () => {
    const messages = {
      uid_user,
      uid_userChat,
      message: formValue
    }
    sendMessage(messages, {
      onSuccess: (response) => {
        console.log(response);
      }
    });
    setFormValue("");
  }

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

  const dummy = useRef();

  return (
    <div className="modalDiv-chat">
      <div className="modal-chat">
        <div className="header-chat">
          <button className="close-panel">
            <Link  to={prevPath} style={{ textDecoration: 'none'}} >X</Link>
          </button>
          <div className="name-user-header-chat">{userChat.name}</div>
        </div>
        <br /><br />
        <div className="linea-acostada"/>
        <br />
        <div className="section-message-chat">
          <div className="sidebar-messages-chat main-message-chat">
            <Scrollbars style={{ width: '99%', height: '42vh' }} ref={scrollRef}>
              {
                chatMessages && chatMessages.map((chat, index) => <ChatMessage key={index} chat={chat} userChat={userChat} />)
              }
            </Scrollbars>
          </div>

          <div className="form-chats">
            <input
              className="input-message-chat"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="say something nice"
            />

            <button
              className="form-button-message-chat send-button-message-chat"
              type="submit"
              onClick={submitHandle}
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