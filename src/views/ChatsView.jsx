import React from "react";

import ChatsList from "../components/chats/ChatsList";
import { store } from "../store";
import { Loader } from "../components/loader/Loader";

const ChatsView = () => {
  const { layout: { loading: globalLoader } } = store.getState();
  return (
    <div className="row">
      {
        globalLoader && <Loader/>
      }
      <div className="linea-acostada" />
      <div className="col-3">
        <ChatsList />
      </div>
    </div>
  );
};

export default ChatsView;
