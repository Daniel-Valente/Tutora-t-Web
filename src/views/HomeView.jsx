import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreatePost from "../components/create-post/CreatePost";
import { useUserByUsername } from "../hooks";
import { userInfo } from "../reducers";

const HomeView = () => {

  const userLogIn = useSelector(state => state.userLogIn);
  const dispatch = useDispatch();

  const { data: dataUser = [], isFetching: fetchingUser } = useUserByUsername(userLogIn.displayName);
  
  useEffect(() => {
    dispatch( userInfo(dataUser) );
  });
  

  return (
    <div className="principal-body">
      <div className="linea-acostada" />
      <CreatePost />
    </div>
  );
};

export default HomeView;
