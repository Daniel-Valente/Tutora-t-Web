import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

import Post from '../components/Post/Post';
import { handleMouseEnter, isPublicationModal } from '../helpers/utils';
import { useAddCourse, useBodyScrollLock, useCareerById, 
  useCareerList, useCoursesByUser, useCoursesList, 
  useFollower, useFollowersList, useHidePostList, 
  usePostsByUser, usePostsList, useSavePostList } from '../hooks';
import { useUserById } from '../hooks/users/userUserById';
import { fondo, newButtton, newFocus, send, user } from '../images';
import CourseModal from '../components/modals/CourseModal';
import { alertState } from '../reducers';
import Notification from '../components/notification/Notification';

const PerfilView = () => {

  const { uid_user } = useParams();
  const userInfoPerfil = useSelector(state => state.user);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const { value: publicationModal } = useSelector(state => state.publicationModal);
  const dispatch = useDispatch();

  const { mutate: addCourse } = useAddCourse();
  const { mutate: follower } = useFollower(uid_user);

  const [isHoverButton, setIsHoverButton] = useState(false);
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
  const [ viewAll, setViewAll ] = useState(true);

  const { data: dataUserPerfil = [], isLoading: lodingUserPerfil } = useUserById(uid_user);
  const [userPerfil, setUserPerfil] = useState(dataUserPerfil);

  const { data: dataCareer, isFetching: fetchingCareer, isLoading: loadingCareer } = useCareerById(userInfoPerfil.career);
  const [userCareer, setUserCareer] = useState(dataCareer);

  const { data: dataPostsList = [], isLoading: loadingPostsList } = usePostsByUser(uid_user);
  const [posts, setPosts] = useState(dataPostsList);
  
  const { data: dataPosts = [], isLoading: loadingPosts } = usePostsList();
  const [postsList, setPostsList] = useState(dataPosts);

  const { data: dataCoursesList = [], isFetching: fetchingCoursesList, isLoading: loadingCourses } = useCoursesByUser(uid_user);
  const [courses, setCourses] = useState(dataCoursesList);

  const { data: dataCoursesInscripto = [], isFetching: fetchingCoursesInscripto, isLoading: loadingCoursesInscripto } = useCoursesList();
  const [coursesInscripto, setCoursesInscripto] = useState(dataCoursesInscripto);

  const { data: dataHidePost = [], isFetching: fetchingHidePost, isLoading: loadingHidePost } = useHidePostList( userInfoPerfil.uid_user );
  const [ hidePost, setHidePost ] = useState(dataHidePost);

  const { data: dataSavePost = [], isFetching: fetchingSavePost, isLoading: loadingSavePost } = useSavePostList( userInfoPerfil.uid_user );
  const [ savePost, setSavePost ] = useState(dataSavePost);
  
  const { data: dataFollowers = [], isFetching: fetchingFollowers, isLoading: loadingFollowers } = useFollowersList( uid_user );
  const [ followers, setFollowers ] = useState(dataFollowers);

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
      console.log(e.value);
      setNewCourse({ ...newCourse, ["career"]: e.value });
    }
  }

  const followHandle = () => {
    follower({ uid_user, uid_follower: userInfoPerfil.uid_user }, {
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
    setUserPerfil(dataUserPerfil);
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
    !fetchingCoursesList && dataCoursesList && setCourses(dataCoursesList);
    // eslint-disable-next-line
  }, [dataCoursesList]);

  useEffect(() => {
    !fetchingCoursesInscripto && dataCoursesInscripto && setCoursesInscripto(dataCoursesInscripto);
    // eslint-disable-next-line
  }, [dataCoursesInscripto]);

  useEffect(() => {
    !fetchingCareers && dataCareers.length > 0 && setCareer(dataCareers);
    // eslint-disable-next-line
  }, [dataCareers]);

  useEffect(() => {
    !fetchingHidePost && dataHidePost && setHidePost(dataHidePost);
    // eslint-disable-next-line
  }, [ dataHidePost ]);
  
  useEffect(() => {
    !fetchingSavePost && dataSavePost && setSavePost(dataSavePost);
    // eslint-disable-next-line
  }, [ dataSavePost ]);
  
  useEffect(() => {
    !fetchingFollowers && setFollowers(dataFollowers);
    // eslint-disable-next-line
  }, [ dataFollowers ]);


  if (lodingUserPerfil || loadingPostsList 
      || loadingCareer || loadingCourses 
      || loadingCoursesInscripto || loadingHidePost
      || loadingFollowers || loadingPosts) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className='principal-body'>
      <div className='row'>
        <img className="fondo"
          src={userPerfil.imgPortadaUrl ? userPerfil.imgPortadaUrl : fondo}
          alt={'user-portada'} />
        <img className='boton-circular-perfil icon-perfil'
          src={userPerfil.imgUrl ? userPerfil.imgUrl : user}
          alt={'user-perfil'} />
        <label style={{ textAlign: 'left', marginTop: '5%', fontWeight: 'bold', marginLeft: '27%', fontSize: '300%', fontFamily: 'Segoe UI Emoji' }}>
          {userPerfil.name}
        </label>
        <br />
        <label style={{ textAlign: 'left', marginLeft: '27%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
          <b>Nombre de usuario: </b>{userPerfil.username}
        </label>
        <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
          <b>Carrera: </b>{userCareer ? userCareer.name : loadingCareer && 'loading...'}
        </label>
        <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '120%', fontFamily: 'Segoe UI Emoji' }}>
          <b>Seguidores: </b> { followers.length }
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
                <button className='button-follow' onClick={ followHandle }>
                {
                  followers.includes(userInfoPerfil.uid_user) ? 'Dejar de seguir' : 'Seguir'
                }
                </button>
                <button className='button-message'>
                  Enviar mensaje
                </button>
              </div>
          }
        </div>
        <div className='col-7'>
          <br />
          {
             userInfoPerfil.uid_user === userPerfil.uid_user &&
            <div>
              <button onClick={ () => setViewAll(true) }>todos</button>
              <button onClick={ () => setViewAll(false) }>Guardados</button>
            </div>
          }
          <div>
            {
              userInfoPerfil.uid_user === userPerfil.uid_user && !viewAll ?
              <div>
                {
                  postsList.map((post, index) => post.visible 
                  && savePost.includes(post._id) 
                  && <Post post={post} commentModal={commentModal} key={post._id} hide={hidePost.includes(post._id)} save={ savePost.includes(post._id) }/>)
                }
              </div>
              :
              <div>
                {
                  posts.map((post, index) => post.visible 
                  && !hidePost.includes(post._id) 
                  && <Post post={post} commentModal={commentModal} key={post._id} />)
                }
              </div>
            }
          </div>
        </div>
        <div className='col-2'>
          <br />
          <br />
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>
              {userInfoPerfil.uid_user === userPerfil.uid_user ? 'Mis cursos' : 'Cursos creados'}
            </b>
            <div className='parent'>
              {
                userInfoPerfil.uid_user === userPerfil.uid_user
                && <img className='button-new-course' src={isHoverButton ? newFocus : newButtton}
                  alt="new-course"
                  onMouseEnter={() => setIsHoverButton(true)}
                  onMouseLeave={() => setIsHoverButton(false)}
                  onClick={createCourseHandler}
                />
              }
            </div>
          </label>
          {
            courses.map((course, index) => {
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
                      state={{ course }}
                      style={{ textDecoration: 'none' }} >{course.title}</Link>
                  </div>
                </div>
              )
            })
          }
          <br />
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>Cursos inscrito</b>
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
            })
          }
        </div>
      </div>
      <CourseModal active={publicationModal} toggle={isPublicationModal} dispatch={dispatch} toggleLock={toggle}>
        <h2 style={{ textAlign: 'center' }}>Crear curso</h2>
        <input className='title-course' type="text" placeholder='Titulo' name='title' value={newCourse.title} onChange={handleChange} />
        <input className='site-course' type="text" name="site" placeholder='Lugar' value={newCourse.site} onChange={handleChange} />
        <br /><br />
        <textarea className='inp' placeholder={`¿Que tienes en mente  ${userInfoPerfil.name}?...`} name='description' value={newCourse.description} onChange={handleChange}></textarea>
        <div className='row'>
          <div className='col-4'>
            <input type="text" placeholder='Días' name='dates' value={newCourse.dates} onChange={handleChange} />
          </div>
          <div className='col-4'>
            <input type="text" placeholder='Horario' name='hours' value={newCourse.hours} onChange={handleChange} />
          </div>
          <div className='col-2'>
            <Select
              placeholder='carrera'
              name="career"
              options={career}
              onChange={handleChange}
              className="input-course" />
          </div>
        </div>
        <div className='upload-course'>
          <div className="upload-btn-wrapper" onChange={handleChange}>
            <button className="boton-standar-rw">
              Carga un archivo
            </button>
            <input className="upload-file-buton" name="imgCourse" type="file" accept="image/*" />
          </div>
        </div>
        <div className='upload-image-course'>
          <img src={imagePreview ? imagePreview : fondo} alt="img-course" className='image-course' onChange={handleChange} />
        </div>
        <img className='send-course' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
      </CourseModal>
      <Notification />
    </div>
  )
}

export default PerfilView;