import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {Scrollbars } from 'react-custom-scrollbars-2';

import { isCommentModal } from '../../helpers/utils';
import { useAddComment, useCommentList, useLikeByUser, useLikesList, useUpdateLike } from '../../hooks';
import { send, star, starSinF, user } from '../../images';
import CommentModal from '../modals/CommentModal';
import Comment from '../comment/Comment';

const PostPanel = () => {
    const location = useLocation();
    const { commentModal = false, post = {}, userPost = {}, prevPath = '' } = location.state || [];
    const userInfoPerfil = useSelector(state => state.user);
    const { mutate: updateLike } = useUpdateLike(post._id);
    const { mutate: addComment } = useAddComment(post._id);

    const [ commentValue, setCommentValue ] = useState('');

    const dispatch = useDispatch();

    const { data: dataLikeList = [], isFetching: fetchingLike, isLoading: loadingLike } = useLikesList(post._id);
    const [likes, setLikes] = useState(dataLikeList);

    const { data: dataLikeByUser = [], isFetching: fetchingLikeByUser, isLoading: loadingLikeByUser } = useLikeByUser(post._id, userInfoPerfil.uid_user);
    const [starActive, setStarActive] = useState(dataLikeByUser);

    const { data: dataCommentsList = [], isFetching: fetchingCommentsList, isLoading: loadingCommentsList } = useCommentList(post._id);
    const [ comments, setComments ] = useState(dataCommentsList);

    const formatDate = () => new Date(post.createdAt).toDateString();

    const handleStar = () => {
        const likeUser = { uid_user: userInfoPerfil.uid_user, id_Post: post._id };
        updateLike(likeUser, {
            onSuccess: ({ data }) => {
                setStarActive(data);
            }
        });
    }
    
    const handleChange = (e) => {
        setCommentValue(e.target.value);
    };

    const handleSubmit = () => {
        const comments = { 
            uid_user: userInfoPerfil.uid_user, 
            id_Post: post._id, 
            comment: commentValue,
            action: `realizo un comentario en tu publicación`,
            uid_creator: post.uid_user,
            type: 'comment',
         };
        setCommentValue('');
        commentValue.length > 0 ? addComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            }
        })
        : console.log('no');
    }

    useEffect(() => {
        !fetchingLike && setLikes(dataLikeList);
        // eslint-disable-next-line
    }, [dataLikeList]);

    useEffect(() => {
        !fetchingLikeByUser && dataLikeByUser && setStarActive(dataLikeByUser);
        // eslint-disable-next-line
    }, [dataLikeByUser]);

    useEffect(() => {
        !fetchingCommentsList && dataCommentsList && comments.length > -1 && setComments(dataCommentsList);
        // eslint-disable-next-line
    }, [ dataCommentsList ]);

    if (loadingLike || loadingLikeByUser || loadingCommentsList) {
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
                    <div className='linea-acostada-2' />
                    <div className='row'>
                        <Scrollbars autoHeight autoHeightMax={300} style={{ width: 659 }}>
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
                        <Scrollbars autoHeight autoHeightMax={265} style={{ width: 659 }}>
                            <div className='col-11'>
                            { comments.map( (comment, index) => <Comment key={ comment._id } userInfoPerfil={userInfoPerfil} comment={ comment } userPost={userPost} /> ) }
                            </div>
                        </Scrollbars>
                    </div>

                    <div className='row'>
                        <div className='meGusta'>
                            <img
                                className='star'
                                style={{ position: 'absolute', top: '75vh', left: '0' }}
                                src={starActive ? star : starSinF} alt="star"
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
                            <input className='inputCom-2' type="text" placeholder=' ¿Qué opinas?... ' value={ commentValue } onChange={ handleChange } />
                            <img className='send-2' src={send} alt="send" onClick={ handleSubmit } />
                        </div>
                    </div>
                </div>
            </CommentModal>
        </>
    )
}

export default PostPanel;