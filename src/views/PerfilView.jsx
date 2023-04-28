import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';

import Post from '../components/Post/Post';
import { handleMouseEnter, isPublicationModal } from '../helpers/utils';
import {
  useAddCourse, useBodyScrollLock, useCareerById,
  useCareerList, useCoursesByUser, useCoursesList,
  useFollower, useFollowersList, useHidePostList,
  usePostsByUser, usePostsList, useSavePostList
} from '../hooks';
import { useUserById } from '../hooks/users/userUserById';
import { allPosts, fondo, save, send, user, perfilUsuarioGrande, addTuto } from '../images';
import CourseModal from '../components/modals/CourseModal';
import { alertState } from '../reducers';
import Notification from '../components/notification/Notification';
import UserCard from '../components/user-card/UserCard';
import { store } from '../store';
import { Loader } from '../components/loader/Loader';

const PerfilView = () => {
  const { uid_user } = useParams();
  const location = useLocation();
  const { layout: { loading: globalLoader } } = store.getState();

  const userInfoPerfil = useSelector(state => state.user);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const { value: publicationModal } = useSelector(state => state.publicationModal);
  const dispatch = useDispatch();

  const { mutate: addCourse } = useAddCourse();
  const { mutate: follower } = useFollower(uid_user);

  const [, setIsHoverButton] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    dates: '',
    hours: '',
    site: '',
    career: '',
    imgCourse: '',
    uid_user: userInfoPerfil.uid_user,
  });

  const [, toggle] = useBodyScrollLock();
  const [viewAll, setViewAll] = useState(1);

  const { data: dataUserPerfil = [] } = useUserById(uid_user);
  const [userPerfil, setUserPerfil] = useState(dataUserPerfil);

  const { data: dataCareer, isFetching: fetchingCareer } = useCareerById(userInfoPerfil.career);
  const [userCareer, setUserCareer] = useState(dataCareer);

  const { data: dataPostsList = [] } = usePostsByUser(uid_user);
  const [posts, setPosts] = useState(dataPostsList);

  const { data: dataPosts = [] } = usePostsList();
  const [postsList, setPostsList] = useState(dataPosts);

  const { data: dataCoursesList = [] } = useCoursesByUser(uid_user);
  const [courses, setCourses] = useState(dataCoursesList);

  const { data: dataCoursesInscripto = [] } = useCoursesList();
  const [coursesInscripto, setCoursesInscripto] = useState(dataCoursesInscripto);

  const { data: dataHidePost = [], isFetching: fetchingHidePost } = useHidePostList(userInfoPerfil.uid_user);
  const [hidePost, setHidePost] = useState(dataHidePost);

  const { data: dataSavePost = [], isFetching: fetchingSavePost } = useSavePostList(userInfoPerfil.uid_user);
  const [savePost, setSavePost] = useState(dataSavePost);

  const { data: dataFollowers = [] } = useFollowersList(uid_user);
  const [followers, setFollowers] = useState(dataFollowers);

  const { data: dataCareers = [], isFetching: fetchingCareers } = useCareerList();
  const [career, setCareer] = useState(dataCareers);

  const createCourseHandler = () => {
    isPublicationModal(dispatch, publicationModal);
    toggle();
  }

  const handleChange = (e) => {
    if (e.target) {
      if (e.target.files) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setNewCourse({ ...newCourse, [e.target.name]: e.target.files[0] });
      }
      else {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
      }
    }
    else {
      setNewCourse({ ...newCourse, "career": e.value });
    }
  }

  const followHandle = () => {
    const follow = { 
      uid_user, 
      uid_follower: userInfoPerfil.uid_user,
      active: followers.includes(userInfoPerfil.uid_user),
      action: 'comenzo a seguirte',
      type: 'follower',
      career: userInfoPerfil.career
    }

    follower(follow, {
      onSuccess: () => {
        dispatch(
          alertState({
            isOpen: true,
            message: followers.includes(userInfoPerfil.uid_user) ? 'Dejando de seguir usuario' : 'Comezando a seguir usuario',
            type: "success",
          })
        );
      }
    });
  }

  const handleSubmit = () => {
    addCourse(newCourse, {
      onSuccess: (response) => {
        toggle();
        dispatch(
          alertState({
            isOpen: true,
            message: 'Curso creado con exito',
            type: "success",
          })
        );
        isPublicationModal(dispatch, publicationModal);
      },
      onError: ({ response }) => {
        toggle();
        dispatch(
          alertState({
            isOpen: true,
            message: 'No puede existir ningún campo vacio',
            type: "error",
          })
        );
        isPublicationModal(dispatch, publicationModal);
      }
    });

    setNewCourse({
      title: '',
      description: '',
      dates: '',
      hours: '',
      site: '',
      career: '',
      imgCourse: '',
      uid_user: userInfoPerfil.uid_user,
    });
  };

  useEffect(() => {
    dataUserPerfil && setUserPerfil(dataUserPerfil);
    // eslint-disable-next-line
  }, [dataUserPerfil]);

  useEffect(() => {
    !fetchingCareer && dataCareer && setUserCareer(dataCareer);
    // eslint-disable-next-line
  }, [dataCareer]);

  useEffect(() => {
    dataPostsList && setPosts(dataPostsList);
    // eslint-disable-next-line
  }, [dataPostsList]);

  useEffect(() => {
    dataPosts && setPostsList(dataPosts);
    // eslint-disable-next-line
  }, [dataPosts]);

  useEffect(() => {
    dataCoursesList && setCourses(dataCoursesList);
    // eslint-disable-next-line
  }, [dataCoursesList]);

  useEffect(() => {
    dataCoursesInscripto && setCoursesInscripto(dataCoursesInscripto);
    // eslint-disable-next-line
  }, [dataCoursesInscripto]);

  useEffect(() => {
    !fetchingCareers && dataCareers.length > 0 && setCareer(dataCareers);
    // eslint-disable-next-line
  }, [dataCareers]);

  useEffect(() => {
    !fetchingHidePost && dataHidePost && setHidePost(dataHidePost);
    // eslint-disable-next-line
  }, [dataHidePost]);

  useEffect(() => {
    !fetchingSavePost && dataSavePost && setSavePost(dataSavePost);
    // eslint-disable-next-line
  }, [dataSavePost]);

  useEffect(() => {
    dataFollowers && setFollowers(dataFollowers);
    // eslint-disable-next-line
  }, [dataFollowers]);

  return (
    <div className='principal-body'>
      {
        globalLoader && <Loader/>
      }
      <div style={{ width:'300px',  position:'absolute', top:'580px', left:'90px' }}>
        <span style={{ color:'#000', display:'block' ,textAlign:'center', fontFamily:'sans-serif', fontSize:'23px' }}> 
        <b>{userPerfil.name}</b>
        </span>
        <span style={{display:'block' ,textAlign:'center',fontFamily:'sans-serif', }}>
        Nombre de usuario: {userPerfil.username}
        <br/>
        Carrera: {userCareer ? userCareer.name : globalLoader && 'loading...'}
        </span>
        <br/>
        <span style={{display:'block' ,textAlign:'center',fontFamily:'sans-serif',fontSize:'17px', color:'#FF0096' }}>
        {followers.length} Seguidores
        </span >
      </div>
      <div className='row'>
        <img className="fondo"
          src={userPerfil.imgPortadaUrl ? userPerfil.imgPortadaUrl : fondo}
          alt={'user-portada'} />
        <img className='boton-circular-perfil icon-perfil'
          src={userPerfil.imgUrl ? userPerfil.imgUrl : perfilUsuarioGrande}
          alt={'user-perfil'} />
        <br />
        <label style={{ textAlign: 'left', marginLeft: '23%', fontSize: '120%', fontFamily: 'Segoe UI Emoji' }}>
          
        </label>
      </div>
      <div className='row'>
        <div className='col-2'>
          <br />
          <br />
          {
            userInfoPerfil.uid_user === userPerfil.uid_user
              ?
              <div>
              </div>
              :
              <div>
                <div className='row'>
                  <button className='button-follow' onClick={followHandle}>
                    {
                      followers.includes(userInfoPerfil.uid_user) ? 'Dejar de seguir' : 'Seguir'
                    }
                  </button>
                </div>
                <div className='row'>
                  <button className='button-message'>
                    <Link 
                      to={`${ location.pathname.split('/', 2)[0] }/${userInfoPerfil.uid_user}/to/${uid_user !== userInfoPerfil.uid_user ? uid_user : ''}`}
                      state={{ background: location, prevPath: location.pathname }}
                      className="mensaje-enviar" style={{ textDecoration: 'none' }}>
                      Enviar mensaje
                    </Link>
                  </button>
                </div>
              </div>
          }
        </div>
        <div className='col-7'>
          <br />
          {
            userInfoPerfil.uid_user === userPerfil.uid_user &&

            <div className='wrapper'>
              <div className='windows-options'>
                <div className={`col-1 ${ viewAll === 1 ? 'color-button-view' : '' }`}>
                  <button className='view-button' onClick={() => setViewAll(1)}>
                    <img className='img-allPosts' src={ allPosts } alt="" />
                  </button>
                </div>
                <div className={`col-1 ${ viewAll === 2 ? 'color-button-view' : '' }`}>
                  <button className='view-button' onClick={() => setViewAll(2)}>
                    <img className='img-allPosts' src={ user } alt="" />
                  </button>
                </div>
                <div className={`col-1 ${ viewAll === 3 ? 'color-button-view' : '' }`}>
                  <button className='view-button' onClick={() => setViewAll(3)}>
                    <img className='img-allPosts' src={ save } alt="" />
                  </button>
                </div>
                <div className='col-8'></div>
              </div>
            </div>
          }
          <div>
            {
              userInfoPerfil.uid_user === userPerfil.uid_user && viewAll === 3 ?
                <div>
                  {
                    postsList.map((post, index) => post.visible
                      && savePost.includes(post._id)
                      && <Post post={post} commentModal={commentModal} key={post._id} hide={hidePost.includes(post._id)} save={savePost.includes(post._id)} />)
                  }
                </div>
                : viewAll === 1 || userInfoPerfil.uid_user !== userPerfil.uid_user ?
                <div>
                  {
                    posts.map((post, index) => post.visible
                      && !hidePost.includes(post._id)
                      && <Post post={post} commentModal={commentModal} key={post._id} />)
                  }
                </div>
                : 
                <div className='card-user'>
                  <div className='row'>
                  {
                    followers && userInfoPerfil.uid_user === userPerfil.uid_user && followers.map( (follower, index) => 
                    <UserCard uid_user={ follower } key={index}/>)
                  }
                  </div>
                </div>
              
            }
          </div>
        </div>
        <div className='col-2'>
          <br />
          <br />
          <div className='row'>
            <label style={{ textAlign: 'left', fontSize: '147%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
              <div style={{float:'left'}}>
              <b>
                {userInfoPerfil.uid_user === userPerfil.uid_user ? 'Mis tutorías' : 'Tutorías creadas'}
              </b>
              </div>
              <div className="hoEnButton" style={{float:'left', position:'relative', left:'40px', top:'-10px'}}>
                {
                  userInfoPerfil.uid_user === userPerfil.uid_user
                  && <img className='button-new-course' src={addTuto}
                    alt="new-course"
                    onMouseEnter={() => setIsHoverButton(true)}
                    onMouseLeave={() => setIsHoverButton(false)}
                    onClick={createCourseHandler}
                  />
                }
              </div>
            </label>
          </div>
          {
            courses.map((course, index) =>
              userPerfil.uid_user === course.uid_user &&
                
                <div className='row' key={course._id}>
                  <div className='col-1'>
                    <img className='icon-publications'
                      src={course.imgUrl}
                      alt=''
                    />
                  </div>
                  <div className='col-8'>
                    <Link to={`/course/${course._id}`}
                      state={{ course }}
                      style={{ textDecoration: 'none' }} >{course.title}</Link>
                  </div>
                </div>
                )
          }
          <br />
          <label style={{ textAlign: 'left',fontSize: '147%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
            <b>Tutorías inscritas</b>
          </label>
          {
            coursesInscripto.map((course, index) => {
              const { participants } = course;
              if (participants.includes(uid_user)) {
                return (
                  <div className='row' key={course._id}>
                    <div className='col-1'>
                      <img className='icon-publications'
                        src={course.imgUrl}
                        alt=''
                      />
                    </div>
                    <div className='col-8'>
                      <Link to={`/course/${course._id}`}
                        style={{ textDecoration: 'none' }} >{course.title}</Link>
                    </div>
                  </div>
                )
              }
              else return []
            })
          }
        </div>
      </div>
      <CourseModal active={publicationModal} toggle={isPublicationModal} dispatch={dispatch} toggleLock={toggle}>
        <h2 style={{ textAlign: 'center',fontSize: '147%', fontFamily:'sans-serif', color: '#6b6b6b' }}>Crea tu curso</h2>
        <input className='title-course' type="text" placeholder='Titulo' name='title' value={newCourse.title} onChange={handleChange} />
        <input className='site-course' type="text" name="site" placeholder='Lugar' value={newCourse.site} onChange={handleChange} />
        <br /><br />
        <textarea style={{borderRadius:'20px',marginLeft:'30px', width:'1100px'}} className='inp' placeholder={`¿Que tienes en mente  ${userInfoPerfil.name}?...`} name='description' value={newCourse.description} onChange={handleChange}></textarea>
        <div style={{marginBottom:'70px'}}>
          <div style={{float:'left'}}>
            <input type="text" placeholder='Días' name='dates' value={newCourse.dates} onChange={handleChange} />
          </div>
          <div style={{float:'left'}}>
            <input type="text" placeholder='Horario' name='hours' value={newCourse.hours} onChange={handleChange} />
          </div>
          <div style={{float:'left'}}>
            <Select
              placeholder='carrera'
              name="career"
              options={career}
              onChange={handleChange}
              className="input-course-2" />
          </div>
        </div>
        <br/>
        <div className='upload-course'>
          <div className="upload-btn-wrapper" onChange={handleChange}>
            <button className="boton-standar-rw">
              Carga un archivo
            </button>
            <input className="upload-file-buton" name="imgCourse" type="file" accept="image/*" />
          </div>
        </div>
        <div className='upload-image-course' style={{marginLeft:'30px', width:'1100px'}}>
          <img src={imagePreview ? imagePreview : fondo} alt="img-course" className='image-course' onChange={handleChange} />
        </div>
        <img className='send-course' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
      </CourseModal>
      <Notification />
    </div>
  )
}

export default PerfilView;