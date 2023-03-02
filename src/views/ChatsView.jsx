import React from "react";

import ChatsList from "../components/chats/ChatsList";

const ChatsView = () => {
  return (
    <div className="row">
      <div className="linea-acostada" />
      <div className="col-3">
        <ChatsList />
      </div>
    </div>
  );
};

export default ChatsView;
