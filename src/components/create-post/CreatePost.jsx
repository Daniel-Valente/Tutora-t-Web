import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isPublicationModal } from '../../helpers/utils';

import { user } from '../../images';
import PublicationModal from '../modals/PublicationModal';

const CreatePost = () => {
  const { value: publicationModal } = useSelector(state => state.publicationModal);
  const dispatch = useDispatch();

  return (
    <div>
      <div className='wrapper'>
        <div className='windows'>
          <div className='col-3'>
            <Link to={``} style={{ textDecoration: 'none' }}>
              <div className='boton-circular-volteado-4'><img className='icon-user' src={user} /></div>
            </Link>
          </div>
          <div className='col-9'>
            <button className='search-input-2'
              onClick={() => console.log('hola')} >
              ¿Que tienes en mente?...
            </button>
          </div>
        </div>
      </div>

      <PublicationModal active={publicationModal} toggle={ isPublicationModal } dispatch={dispatch}>
        <h2 style={{ textAlign: 'center' }}>Crear publicacion</h2>
        <textarea className='inp' placeholder={`¿Que tienes en mente  ?...`}></textarea>
      </PublicationModal>
    </div>
  )
}

export default CreatePost;