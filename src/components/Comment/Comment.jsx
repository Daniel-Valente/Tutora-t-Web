import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { isCommentModal } from '../../helpers/utils';
import { send, star, user } from '../../images';
import CommentModal from '../modals/CommentModal';

const Comment = () => {
    const location = useLocation();
    const { commentModal = false, post = {}, userPost = {}, prevPath = '' } = location.state || [];
    const dispatch = useDispatch();

    const formatDate = () => new Date(post.createdAt).toDateString();

    return (
        <>
            <CommentModal toggle={isCommentModal} active={commentModal} dispatch={dispatch} prevPath={prevPath}>
                <div className='linea-acostada-2' />
                <div className='linea-acostada-3' />
                <div>
                    <img
                        style={{ width: '43vw', height: '91.6vh' }}
                        src={ post.imgUrl }
                        alt={post.imgName} />
                </div>
                <div className='panelDerecho'>
                    <div className='row'>
                        <div className='col-1'>
                            <Link to={`/perfil/${post.uid_user}`}>
                                <div className='boton-circular-volteado'>
                                    <img className='icon-publications'
                                        src={userPost.imgName ? userPost.imgUrl : user}
                                        alt={userPost.username}
                                    />
                                </div>
                            </Link>
                        </div>
                        <div className='col-11'>
                            <h3 className='name-comments-public'>{userPost.name}</h3>
                        </div>
                    </div>
                    <h4>{post.title}</h4> <br />
                    <p>
                        <a style={{ textDecoration: 'none' }}>{userPost.username}</a>
                        {post.description}
                    </p>
                    <div className='meGusta'>
                        <img
                            className='star'
                            style={{ position: 'absolute', top: '70vh', left: '0' }}
                            src={star} alt="star"
                        />
                        <p style={{
                            position: 'absolute',
                            top: '68.7vh',
                            left: '2vw',
                            color: '#858585'
                        }}>
                            1
                        </p>
                        <p style={{
                            position: 'absolute',
                            top: '72.5vh',
                            left: '0',
                            color: '#858585'
                        }}
                        > { formatDate() } </p>
                        <input className='inputCom-2' type="text" placeholder=' ¿Qué opinas?... ' />
                        <img className='send-2' src={send} alt="send" />
                    </div>
                </div>
            </CommentModal>
        </>
    )
}

export default Comment