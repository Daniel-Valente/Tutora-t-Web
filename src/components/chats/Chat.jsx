import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { useAddChatToUser, useChatsListToUser, useUserById } from "../../hooks";

import ChatMessage from "./ChatMessage";

const Chat = () => {
  const { uid_user, uid_userChat } = useParams();

  const { data: dataChat, isRefetching: fetchingChat } = useChatsListToUser( uid_user, uid_userChat );
  const [ chatMessages, setChatMessage ] = useState( dataChat );
  const { mutate: sendMessage } = useAddChatToUser( uid_user, uid_userChat );

  const { data: dataUserChat = [], isFetching: fetchingUserChat } = useUserById(uid_userChat);
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
  }, [dataChat]);
  
  useEffect(() => {
    setUserChat(dataUserChat);
  }, [dataUserChat]);

  const dummy = useRef();

  return (
    <div className="modalDiv">
      <div className="modal">
        <div className="header-chat">
          <div className="name-user-header">{ userChat.name }</div>
        </div>
        <br />
        <br />
        <div className="linea-acostada" />
        <div className="section-message">
          <div className="sidebar-messages main-message">
            <div className="scrollbox">
              <div className="scrollbox-inner">
                {
                  chatMessages && chatMessages.map((chat) => <ChatMessage key={chat.id} chat={chat} userChat={userChat} />)
                }
                <span></span>
              </div>
            </div>
          </div>

          <div className="form-chat">
            <input
              className="input-message"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="say something nice"
            />

            <button
              className="form-button-message send-button-message"
              type="submit"
              onClick={ submitHandle }
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
