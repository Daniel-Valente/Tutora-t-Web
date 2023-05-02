import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";

import { useParams } from "react-router-dom";
import { useAddChatToUser, useChatsListToUser, useUserById } from "../../hooks";

import ChatMessage from "./ChatMessage";

const Chat = () => {
  const { uid_user, uid_userChat } = useParams();

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

  return (
    <div className="modalDiv">
      <div className="modal">
        <div className="header-chat">
          <div className="name-user-header">{userChat.name}</div>
        </div>
        <br />
        <br />
        <div className="linea-acostada" />
        <br />
        <div className="section-message">
          <div className="sidebar-messages main-message">
            <Scrollbars  autoHeight autoHeightMax={ 731 } style={{ width: '99%' }} ref={scrollRef}>
              {
                chatMessages && chatMessages.map((chat, index) => <ChatMessage key={index} chat={chat} userChat={userChat} />)
              }
            </Scrollbars>
            <div className="scrollbox">
              <div className="scrollbox-inner">
              </div>
            </div>
          </div>

          <div className="form-chat">
            <input
              className="input-message"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="treat people with kindness"
            />

            <button
              className="form-button-message send-button-message"
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

export default Chat;
