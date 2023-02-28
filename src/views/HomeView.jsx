import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Course from "../components/course/Course";

import CreatePost from "../components/create-post/CreatePost";
import Post from "../components/Post/Post";
import { useCoursesList, useHidePostList, usePostsList, useSavePostList, useUserByUsername } from "../hooks";
import { userInfo } from "../reducers";

const HomeView = () => {

  const userLogIn = useSelector(state => state.userLogIn);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const dispatch = useDispatch();

  
  const { data: dataPostsList = [], isLoading: loadingPosts, isFetching: fetchingPostsList } = usePostsList();
  const [posts, setPosts] = useState(dataPostsList);
  
  const { data: dataUser = [], isFetching: fetchingUser, isLoading: loadingUser } = useUserByUsername(userLogIn.displayName);
  
  const { data: dataCoursesInscripto = [], isFetching: fetchingCoursesInscripto, isLoading: loadingCoursesInscripto } = useCoursesList();
  const [coursesInscripto, setCoursesInscripto] = useState(dataCoursesInscripto);
  
  const { data: dataHidePost = [], isFetching: fetchingHidePost, isLoading: loadingHidePost } = useHidePostList( dataUser.uid_user );
  const [ hidePost, setHidePost ] = useState(dataHidePost);
  
  const { data: dataSavePost = [], isFetching: fetchingSavePost, isLoading: loadingSavePost } = useSavePostList( dataUser.uid_user );
  const [ savePost, setSavePost ] = useState(dataSavePost);

  useEffect(() => {
    !fetchingUser && dataUser && dispatch(userInfo(dataUser));
    // eslint-disable-next-line
  }, [dataUser]);

  useEffect(() => {
    !fetchingPostsList && dataPostsList && posts.length > -1 && setPosts(dataPostsList);
    // eslint-disable-next-line
  }, [dataPostsList]);

  useEffect(() => {
    !fetchingCoursesInscripto && dataCoursesInscripto && setCoursesInscripto(dataCoursesInscripto);
    // eslint-disable-next-line
  }, [dataCoursesInscripto]);

  useEffect(() => {
    !fetchingHidePost && dataHidePost && setHidePost(dataHidePost);
    // eslint-disable-next-line
  }, [ dataHidePost ]);
  
  useEffect(() => {
    !fetchingSavePost && dataSavePost && setSavePost(dataSavePost);
    // eslint-disable-next-line
  }, [ dataSavePost ]);

  if (loadingPosts || loadingUser || loadingCoursesInscripto || loadingHidePost || loadingSavePost) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className="principal-body">
      <div className="linea-acostada" />
      <div className="row">
        <div className="col-2">a</div>
        <div className="col-7">
          <CreatePost />
          {
            posts.map((post, index) => post.visible 
            && !hidePost.includes(post._id) 
            && <Post post={post} commentModal={commentModal} key={post._id} hide={hidePost.includes(post._id)} save={ savePost.includes(post._id) }/>)
          }
        </div>
        <div className="col-2">
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>Novedades en los cursos</b>
          </label>
          <br />
          {
            coursesInscripto.map((course, index) => {
              const { participants } = course;
              if (participants.includes(dataUser.uid_user) || course.uid_user === dataUser.uid_user) {
                return (
                  <Course course={course}  key={ course._id } />
                )
              }
            })
          }
        </div>
      </div>
    </div>
  );
};

export default HomeView;
