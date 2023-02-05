import React from "react";

import CreatePost from "../components/create-post/CreatePost";

const HomeView = () => {
  return (
    <div className="principal-body">
      <div className="linea-acostada" />
      <CreatePost />
    </div>
  );
};

export default HomeView;
