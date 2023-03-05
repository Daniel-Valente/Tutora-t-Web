import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import { handleMouseEnter, isEditPublicationModal } from '../../helpers/utils';
import { useUpdatePost } from '../../hooks';
import { send } from '../../images';
import { alertState } from '../../reducers';

import EditPublicationModal from '../modals/EditPublicationModal';
import Notification from '../notification/Notification';

const EditPostPanel = () => {
    const location = useLocation();
    const { id_Course } = useParams();
    const { editPublicationModal = false, post = {}, prevPath = '' } = location.state || [];
    const { mutate: updatePost } = useUpdatePost(post._id);

    const userInfoPerfil = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [editPost, setEditPost] = useState({
        title: post ? post.title : '',
        description: post ? post.description : '',
        imgPost: '',
        id_Course: id_Course ? id_Course : '',
        uid_user: userInfoPerfil.uid_user,
        id_Post: post._id
    });

    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        if (e.target.files) {
            setImagePreview(URL.createObjectURL(e.target.files[0]));
            setEditPost({ ...editPost, [e.target.name]: e.target.files[0] });
        }
        else {
            setEditPost({ ...editPost, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = () => {
        updatePost(editPost, {
            onSuccess: (response) => {
                console.log(response);
                dispatch(
                    alertState({
                        isOpen: true,
                        message: 'Post editado con exito',
                        type: "success",
                    })
                );
                editPublicationModal(dispatch, editPublicationModal);
            }
        });
    }

    return (
        <EditPublicationModal active={editPublicationModal} toggle={isEditPublicationModal} dispatch={dispatch} prevPath={prevPath}>
            <h2 style={{ textAlign: 'center' }}>Editar publicacion</h2>
            <input className='title-post' type="text" placeholder='Titulo' name='title' value={editPost.title} onChange={handleChange} />
            <br /><br /><br />
            <textarea className='inp' placeholder={`¿Que tienes en mente  ${userInfoPerfil.name}?...`} name='description' value={editPost.description} onChange={handleChange}></textarea>
            <div className='upload-post'>
                <div className="upload-btn-wrapper" onChange={handleChange}>
                    <button className="boton-standar-rw">
                        Carga un archivo
                    </button>
                    <input className="upload-file-buton" name="imgPost" type="file" accept="image/*" />
                </div>
            </div>
            <div className='upload-image-post'>
                <img src={ imagePreview ? imagePreview : post.imgUrl } alt="" className='image-post' onChange={handleChange} />
            </div>
            <Link to={prevPath}>
                <img className='send-post' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
            </Link>
            <Notification />
        </EditPublicationModal>
    )
}

export default EditPostPanel;