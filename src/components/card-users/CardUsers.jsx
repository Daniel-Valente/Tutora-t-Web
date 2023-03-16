import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { isSearchModal } from '../../helpers/utils';

import { user as userImg } from '../../images';

const CardUsers = ({ user, searchText = '', action }) => {

    const dispatch = useDispatch();

    const closedModal = () => {
        action('');
        isSearchModal(dispatch, true);
    }


    const filter = searchText && (user.username.toLowerCase().includes(searchText.toLowerCase()) || user.name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        filter && searchText ?
            <div>
                <Outlet />
                <Link to={`/perfil/${user.uid_user}`} onClick={closedModal}  style={{ textDecoration: 'none', color: 'black' }}>
                    <div className='col-3'>
                        <div className='boton-circular-volteado-5'>
                            <img className='icon-user-message'
                                src={`${user.imgUrl ? user.imgUrl : userImg}`}
                                alt={user.username}
                            />
                        </div>
                    </div>
                    <div className='col-7'>
                        <h3>{user.name}</h3>

                    </div>
                </Link>
                <div className='linea-acostada' />
            </div>
            : !searchText &&
            <div>
                <Outlet />
                <Link to={`/perfil/${user.uid_user}`} onClick={closedModal}>
                    <div className='col-3'>
                        <div className='boton-circular-volteado-5'>
                            <img className='icon-user-message'
                                src={`${user.imgUrl ? user.imgUrl : userImg}`}
                                alt={user.username}
                            />
                        </div>
                    </div>
                    <div className='col-7'>
                        <h3>{user.name}</h3>

                    </div>
                </Link>
                <div className='linea-acostada' />
            </div>
    )
}

export default CardUsers;