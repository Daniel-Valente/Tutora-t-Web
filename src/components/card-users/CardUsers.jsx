import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { isSearchModal } from '../../helpers/utils';

import { user as userImg } from '../../images';

const CardUsers = ({ user, searchText = '', action }) => {

    const dispatch = useDispatch();
    const { username, name } = user || [];

    const closedModal = () => {
        action('');
        isSearchModal(dispatch, true);
    }

    const filter = searchText && ( username && username.toLowerCase().includes(searchText.toLowerCase()) || name && name.toLowerCase().includes(searchText.toLowerCase()));

    return (
        filter && searchText ?
            <div>
                <Outlet />
                <Link to={`/perfil/${user.uid_user}`} onClick={closedModal}  style={{ textDecoration: 'none', color: 'black' }}>
                    <div style={{ float:'left', paddingLeft:'20px', paddingTop:'5px', paddingBottom:'5px'}}>
                        <img className='icon-user-3'
                        src={`${user.imgUrl ? user.imgUrl : userImg}`}
                        alt={user.username} /> 
                    </div>
                    <div style={{ float:'left', color:'#000', paddingTop:'20px', paddingBottom:'5px'}}>
                        <b>{user.name}</b>
                    </div>
                    
                </Link>
            </div>
            : !searchText &&
            <div>
                <Outlet />
                <Link to={`/perfil/${user.uid_user}`} onClick={closedModal}>
                    <div style={{ float:'left',paddingLeft:'20px',paddingTop:'5px',paddingBottom:'5px'}}>
                        <img className='icon-user-3'
                         src={`${user.imgUrl ? user.imgUrl : userImg}`}
                         alt={user.username} /> 
                    </div>
                    <div style={{ float:'left', color:'#000',paddingTop:'20px', paddingBottom:'5px'}}>
                        <b> {user.name}</b>
                    </div>
                </Link>
                <div className='linea-acostada-new' />
            </div>
    )
}

export default CardUsers;