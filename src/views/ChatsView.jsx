import React from "react";

import ChatsList from "../components/chats/ChatsList";
import { store } from "../store";
import { Loader } from "../components/loader/Loader";
import { useTheme } from "styled-components";

const ChatsView = () => {
  const { layout: { loading: globalLoader } } = store.getState();
  const theme = useTheme();
  return (
    <div className="row">
      <div style={{ background:theme.linea}} className="linea-acostada" />
      <div className="col-3">
        <ChatsList />
      </div>
    </div>
  );
};

export default ChatsView;
