import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserById } from '../../hooks';
import { fondo, user } from '../../images';

const UserCard = (props) => {
    const { uid_user } = props;
    const { data: dataUser = [], isFetching: fetchingUser } = useUserById(uid_user);
    const [userImg, setUserImg] = useState(dataUser);

    useEffect(() => {
        !fetchingUser && dataUser && userImg.length > -1 && setUserImg(dataUser);
        // eslint-disable-next-line
    }, [dataUser]);

    return (
        <div style={{marginRight:'100px'}}  className='col-3'>
            <div  className='card' style={{border: "1px solid #a2a2a2", height:'250px', borderRadius:'10px'}}>
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