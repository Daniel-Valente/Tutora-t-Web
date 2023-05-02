import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardCareer from "../components/card-career/CardCareer";

import Course from "../components/course/Course";
import CreatePost from "../components/create-post/CreatePost";
import Post from "../components/Post/Post";
import { filterContent } from "../helpers/utils";
import {
  useCareersList, useCoursesList, useHidePostList,
  usePostsList, useSavePostList, useSendEmailVerify, useTree
} from "../hooks";
import { isRegisterState } from "../reducers";
import { Loader } from "../components/loader/Loader";
import { store } from "../store";

const HomeView = () => {

  const userInfoPerfil = useSelector(state => state.user);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const { value: isRegister } = useSelector(state => state.isRegister);
  const { layout: { loading: globalLoader } } = store.getState();
  const dispatch = useDispatch();

  const [section, setSection] = useState('Todos');
  const { mutate: sendEmailVerify } = useSendEmailVerify();
  
  const { data: dataTree = [], isFetching: fetchingTree } = useTree(userInfoPerfil.uid_user, userInfoPerfil.career);
  const [ tree, setTree ] = useState(dataTree);

  const { data: dataPostsList = [], isFetching: fetchingPostsList } = usePostsList();
  const [posts, setPosts] = useState(filterContent(dataPostsList, tree));
  
  const { data: dataCoursesInscripto = [], isFetching: fetchingCoursesInscripto } = useCoursesList();
  const [coursesInscripto, setCoursesInscripto] = useState(dataCoursesInscripto);
  
  const { data: dataHidePost = [], isFetching: fetchingHidePost } = useHidePostList(userInfoPerfil.uid_user);
  const [hidePost, setHidePost] = useState(dataHidePost);
  
  const { data: dataSavePost = [], isFetching: fetchingSavePost} = useSavePostList(userInfoPerfil.uid_user);
  const [savePost, setSavePost] = useState(dataSavePost);
  
  const { data: dataCareers, isFetching: fetchingCareers } = useCareersList();
  const [careers, setCareers] = useState(dataCareers);

  useEffect(() => {
    if (isRegister) {
      const userVerify = {
        name: userInfoPerfil.name,
        email: userInfoPerfil.email
      }

      sendEmailVerify(userVerify, {
        onSuccess: (response) => {
          console.log('email was sent');
          dispatch(isRegisterState(false));
        },
        onError: (response) => {
          console.log(response);
        }
      });
    }
  }, [userInfoPerfil]);

  useEffect(() => {
    !fetchingCoursesInscripto && dataCoursesInscripto && setCoursesInscripto(dataCoursesInscripto);
    // eslint-disable-next-line
  }, [dataCoursesInscripto]);

  useEffect(() => {
    !fetchingHidePost && dataHidePost && setHidePost(dataHidePost);
    // eslint-disable-next-line
  }, [dataHidePost]);

  useEffect(() => {
    !fetchingSavePost && dataSavePost && setSavePost(dataSavePost);
    // eslint-disable-next-line
  }, [dataSavePost]);

  useEffect(() => {
    !fetchingTree && dataTree && setTree(dataTree);
    // eslint-disable-next-line
  }, [dataTree]);

  useEffect(() => { 
    if(!fetchingPostsList && dataPostsList && posts.length > -1 && tree ) {
      setPosts(filterContent(dataPostsList, tree));
    }
    // eslint-disable-next-line
  }, [dataPostsList]);

  useEffect(() => {
    !fetchingCareers && dataCareers && setCareers(dataCareers);
    // eslint-disable-next-line
  }, [dataCareers]);

  return (
    <div className="principal-body ">
      <div className="linea-acostadaHome" />

      <div className="row">
        <div className="col-2">
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
            <b>Publicaciones por carreras</b>
          </label>
          <div className='row'>
            {
              careers && careers.map((career, index) => <CardCareer career={career} filter={career.clave} key={career.id} section={section} action={setSection} col={4} />)
            }
          </div>
        </div>
        <div className="col-7">
          <CreatePost />
          { tree &&
            posts.map((post, index) => post.visible
              && !hidePost.includes(post._id)
              && section === 'Todos'
              ? <Post post={post} commentModal={commentModal} key={post._id} hide={hidePost.includes(post._id)} save={savePost.includes(post._id)} />
              : post.visible && !hidePost.includes(post._id) && section === post.career && <Post post={post} commentModal={commentModal} key={post._id} hide={hidePost.includes(post._id)} save={savePost.includes(post._id)} />
            )
          }
        </div>
        <div className="col-2">
          <label style={{ textAlign: 'left', marginLeft: '-2%', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
            <b>Novedades en las tutorías</b>
          </label>
            <Link to={`/courses`} style={{ textDecoration: 'none' }}>
              <p className="course-view-all">ver más</p>
            </Link>
          <br />
          <br />
          {
            coursesInscripto.map((course, index) => {
              const { participants } = course;
              if (participants.includes(userInfoPerfil.uid_user) || course.uid_user === userInfoPerfil.uid_user) {
                return (
                  <Course course={course} key={course._id} />
                )
              }
              else return []
            })
          }
        </div>
      </div>
    </div>
  );
};

export default HomeView;
