import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

import CreatePost from '../components/create-post/CreatePost';
import MenuCourse from '../components/menu-course/MenuCourse';
import CourseModal from '../components/modals/CourseModal';
import Notification from '../components/notification/Notification';
import Post from '../components/Post/Post';
import { handleMouseEnter, isEditPublicationModal } from '../helpers/utils';
import {
  useBodyScrollLock, useCareerList, useCourseById, useDeleteCourse, usePostsByCourse, useRegistrationByUser,
  useRegistrationUser, useUpdateCourse, useUsersList
} from '../hooks';

import { send, user } from '../images';
import { alertState } from '../reducers';
import { Loader } from '../components/loader/Loader';
import { StoreRounded } from '@mui/icons-material';
import { useTheme } from 'styled-components';

const CourseView = () => {
  const { id_Course } = useParams();
  const { layout: { loading: globalLoader } } = StoreRounded.getState();
  const userInfo = useSelector(state => state.user);
  const { value: commentModal } = useSelector(state => state.commentModal);
  const { value: editPublicationModal } = useSelector(state => state.editPublicationModal);
  const dispatch = useDispatch();

  const [, toggle] = useBodyScrollLock();
  const { mutate: updateCourse } = useUpdateCourse();
  const { mutate: deleteCourse } = useDeleteCourse(id_Course);

  const { data: dataCourse = [], isFetching: fetchingCourse, remove } = useCourseById(id_Course);
  const [course, setCourse] = useState(dataCourse);

  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [menu, setMenu] = useState(false);
  const buttonMenuRef = useRef();

  const [imagePreview, setImagePreview] = useState('');
  const [privacidad, ] = useState([
    {
      value: true,
      label: 'Público'
    },
    {
      value: false,
      label: 'Privado'
    }
  ]);
  const [editCourse, setEditCourse] = useState({ id_Course, ...course });

  const { mutate: userRegister } = useRegistrationUser(id_Course, userInfo.uid_user);


  const { data: dataPostsList = [], isFetching: fetchingPostsList } = usePostsByCourse(id_Course);
  const [posts, setPosts] = useState(dataPostsList);

  const { data: dataUsersList = [], isFetching: fetchingUsersList } = useUsersList();
  const [users, setUsers] = useState(dataUsersList);

  const { data: dataUserRegister } = useRegistrationByUser(id_Course, userInfo.uid_user);

  const { data: dataCareers = [], isFetching: fetchingCareers } = useCareerList();
  const [career, setCareer] = useState(dataCareers);

  const createCourseHandler = () => {
    isEditPublicationModal(dispatch, editPublicationModal);
    toggle();
  }

  const handleMenu = () => {
    const x = buttonMenuRef.current.offsetLeft + 15 + 'px';
    setX(x);

    const y = buttonMenuRef.current.offsetTop + 15 + 'px';
    setY(y);

    setMenu(!menu);
  }

  const handleDelete = () => {
    !!menu && setMenu(!menu);
    const courseDelete = { uid_user: course.uid_user, id_Course: course._id };
    remove();
    deleteCourse(courseDelete, {
      onSuccess: (response) => {
        window.location.href = "/home";
      }
    });
  }

  const handleChange = (e) => {
    if (e.target) {
      if (e.target.files) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setEditCourse({ ...editCourse, [e.target.name]: e.target.files[0] });
      }
      else {
        setEditCourse({ ...editCourse, [e.target.name]: e.target.value });
      }
    }
    else {
      e.label === 'Público' || e.label === 'Privado' ?
        setEditCourse({ ...editCourse, "visible": e.value })
        : setEditCourse({ ...editCourse, "career": e.value });
    }
  }

  const handleSubmit = () => {
    updateCourse(editCourse, {
      onSuccess: (response) => {
        toggle();
        dispatch(
          alertState({
            isOpen: true,
            message: 'Curso actualizado',
            type: "success",
          })
        );
        isEditPublicationModal(dispatch, editPublicationModal);
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
        isEditPublicationModal(dispatch, editPublicationModal);
      }
    });
  };

  useEffect(() => {
    !fetchingCourse && dataCourse && setCourse(dataCourse);
    // eslint-disable-next-line
  }, [dataCourse]);

  useEffect(() => {
    !fetchingPostsList && dataPostsList && posts.length > -1 && setPosts(dataPostsList);
    // eslint-disable-next-line
  }, [dataPostsList]);

  useEffect(() => {
    !fetchingUsersList && dataUsersList && users.length > -1 && setUsers(dataUsersList);
    // eslint-disable-next-line
  }, [dataUsersList]);

  useEffect(() => {
    !fetchingCareers && dataCareers.length > 0 && setCareer(dataCareers);
    // eslint-disable-next-line
  }, [dataCareers]);

  useEffect(() => {
    course && setEditCourse({ id_Course, ...course });
    // eslint-disable-next-line
  }, [course]);

  const handleRegister = () => {
    const register = { 
      id_Course, 
      uid_user: userInfo.uid_user,
      action: 'se unio a tu tutoria',
      uid_creator: course.uid_user,
      career: course.career,
      type: 'inscription',
      dataUserRegister
    }
    
    userRegister(register, {
      onSuccess: (response) => {
        console.log(response);
      }
    });
  }
  const theme = useTheme();
  const customStyles = {
    singleValue: (base, state) => ({
      ...base,
      color: theme.userName,
    }),
    option: (base, state) => ({
      ...base,
      background: state.isFocused ? '#ededed' : '',
    }),
    control: (base, state) => ({
      ...base,
      
      background:theme.header,
      height: '50px',
      // match with the menu
      marginTop:'5px',
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
    menu: (base) => ({
      ...base,
      
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0
    })
  }


  return (
    <div className='principal-body'>
      {
        globalLoader && <Loader/>
      }
      <div className='row'>
        <img className="fondo"
          src={course.imgUrl}
          alt={'user-portada'} />
        <label style={{ textAlign: 'left', marginTop: '5%', marginLeft: '27%', fontSize: '300%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
          {course.title}
        </label>
        <br />
        <div className='row'>
          <div className='col-7'></div>
          <div className='col-2' style={{ marginLeft: '3%' }}>
            {
              userInfo.uid_user !== course.uid_user &&
              <button className={`${dataUserRegister ? 'button-left' : 'button-join'}`} onClick={handleRegister}>
                {dataUserRegister ? 'Salirse' : 'Unirse'}
              </button>
            }
            {
              userInfo.uid_user === course.uid_user &&
              <div>
                <button className='button-join' onClick={createCourseHandler}>Editar</button>
                <button className='button-option-course' ref={buttonMenuRef} onClick={handleMenu}>{'>'}</button>
                <MenuCourse x={x} y={y} showMenu={menu} handleDelete={handleDelete}/>
              </div>
            }
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          <label style={{ textAlign: 'left', marginLeft: '1%', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
            <b>Información</b>
          </label>
          <br />
          <b>Descripción:</b> {course.description} <br />
          <b>Días:</b> {course.dates} <br />
          <b>Horario:</b> {course.hours} <br />
          <b>Lugar:</b> {course.site} <br />
          <b>Privacidad del curso:</b> {course.visible ? 'Público' : 'Privado'} <br />
        </div>
        <div className='col-7'>
          {
            dataUserRegister ? <CreatePost isDisabled={true} value={course.career}/> : userInfo.uid_user === course.uid_user && <CreatePost  isDisabled={true} value={course.career}/>
          }
          {
            course.visible
              ? posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id} />)
              : dataUserRegister
                ? course.uid_user && posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id} />)
                : userInfo.uid_user === course.uid_user && posts.map((post, index) => <Post post={post} commentModal={commentModal} key={post._id} />)
          }
        </div>
        <div className='col-2'>
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>
            <b>Participantes</b>
          </label>
          <div className='row'>
            {
              course && users.map((userParticipant, index) => {
                if ( course && course.participants && course.participants.includes(userParticipant.uid_user)) {
                  return <div className='col-2' key={userParticipant.uid_user}>
                    <Link to={`/perfil/${userParticipant.uid_user}`} style={{ textDecoration: 'none' }}>
                      <div className='boton-circular-volteado-4'>
                        <img className='icon-user'
                          src={userParticipant.imgName ? userParticipant.imgUrl : user}
                          alt={userParticipant.username} />
                      </div>
                    </Link>
                  </div>
                }
                else return []
              })
            }
          </div>
        </div>
      </div>

      <CourseModal active={editPublicationModal} toggle={isEditPublicationModal} dispatch={dispatch} toggleLock={toggle}>
        <h2 style={{ textAlign: 'center', fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>Editar curso</h2>
        <input className='title-course-3' type="text" placeholder='Titulo' name='title' value={editCourse.title} onChange={handleChange} />
        <input className='site-course' type="text" name="site" placeholder='Lugar' value={editCourse.site} onChange={handleChange} />
        <Select 
        styles={customStyles}
        className='visible-course'
          defaultValue={privacidad[privacidad.findIndex(pri => pri.value === course.visible)]}
          placeholder='Privacidad'
          name='visible'
          options={privacidad}
          onChange={handleChange}
        />
        <textarea className='inp' style={{borderRadius:'20px', width:'1200px', marginLeft:'20px'}} placeholder={`¿Que tienes en mente  ${userInfo.name}?...`} name='description' value={editCourse.description} onChange={handleChange}></textarea>
        <div className='row'>
          <div className='col-4'>
            <input type="text" placeholder='Días' name='dates' value={editCourse.dates} onChange={handleChange} />
          </div>
          <div className='col-4'>
            <input type="text" placeholder='Horario' name='hours' value={editCourse.hours} onChange={handleChange} />
          </div>
          <div className='col-2'>
            <Select
            styles={customStyles}
              defaultValue={career[career.findIndex(career => career.value === course.career)]}
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
          <img src={imagePreview ? imagePreview : course.imgUrl} alt="img-course" className='image-course' onChange={handleChange} />
        </div>
        <img className='send-course' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
      </CourseModal>

      <Notification />
    </div>
  )
}

export default CourseView;