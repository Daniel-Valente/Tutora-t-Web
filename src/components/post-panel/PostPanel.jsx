import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {Scrollbars } from 'react-custom-scrollbars-2';

import { isCommentModal } from '../../helpers/utils';
import { useLikeByUser, useLikesList, useUpdateLike } from '../../hooks';
import { send, star, starSinF, user } from '../../images';
import CommentModal from '../modals/CommentModal';
import Comment from '../Comment/Comment';

const PostPanel = () => {
    const location = useLocation();
    const userInfoPerfil = useSelector(state => state.user);
    const { mutate: updateLike } = useUpdateLike();

    const { commentModal = false, post = {}, userPost = {}, prevPath = '' } = location.state || [];

    const dispatch = useDispatch();

    const { data: dataLikeList = [], isFetching: fetchingLike, isLoading: loadingLike } = useLikesList(post._id);
    const [likes, setLikes] = useState(dataLikeList);

    const { data: dataLikeByUser = [], isFetching: fetchingLikeByUser, isLoading: loadingLikeByUser } = useLikeByUser(post._id, userInfoPerfil.uid_user);
    const [ starActive, setStarActive ] = useState(dataLikeByUser);

    const formatDate = () => new Date(post.createdAt).toDateString();

    const handleStar = () => {
        const likeUser = { uid_user: userInfoPerfil.uid_user, id_Post: post._id };
        updateLike(likeUser, {
            onSuccess: ({data}) => {
                setStarActive(data);
            }
        });
    }

    useEffect(() => {
        !fetchingLike && setLikes(dataLikeList);
    }, [dataLikeList]);

    useEffect(() => {
        !fetchingLikeByUser && setStarActive(dataLikeByUser);
    }, [dataLikeByUser]);

    if (loadingLike || loadingLikeByUser) {
        return (
            <div className='parent'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <>
            <CommentModal toggle={isCommentModal} active={commentModal} dispatch={dispatch} prevPath={prevPath}>
                <div className='linea-acostada-3' />
                <div>
                    <img
                        style={{ width: '43vw', height: '91.6vh' }}
                        src={post.imgUrl}
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
                    <div className='linea-acostada-2'/>
                    <div className='row'>
                        <Scrollbars style={{ width: 659, height: 300 }}>
                        <div className='col-11'>
                            <h4>{post.title}</h4>
                            <p>
                                <a style={{ textDecoration: 'none' }}>{userPost.username}: </a>
                                {post.description} 
                            </p>
                        </div>
                        </Scrollbars>
                    </div>

                    <div className='row'>
                        <Scrollbars style={{ width: 659, height: 270 }}>
                        <div className='col-11'>
                        </div>
                        </Scrollbars>
                    </div>

                    <div className='row'>
                        <div className='meGusta'>
                            <img
                                className='star'
                                style={{ position: 'absolute', top: '75vh', left: '0' }}
                                src={starActive ? star : starSinF } alt="star"
                                onClick={handleStar}
                            />
                            <p style={{
                                position: 'absolute',
                                top: '74vh',
                                left: '2vw',
                                color: '#858585'
                            }}>
                                {likes}
                            </p>
                            <p style={{
                                position: 'absolute',
                                top: '77vh',
                                left: '0',
                                color: '#858585'
                            }}
                            > {formatDate()} </p>
                            <input className='inputCom-2' type="text" placeholder=' ¿Qué opinas?... ' />
                            <img className='send-2' src={send} alt="send" />
                        </div>
                    </div>
                </div>
            </CommentModal>
        </>
    )
}

export default PostPanel;