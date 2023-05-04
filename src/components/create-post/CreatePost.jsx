import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

import { fondo, fondo2, fondo2B, fondo2C, fondoD, send, user } from '../../images';
import { handleMouseEnter, isPublicationModal } from '../../helpers/utils';
import PublicationModal from '../modals/PublicationModal';
import { useAddPost, useBodyScrollLock, useCareerList } from '../../hooks';
import { alertState } from '../../reducers';
import Notification from '../notification/Notification';
import { useTheme } from 'styled-components';

const CreatePost = ({ isDisabled = false, value = '' }) => {
  const theme = useTheme();
  const [isHover, setIsHover] = useState(false);

   const handleMouseEnter = () => {
      setIsHover(true);
   };
   const handleMouseLeave = () => {
      setIsHover(false);
   };

   const boxStyle = {
     backgroundColor: isHover ? theme.commentsHover : theme.comments,
     transition: 'all 0.10s ease',
     color: theme.userName
   };
  
  const userInfo = useSelector(state => state.user);
  const { id_Course } = useParams();
  const [, toggle] = useBodyScrollLock();
  const { mutate: addPost } = useAddPost(id_Course);

  const { value: publicationModal } = useSelector(state => state.publicationModal);
  const dispatch = useDispatch();

  const { data: dataCareersList = [], isFetching: fetchingCareersList } = useCareerList();
  const [careerList, setCareerList] = useState(dataCareersList);

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    imgPost: '',
    id_Course: id_Course ? id_Course : '',
    uid_user: userInfo.uid_user,
    career: isDisabled ? value : ''
  });

  const [imagePreview, setImagePreview] = useState('');

  const openModalHandler = () => {
    isPublicationModal(dispatch, publicationModal);
    toggle();
  }

  const handleChange = (e) => {
    if(e.target) {
      if (e.target.files) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setNewPost({ ...newPost, [e.target.name]: e.target.files[0] });
      }
      else {
        setNewPost({ ...newPost, [e.target.name]: e.target.value });
      }
    }
    else {
      setNewPost({ ...newPost, 'career': e.value });
    }
  };

  const handleSubmit = () => {
    const post = {
      ...newPost,
      action: 'realizo una nueva publicación en tu tutoria',
      type: 'course'
    }
    addPost(post, {
      onSuccess: (response) => {
        toggle();
        dispatch(
          alertState({
            isOpen: true,
            message: 'Post creado con exito',
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

    setImagePreview('');
    setNewPost({
      title: '',
      description: '',
      imgPost: '',
      id_Course: id_Course ? id_Course : '',
      uid_user: userInfo.uid_user,
    });
  };

  useEffect(() => {
    !fetchingCareersList && dataCareersList.length > 0 && setCareerList(dataCareersList);
    // eslint-disable-next-line
  }, [dataCareersList]);
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
      
      background:theme.header, position:'relative', top:'-6rem', width:'17rem',
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
  const userInfoPerfil = useSelector(state => state.user);

  return (
    <div>
        <div style={{background:theme.header, boxShadow:theme.boxShadow}} className='windows parent'>
          <div className='col-3'>
            <Link to={`/perfil/${userInfo.uid_user}`} style={{ textDecoration: 'none' }}>
              <div className='boton-circular-volteado-4'>
                <img className='icon-user'
                  src={userInfo.imgName ? userInfo.imgUrl : user}
                  alt={userInfo.username} />
              </div>
            </Link>
          </div>
          <div className='col-9'>
            <button className='search-input-2'  style={boxStyle} 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
              onClick={openModalHandler} >
              ¿Que tienes en mente?...
            </button>
          </div>
        </div>

      <PublicationModal active={publicationModal} toggle={isPublicationModal} dispatch={dispatch} toggleLock={toggle}>
        <h2 style={{ textAlign: 'center',fontSize: '150%', fontFamily:'sans-serif', color:theme.userName }}>Crear publicacion</h2>
        <div className='row'>
          <div className='icon-name-nn'>
          <img className='icon-user-nn-2'
                  src={userInfoPerfil.imgName ? userInfoPerfil.imgUrl : user}
                  alt={userInfoPerfil.username} />
            <h4 style={{color:theme.userName, position:'relative', top:'-70px', paddingLeft: '70px', fontSize: '18px'}}>
              {userInfoPerfil.name}
            </h4>
            
          </div>
          <textarea className='inp' style={{fontSize: '16px', border:'none' ,position:'relative', top:'-60px', paddingLeft:'10px', paddingTop:'10px', background:theme.header, color: theme.userName}} placeholder={`¿Que tienes en mente,  ${userInfo.name}?`} name='description' value={newPost.description} onChange={handleChange}></textarea>
          <div style={{backgroundColor:theme.linea, top:'-4rem'}} className='linea-acostada-cursoN' />
        </div>
        <div className='row'>
          <div className='col-6'>
            <input style={{border:'none',background: theme.header, color: theme.userName, position:'relative',left:'-3rem', top:'-5.5rem', width:'20rem'}} className='title-post' type="text" placeholder='Titulo' name='title' value={newPost.title} onChange={handleChange} />
          </div>
          <br/>
          <div className='col-4'>
            <Select 
              styles={customStyles}
              className='select-career' 
              placeholder='carrera'
              name="career"
              isDisabled={isDisabled}
              options={careerList}
              defaultValue={isDisabled ? careerList[ careerList.findIndex(career => career.value === value) ] : ''}
              onChange={handleChange}/>
          </div>
        </div>
        <div style={{backgroundColor:theme.linea, top:'-6.5rem'}} className='linea-acostada-cursoN' />
        <br />
        <div className='upload-image-post-n'>
          <img src={imagePreview ? imagePreview : theme.status === 'dark' ? fondo2B :fondo2C} alt="" className='image-post' onChange={handleChange} />
        </div>
        
        <div className='upload-course2'>
          <div className="upload-btn-wrapper3-n" onChange={handleChange}>
            <button  className="boton-standar-rw2-n">
              Carga un archivo
            </button>
            <input className="upload-file-buton" name="imgPost" type="file" accept="image/*" />
          </div>
        </div>
        
        <img className='send-post2' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
      </PublicationModal>
      <Notification />
    </div>
  )
}

export default CreatePost;