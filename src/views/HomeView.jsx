import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreatePost from "../components/create-post/CreatePost";
import Post from "../components/Post/Post";
import { usePostsList, useUserByUsername } from "../hooks";
import { userInfo } from "../reducers";

const HomeView = () => {

  const userLogIn = useSelector(state => state.userLogIn);
  const dispatch = useDispatch();

  const { data: dataPostsList = [], isFetching: fetchingPostsList } = usePostsList();
  const [ posts, setPosts ] = useState(dataPostsList);

  const { data: dataUser = [], isFetching: fetchingUser } = useUserByUsername(userLogIn.displayName);
  
  useEffect(() => {
    dispatch( userInfo(dataUser) );
  });
  
  useEffect(() => {
    !fetchingPostsList && posts.length > 0 && setPosts(dataPostsList);
  }, [ dataPostsList ]);

  return (
    <div className="principal-body">
      <div className="linea-acostada" />
      <CreatePost />
      <br />
      {
        posts.map( ( post, index ) => <Post post={post} /> )
      }
    </div>
  );
};

export default HomeView;
