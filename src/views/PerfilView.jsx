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
import { allPosts, fondo,fondo2Claro, fondo2, save, send, user, perfilUsuarioGrande, addTuto, fondoD } from '../images';
import CourseModal from '../components/modals/CourseModal';
import { alertState } from '../reducers';
import Notification from '../components/notification/Notification';
import UserCard from '../components/user-card/UserCard';
import { useTheme } from 'styled-components';
import { store } from '../store';
import { Loader } from '../components/loader/Loader';

const PerfilView = () => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const boxStyle = {
    filter: isHover ? theme.iconsCircular : theme.iconCircularNormal,
    transition: 'all 0.10s ease',
  };
  const [isHover2, setIsHover2] = useState(false);

  const handleMouseEnter2 = () => {
    setIsHover2(true);
  };
  const handleMouseLeave2 = () => {
    setIsHover2(false);
  };

  const boxStyle2 = {
    filter: isHover2 ? theme.iconsCircular : theme.iconCircularNormal,
    transition: 'all 0.10s ease',
  };
  const [isHover3, setIsHover3] = useState(false);

  const handleMouseEnter3 = () => {
    setIsHover3(true);
  };
  const handleMouseLeave3 = () => {
    setIsHover3(false);
  };

  const boxStyle3 = {
    filter: isHover3 ? theme.iconsCircular : theme.iconCircularNormal,
    transition: 'all 0.10s ease',
  };


  const [isHoverL, setIsHoverL] = useState(false);

  const handleMouseEnterL = () => {
    setIsHoverL(true);
  };
  const handleMouseLeaveL = () => {
    setIsHoverL(false);
  };

  const boxStyleL = {
    color: isHoverL ? theme.linkHover : theme.linkColor,
    textDecoration: 'none',
    transition: 'all 0.10s ease',
  };

  const [isHoverL2, setIsHoverL2] = useState(false);

  const handleMouseEnterL2 = () => {
    setIsHoverL2(true);
  };
  const handleMouseLeaveL2 = () => {
    setIsHoverL2(false);
  };

  const boxStyleL2 = {
    color: isHoverL2 ? theme.linkHover : theme.linkColor,
    textDecoration: 'none',
    transition: 'all 0.10s ease',
  };
  const [isHoverBR, setIsHoverBR] = useState(false);

   const handleMouseEnterBR = () => {
      setIsHoverBR(true);
   };
   const handleMouseLeaveBR = () => {
      setIsHoverBR(false);
   };

   const boxStyleBR = {
     backgroundColor: isHoverBR ? theme.linkColor : theme.background,
     color: isHoverBR ? '#fff' : '#2bc6ff',
     transition: 'all 0.10s ease',
   };
   const [isHoverBE, setIsHoverBE] = useState(false);

   const handleMouseEnterBE = () => {
      setIsHoverBE(true);
   };
   const handleMouseLeaveBE = () => {
      setIsHoverBE(false);
   };

   const boxStyleBE = {
     backgroundColor: isHoverBE ? theme.rosaHover : theme.background,
     transition: 'all 0.10s ease',
   };
   const boxStyleBE2 = {
    color:   isHoverBE ? '#fff' : 'pink',
    transition: 'all 0.10s ease',
    textDecoration:'none'
  };
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

  const { data: dataUserPerfil = [], isFetching: fetchingUserPerfil, isLoading: lodingUserPerfil } = useUserById(uid_user);
  const [userPerfil, setUserPerfil] = useState(dataUserPerfil);

  const { data: dataCareer, isFetching: fetchingCareer, isLoading: loadingCareer } = useCareerById(userPerfil.career);
  const [userCareer, setUserCareer] = useState(dataCareer);

  const { data: dataPostsList = [], isLoading: loadingPostsList } = usePostsByUser(uid_user);
  const [posts, setPosts] = useState(dataPostsList);

  const { data: dataPosts = [], isLoading: loadingPosts } = usePostsList();
  const [postsList, setPostsList] = useState(dataPosts);

  const { data: dataCoursesList = [], isLoading: loadingCourses } = useCoursesByUser(uid_user);
  const [courses, setCourses] = useState(dataCoursesList);

  const { data: dataCoursesInscripto = [], isLoading: loadingCoursesInscripto } = useCoursesList();
  const [coursesInscripto, setCoursesInscripto] = useState(dataCoursesInscripto);

  const { data: dataHidePost = [], isFetching: fetchingHidePost, isLoading: loadingHidePost } = useHidePostList(userPerfil.uid_user);
  const [hidePost, setHidePost] = useState(dataHidePost);

  const { data: dataSavePost = [], isFetching: fetchingSavePost } = useSavePostList(userPerfil.uid_user);
  const [savePost, setSavePost] = useState(dataSavePost);

  const { data: dataFollowers = [], isLoading: loadingFollowers } = useFollowersList(uid_user);
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
  const customStyles = {
    singleValue: (base, state) => ({
      ...base,
      color: state.isFocused ? '#000' : theme.userName,
    }),
    option: (base, state) => ({
      ...base,
      color: state.isFocused ? '#000' : theme.userName, 
      background: state.isFocused ? '#ededed' : '',
    }),
    control: (base, state) => ({
      ...base,
      
      background:theme.header, position:'relative', top:'-7rem', width:'17rem',
      border:'none',
      height: '50px',
      color: state.isFocused ? '#000' : theme.userName,
      // match with the menu
      left: '1.5rem',
      paddingLeft:'1.5rem',
      borderRadius:  "10px",
      
      // Overwrittes the different states of border
      borderColor: state.isFocused ?  theme.userName : theme.userName,
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? theme.userName : theme.userName
      }
    }),
    menu: (base,state) => ({
      ...base,
      
      // override border radius to match the box
      borderRadius: 0,
      color: state.isFocused ? '#000' : theme.userName,
      // kill the gap
      marginTop: 0,
      height:'0px',
    }),
    menuList: (base,state) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      color: state.isFocused ? '#000' : theme.userName,
      borderRadius:'5px',
      width:'17rem',
      height:'14rem',
      background:theme.header,
      position:'relative',
      top:'-7rem'
    })
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

  if (lodingUserPerfil || loadingPostsList
    || loadingCareer || loadingCourses
    || loadingCoursesInscripto || loadingHidePost
    || loadingFollowers || loadingPosts) {
    return (
      <div className='spinner-container'>
        <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  }

  return (
    <div className='principal-body'>
      <div style={{ width: '300px', position: 'absolute', top: '580px', left: '90px' }}>
        <span style={{ color: '#000', display: 'block', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '23px' }}>
          <b style={{ color: theme.userName }}>{userPerfil.name}</b>
        </span>
        <span style={{ color: theme.userName2, display: 'block', textAlign: 'center', fontFamily: 'sans-serif', }}>
          Nombre de usuario: {userPerfil.username}
          <br />
          Carrera: {userCareer ? userCareer.name : globalLoader && 'loading...'}
        </span>
        <br />
        <span style={{ display: 'block', textAlign: 'center', fontFamily: 'sans-serif', fontSize: '17px', color: '#FF0096' }}>
          {followers.length} Seguidores
        </span >
      </div>
      <div className='row'>
        <img className="fondo"
          src={userPerfil.imgPortadaUrl ? userPerfil.imgPortadaUrl : theme.status === 'dark' ? fondo2Claro : fondo}
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
                  <button onMouseEnter={handleMouseEnterBR}
            onMouseLeave={handleMouseLeaveBR} style={boxStyleBR} className='button-follow' onClick={followHandle}>
                    {
                      followers.includes(userInfoPerfil.uid_user) ? 'Dejar de seguir' : 'Seguir'
                    }
                  </button>
                </div>
                <div className='row'>
                  <button onMouseEnter={handleMouseEnterBE}
            onMouseLeave={handleMouseLeaveBE} style={boxStyleBE} className='button-message'>
                    <Link
                      to={`${location.pathname.split('/', 2)[0]}/${userInfoPerfil.uid_user}/to/${uid_user !== userInfoPerfil.uid_user ? uid_user : ''}`}
                      state={{ background: location, prevPath: location.pathname }}
                      className="mensaje-enviar" style={boxStyleBE2}>
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

            <div>
              <div style={{ backgroundColor: theme.header, boxShadow: theme.boxShadow }} className='windows-options'>
                <div className={`col-1 ${viewAll === 1 ? 'color-button-view' : ''}`}>
                  <button className='view-button' onClick={() => setViewAll(1)}>
                    <img style={boxStyle} onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave} className='img-allPosts' src={allPosts} alt="" />
                  </button>
                </div>
                <div className={`col-1 ${viewAll === 2 ? 'color-button-view' : ''}`}>
                  <button className='view-button' onClick={() => setViewAll(2)}>
                    <img style={boxStyle2} onMouseEnter={handleMouseEnter2}
                      onMouseLeave={handleMouseLeave2} className='img-allPosts' src={user} alt="" />
                  </button>
                </div>
                <div className={`col-1 ${viewAll === 3 ? 'color-button-view' : ''}`}>
                  <button className='view-button' onClick={() => setViewAll(3)}>
                    <img style={boxStyle3} onMouseEnter={handleMouseEnter3}
                      onMouseLeave={handleMouseLeave3} className='img-allPosts' src={save} alt="" />
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
                        followers && userInfoPerfil.uid_user === userPerfil.uid_user && followers.map((follower, index) =>
                          <UserCard uid_user={follower} key={index} />)
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
            <label style={{ textAlign: 'left', fontSize: '147%', fontFamily: 'sans-serif', color: '#6b6b6b' }}>
              <div style={{ float: 'left' }}>
                <b style={{ color: theme.subTitles }}>
                  {userInfoPerfil.uid_user === userPerfil.uid_user ? 'Mis tutorías' : 'Tutorías creadas'}
                </b>
              </div>
              <div className="hoEnButton" style={{ float: 'left', position: 'relative', left: '40px', top: '-10px' }}>
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
                    style={boxStyleL} onMouseEnter={handleMouseEnterL}
                    onMouseLeave={handleMouseLeaveL} >{course.title}</Link>
                </div>
              </div>
            )
          }
          <br />
          <label style={{ textAlign: 'left', fontSize: '147%', fontFamily: 'sans-serif' }}>
            <b style={{ color: theme.subTitles }}>Tutorías inscritas</b>
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
                      <Link style={boxStyleL2} onMouseEnter={handleMouseEnterL2}
                        onMouseLeave={handleMouseLeaveL2} to={`/course/${course._id}`} >{course.title}</Link>
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
        <h2 style={{ textAlign: 'center', fontSize: '147%', fontFamily: 'sans-serif', color: theme.userName }}>Crea un nuevo curso</h2>
        <div style={{display: 'flex', alignItems:'flex-end'}}>
        <div className='upload-image-course-2' style={{ width: '500px' }}>
                    <img src={imagePreview ? imagePreview :  theme.status === 'dark' ? fondoD : fondo2} alt="img-course" className='image-course' onChange={handleChange} />
                  </div>
                <div style={{float:'left'}}>
                  <div className='upload-course2'>
                    <div className="upload-btn-wrapper2" onChange={handleChange}>
                      <button className="boton-standar-rw2">
                        Carga un archivo
                      </button>
                      <input style={{background:'red'}} className="upload-file-buton" name="imgCourse" type="file" accept="image/*" />
                    </div>
                  </div>
                  
                </div>
                <div style={{float:'left'}}>
                <div style={{backgroundColor:theme.linea}} className='linea-acostada-cursoN2' />
                    <div className='icon-name-nn'>
                    <img className='icon-user-nn'
                            src={userInfoPerfil.imgName ? userInfoPerfil.imgUrl : user}
                            alt={userInfoPerfil.username} />
                      <h4 style={{color:theme.userName, position:'relative', left: '20px', top:'-2rem', paddingLeft: '60px', fontSize: '18px'}}>
                        {userInfoPerfil.name}
                      </h4>
                      
                    </div>
                    <div style={{backgroundColor:theme.linea}} className='linea-acostada-cursoN' />
                    <textarea className='inp' style={{fontSize: '16px', marginLeft: '30px', border:'none', width: '300px' ,position:'relative', top:'-2rem', paddingTop:'10px', background:theme.header, color: theme.userName}} placeholder={`¿Que tienes en mente,  ${userInfoPerfil.name}?`} name='description' value={newCourse.description} onChange={handleChange}></textarea>
                    <br/>
                    <input style={{ border:'none',background: theme.header, color: theme.userName, position:'relative', top:'-2.7rem', width:'15rem' }} className='title-course2' type="text" placeholder='Titulo' name='title' value={newCourse.title} onChange={handleChange} />
                    <br/>
                    <div style={{backgroundColor:theme.linea, top:'-3rem'}} className='linea-acostada-cursoN' />
                    <input style={{ border:'none',background: theme.header, color: theme.userName, position:'relative', top:'-4rem', width:'15rem' }} className='site-course2' type="text" name="site" placeholder='Lugar' value={newCourse.site} onChange={handleChange} />
                    <br/>
                    <div style={{backgroundColor:theme.linea, top:'-4rem'}} className='linea-acostada-cursoN' />
                    <div style={{ marginBottom: '70px' }}>
                    <input style={{border:'none', background: theme.header, color: theme.userName, position:'relative', top:'-5rem', width:'15rem' }} type="text" placeholder='Días' name='dates' value={newCourse.dates} onChange={handleChange} />
                    <br/>
                    <div style={{backgroundColor:theme.linea, top:'-5.2rem'}} className='linea-acostada-cursoN' />
                    <input style={{ border:'none', background: theme.header, color: theme.userName, position:'relative', top:'-6.1rem', width:'15rem' }} type="text" placeholder='Horario' name='hours' value={newCourse.hours} onChange={handleChange} />
                    <br/>
                    <div style={{backgroundColor:theme.linea, top:'-6.2rem'}} className='linea-acostada-cursoN' />
                     <Select
                          styles={customStyles}
                          placeholder='carrera'
                          name="career"
                          options={career}
                          onChange={handleChange}
                          className="input-course-2" />
                    <div style={{backgroundColor:theme.linea, top:'-7.2rem'}} className='linea-acostada-cursoN' />
 
                    </div>
                </div>
        </div>
        <img className='send-course2' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
      </CourseModal>
      <Notification />
    </div>
  )
}

export default PerfilView;