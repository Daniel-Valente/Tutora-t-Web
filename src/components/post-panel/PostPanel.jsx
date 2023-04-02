import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {Scrollbars } from 'react-custom-scrollbars-2';

import { isCommentModal } from '../../helpers/utils';
import { useAddComment, useCommentList } from '../../hooks';
import { send, user } from '../../images';
import CommentModal from '../modals/CommentModal';
import Comment from '../comment/Comment';
import { LikeButton } from '../Post/LikeButton';

const PostPanel = () => {
    const location = useLocation();
    const { commentModal = false, post = {}, userPost = {}, prevPath = '' } = location.state || [];
    const userInfoPerfil = useSelector(state => state.user);
    const { mutate: addComment } = useAddComment(post._id);

    const [ commentValue, setCommentValue ] = useState('');

    const dispatch = useDispatch();

    const { data: dataCommentsList = [], isFetching: fetchingCommentsList, isLoading: loadingCommentsList } = useCommentList(post._id);
    const [ comments, setComments ] = useState(dataCommentsList);

    const formatDate = () => new Date(post.createdAt).toDateString();
    
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
            career: post.career
         };

         
        commentValue.length > 0 ? addComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            }
        }) : console.log('no');
        setCommentValue('');
    }

    useEffect(() => {
        !fetchingCommentsList && dataCommentsList && comments.length > -1 && setComments(dataCommentsList);
        // eslint-disable-next-line
    }, [ dataCommentsList ]);

    if ( loadingCommentsList ) {
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
                        <div className='col-1' style={{marginTop:'5px'}}>
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
                        <Scrollbars autoHeight autoHeightMax={ 129 } style={{ width: 659 }}>
                            <div className='col-11'>
                                <h4>{post.title}</h4>
                                <p>
                                    <a style={{ textDecoration: 'none' }}>{userPost.username}: </a>
                                    {post.description}
                                </p>
                            </div>
                        </Scrollbars>
                    </div>

                    <div className='row' style={{ minHeight:'480px' }}>
                        <Scrollbars autoHeight autoHeightMax={ 470 } style={{width: 659 }}>
                            <div className='col-11'>
                            { comments.map( (comment, index) => <Comment key={ comment._id } userInfoPerfil={userInfoPerfil} comment={ comment } userPost={userPost} /> ) }
                            </div>
                        </Scrollbars>
                    </div>

                    <div className='row'>
                        <div className='meGusta'>
                            <div className='row' style={{paddingLeft:'15px'}}>
                                <LikeButton 
                                        props={{
                                            post:post,
                                            userInfoPerfil:userInfoPerfil,
                                            vista:'2'
                                        }}
                                 />
                                 <br/>
                                <p style={{
                                    position: 'relative',
                                    bottom: '10px',
                                    left: '1vw',
                                    color: '#858585'
                                }}
                                > {formatDate()} </p>
                            </div>
                            <div className='row'>
                                <input className='inputCom-2' type="text" placeholder=' ¿Qué opinas?... ' value={ commentValue } onChange={ handleChange } />
                                <img className='send-2' src={send} alt="send" onClick={ handleSubmit } />
                            </div>
                        </div>
                    </div>
                </div>
            </CommentModal>
        </>
    )
}

export default PostPanel;