import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import CreatePost from '../components/create-post/CreatePost';
import Notification from '../components/notification/Notification';
import Post from '../components/Post/Post';
import { useCourseById, usePostsByCourse, useRegistrationByUser, 
  useRegistrationUser, useUsersList } from '../hooks';

import { fondo, search, user } from '../images';

const CourseView = () => {
  const { id_Course } = useParams();

  const userInfo = useSelector(state => state.user);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const dispatch = useDispatch();

  const { mutate: userRegister } = useRegistrationUser(id_Course, userInfo.uid_user);
  
  const { data: dataCourse = [], isFetching: fetchingCourse, isLoading: loadingCourse  } = useCourseById(id_Course);
  const [course, setCourse] = useState(dataCourse);

  const { data: dataPostsList = [], isLoading: loadingPosts, isFetching: fetchingPostsList } = usePostsByCourse(id_Course);
  const [posts, setPosts] = useState(dataPostsList);

  const { data: dataUsersList = [], isFetching: fetchingUsersList, isLoading: loadingUsersList } = useUsersList();
  const [ users, setUsers ] = useState(dataUsersList);

  const { data: dataUserRegister, isLoading: loadingUserRegister } = useRegistrationByUser(id_Course, userInfo.uid_user);

  useEffect(() => {
    !fetchingCourse && dataCourse && setCourse(dataCourse);
  }, [dataCourse]);

  useEffect(() => {
    !fetchingPostsList && dataPostsList && posts.length > -1 && setPosts(dataPostsList);
  }, [dataPostsList]);
  
  useEffect(() => {
    !fetchingUsersList && dataUsersList && users.length > -1 && setUsers(dataUsersList);
  }, [dataUsersList]);

  if (loadingCourse || loadingPosts || loadingUserRegister || loadingUsersList) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  const handleRegister = () => {
    const register = { id_Course, uid_user: userInfo.uid_user }
    userRegister(register, {
      onSuccess: (response) => {
        console.log(response);
      }
    });
  }

  return (
    <div className='principal-body'>
      <div className='row'>
        <img className="fondo"
          src={course.imgUrl}
          alt={'user-portada'} />
        <label style={{ textAlign: 'left', marginTop: '5%', fontWeight: 'bold', marginLeft: '27%', fontSize: '300%', fontFamily: 'Segoe UI Emoji' }}>
          { course.title }
        </label>
        <br />
        <div className='row'>
          <div className='col-7'></div>
          <div className='col-2' style={{ marginLeft: '3%' }}>
            {
              userInfo.uid_user !== course.uid_user &&
              <button className={`${ dataUserRegister ? 'button-left' : 'button-join' }`} onClick={ handleRegister }>
                {dataUserRegister ? 'Salirse' : 'Unirse' }
              </button>
            }
            <button className='button-option-course'>{'>'}</button>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>Información:</b>
          </label>
          <br />
          <b>Descripción:</b> { course.description } <br />
          <b>Días:</b> { course.dates } <br />
          <b>Horario:</b> { course.hours } <br />
          <b>Lugar:</b> { course.site } <br />
          <b>Privacidad del curso:</b> { course.visible ? 'Público' : 'Privado' } <br />
        </div>
        <div className='col-7'>
          <div className='row'>
            {/* <div className='col-1'></div>
            <div className='col-2'>
              <button className='button-left'>Conversación</button>
            </div>
            <div className='col-2'>
              <button className='button-left'> Destacado </button>
            </div>
            <div className='col-4'>
              <button className='button-left'> Multimedia </button>
            </div>
            <div className='col-1'>
              <button>
                <img className='search-imag' src={ search } alt="" />
              </button>
              <button  style={{ marginLeft: '1vh' }} className='button-option-course'>...</button>
            </div> */}
          </div>
          {
            dataUserRegister ? <CreatePost/> : userInfo.uid_user === course.uid_user && <CreatePost/>
          }
          {
            course.visible 
            ? posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id}/>)
            : dataUserRegister 
              ? course.uid_user && posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id}/>)
              : userInfo.uid_user === course.uid_user && posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id}/>)
          }
        </div>
        <div className='col-2'>
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>Participantes:</b>
          </label>
          <div className='row'>
            {
              course && users.map((userParticipant, index) => {
                if(course.participants.includes(userParticipant.uid_user)) {
                  return <div className='col-2' key={ userParticipant.uid_user }>
                    <Link to={`/perfil/${userParticipant.uid_user}`} style={{ textDecoration: 'none' }}>
                      <div className='boton-circular-volteado-4'>
                        <img className='icon-user'
                          src={userParticipant.imgName ? userParticipant.imgUrl : user}
                          alt={userParticipant.username} />
                      </div>
                    </Link>
                  </div>
                }
              })
            }
          </div>
        </div>
      </div>
      <Notification/>
    </div>
  )
}

export default CourseView;