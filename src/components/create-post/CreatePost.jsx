import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

import { fondo, send, user } from '../../images';
import { handleMouseEnter, isPublicationModal } from '../../helpers/utils';
import PublicationModal from '../modals/PublicationModal';
import { useAddPost, useBodyScrollLock, useCareerList } from '../../hooks';
import { alertState } from '../../reducers';
import Notification from '../notification/Notification';

const CreatePost = ({ isDisabled = false, value = '' }) => {
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

  return (
    <div>
      <div className='wrapper'>
        <div className='windows parent'>
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
            <button className='search-input-2'
              onClick={openModalHandler} >
              ¿Que tienes en mente?...
            </button>
          </div>
        </div>
      </div>

      <PublicationModal active={publicationModal} toggle={isPublicationModal} dispatch={dispatch} toggleLock={toggle}>
        <h2 style={{ textAlign: 'center',fontSize: '150%', fontFamily:'sans-serif', color: '#6b6b6b' }}>Crear publicacion</h2>
        <div className='row'>
          <div className='col-6'>
            <input className='title-post' type="text" placeholder='Titulo' name='title' value={newPost.title} onChange={handleChange} />
          </div>
          <div className='col-4'>
            <Select 
              className='select-career' 
              placeholder='carrera'
              name="career"
              isDisabled={isDisabled}
              options={careerList}
              defaultValue={isDisabled ? careerList[ careerList.findIndex(career => career.value === value) ] : ''}
              onChange={handleChange}/>
          </div>
        </div>
        <br />
        <textarea  className='inp' style={{borderRadius:'20px'}} placeholder={`¿Que tienes en mente  ${userInfo.name}?...`} name='description' value={newPost.description} onChange={handleChange}></textarea>
        <div className='upload-post'>
          <div className="upload-btn-wrapper" onChange={handleChange}>
            <button style={{backgroundColor:'pink'}} className="boton-standar-rw">
              Carga un archivo
            </button>
            <input className="upload-file-buton" name="imgPost" type="file" accept="image/*" />
          </div>
        </div>
        <div className='upload-image-post'>
          <img src={imagePreview ? imagePreview : fondo} alt="" className='image-post' onChange={handleChange} />
        </div>
        <img className='send-post' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
      </PublicationModal>
      <Notification />
    </div>
  )
}

export default CreatePost;