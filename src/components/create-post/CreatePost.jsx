import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { send, user } from '../../images';
import { handleMouseEnter, isPublicationModal } from '../../helpers/utils';
import PublicationModal from '../modals/PublicationModal';
import { useAddPost, useBodyScrollLock } from '../../hooks';
import { alertState } from '../../reducers';
import Notification from '../notification/Notification';

const CreatePost = () => {
  const userInfo = useSelector(state => state.user);
  const [ , toggle ] = useBodyScrollLock();
  const { mutate: addPost } = useAddPost();

  const { value: publicationModal } = useSelector(state => state.publicationModal);
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    imgPost: '',
    id_Course: '',
    uid_user: userInfo.uid_user,
  });

  const [imagePreview, setImagePreview] = useState('');

  const openModalHandler = () => {
    isPublicationModal(dispatch, publicationModal);
    toggle();
  }

  const handleChange = (e) => {
    if (e.target.files) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
      setNewPost({ ...newPost, [e.target.name]: e.target.files[0] });
    }
    else {
      setNewPost({ ...newPost, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = () => {
    addPost(newPost,{
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
        }
    });
  }

  return (
    <div>
      <div className='wrapper'>
        <div className='windows'>
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
              onClick={ openModalHandler } >
              ¿Que tienes en mente?...
            </button>
          </div>
        </div>
      </div>

      <PublicationModal active={publicationModal} toggle={isPublicationModal} dispatch={dispatch} toggleLock={toggle}>
        <h2 style={{ textAlign: 'center' }}>Crear publicacion</h2>
        <input className='title-post' type="text" placeholder='Titulo' name='title' value={newPost.title} onChange={handleChange} />
        <br /><br /><br />
        <textarea className='inp' placeholder={`¿Que tienes en mente  ${userInfo.name}?...`} name='description' value={newPost.description} onChange={handleChange}></textarea>
        <div className='upload-post'>
          <div className="upload-btn-wrapper" onChange={handleChange}>
            <button className="boton-standar-rw">
              Carga un archivo
            </button>
            <input className="upload-file-buton" name="imgPost" type="file" accept="image/*" />
          </div>
        </div>
        <div className='upload-image-post'>
          <img src={imagePreview} alt="" className='image-post' onChange={handleChange} />
        </div>
        <img className='send-post' src={send} alt='send' onClick={ handleSubmit } onMouseEnter={() => handleMouseEnter(dispatch)} />
      </PublicationModal>
      <Notification />
    </div>
  )
}

export default CreatePost;