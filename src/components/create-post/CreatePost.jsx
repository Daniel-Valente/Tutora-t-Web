import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isPublicationModal } from '../../helpers/utils';

import { user } from '../../images';
import PublicationModal from '../modals/PublicationModal';

const CreatePost = () => {
  const userInfo = useSelector(state => state.user);

  const { value: publicationModal } = useSelector(state => state.publicationModal);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='wrapper'>
        <div className='windows'>
          <div className='col-3'>
            <Link to={`/perfil/${ userInfo.uid_user }`} style={{ textDecoration: 'none' }}>
              <div className='boton-circular-volteado-4'>
                <img className='icon-user' 
                  src={ userInfo.imgName ? userInfo.imgUrl : user } 
                  alt={ userInfo.username }/>
              </div>
            </Link>
          </div>
          <div className='col-9'>
            <button className='search-input-2'
              onClick={() => isPublicationModal(dispatch, publicationModal)} >
              ¿Que tienes en mente?...
            </button>
          </div>
        </div>
      </div>

      <PublicationModal active={publicationModal} toggle={ isPublicationModal } dispatch={dispatch}>
        <h2 style={{ textAlign: 'center' }}>Crear publicacion</h2>
        <textarea className='inp' placeholder={`¿Que tienes en mente  ${userInfo.name}?...`}></textarea>
      </PublicationModal>
    </div>
  )
}

export default CreatePost;