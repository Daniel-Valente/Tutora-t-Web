import React from "react";

import Chat from "../components/chats/Chat";
import ChatsList from "../components/chats/ChatsList";

const ChatsView = () => {
  return (
    <div className="row">
      <div className="linea-acostada" />
      <div className="col-3">
        <ChatsList />
      </div>
      <div className="col-9">
        {/* <Chat /> */}
      </div>
    </div>
  );
};

export default ChatsView;
