import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreatePost from "../components/create-post/CreatePost";
import Post from "../components/Post/Post";
import { usePostsList, useUserByUsername } from "../hooks";
import { userInfo } from "../reducers";

const HomeView = () => {

  const userLogIn = useSelector(state => state.userLogIn);
  const dispatch = useDispatch();

  const { data: dataPostsList = [], isLoading: loadingPosts } = usePostsList();
  const [ posts, setPosts ] = useState(dataPostsList);

  const { data: dataUser = [], isFetching: fetchingUser } = useUserByUsername(userLogIn.displayName);
  
  useEffect(() => {
    dispatch( userInfo(dataUser) );
  });
  
  useEffect(() => {
    setPosts(dataPostsList);
  }, [ dataPostsList ]);

  if(loadingPosts) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className="principal-body">
      <div className="linea-acostada" />
      <CreatePost />
      <br />
      {
        posts.map( ( post, index ) => <Post post={post}  key={ post.id_Post } /> )
      }
    </div>
  );
};

export default HomeView;
