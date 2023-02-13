import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CreatePost from "../components/create-post/CreatePost";
import Post from "../components/Post/Post";
import { usePostsList, useUserByUsername } from "../hooks";
import { userInfo } from "../reducers";

const HomeView = () => {

  const userLogIn = useSelector(state => state.userLogIn);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const dispatch = useDispatch();

  const { data: dataPostsList = [], isLoading: loadingPosts, isFetching: fetchingPostsList } = usePostsList();
  const [posts, setPosts] = useState(dataPostsList);

  const { data: dataUser = [], isFetching: fetchingUser } = useUserByUsername(userLogIn.displayName);

  useEffect(() => {
    !fetchingUser && dataUser && dispatch(userInfo(dataUser));
  }, [dataUser]);

  useEffect(() => {
    !fetchingPostsList && dataPostsList && posts.length > -1 && setPosts(dataPostsList);
  }, [dataPostsList]);

  if (loadingPosts) {
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
      {
        posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id} path='perfil' />)
      }
    </div>
  );
};

export default HomeView;
