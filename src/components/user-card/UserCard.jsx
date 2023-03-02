import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserById } from '../../hooks';
import { fondo, user } from '../../images';

const UserCard = (props) => {
    const { uid_user } = props;
    const { data: dataUser = [], isFetching: fetchingUser, isLoading: loadingUser } = useUserById(uid_user);
    const [userImg, setUserImg] = useState(dataUser);

    useEffect(() => {
        !fetchingUser && dataUser && userImg.length > -1 && setUserImg(dataUser);
    }, [dataUser]);

    if (loadingUser) {
        return (
            <div className='parent'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
    return (
        <div className='col-3'>
            <div className='card'>
                <img src={userImg.imgPortadaUrl ? userImg.imgPortadaUrl : fondo} alt={userImg.username} style={{ width: '100%', height: '15vh' }} />
                <Link to={`/perfil/${userImg.uid_user}`}>
                    <div className='boton-circular-userCard'>
                        <img className='icon-publications'
                            src={userImg.imgName ? userImg.imgUrl : user}
                            alt={userImg.username}
                        />
                    </div>
                </Link>
                <div className='container'>
                    <h4>Usuario: <b>{userImg.username}</b></h4>
                </div>
            </div>
            <br />
        </div>
    )
}

export default UserCard;