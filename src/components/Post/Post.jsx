import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { handleMouseEnter, isChatModal } from '../../helpers/utils';
import {
    useAddComment, useCourseById, useCommentsTotal,
    useDeletePost, useHidePost, useLikeByUser, useLikesList, useSavePost, useUserById
} from '../../hooks';
import { messages, send, user } from '../../images';
import { alertState } from '../../reducers';
import MenuPost from '../menu-post/MenuPost';
import PostModal from '../modals/PostModal';
import Notification from '../notification/Notification';
import { LikeButton } from './LikeButton';
import { useTheme } from 'styled-components';

const Post = (props) => {
    const { post, commentModal, hide = false, save=false } = props;
    const location = useLocation();
    const theme = useTheme();
    const userInfoPerfil = useSelector(state => state.user);

    const { mutate: addComment } = useAddComment(post._id);
    const { mutate: deletePost } = useDeletePost(post._id);
    const { mutate: savePost } = useSavePost(userInfoPerfil.uid_user);
    const { mutate: hidePost } = useHidePost(userInfoPerfil.uid_user);

    const [commentValue, setCommentValue] = useState('');
    const [x, setX] = useState('');
    const [y, setY] = useState('');
    const [menu, setMenu] = useState(false);

    const { data: dataUserPost = [], isFetching: fetchingUserPost } = useUserById(post.uid_user);
    const [userPost, setUserPost] = useState(dataUserPost);

    const { data: dataCourse = [], isFetching: fetchingCourse, isLoading: loadingCourse } = useCourseById(post.id_Course);
    const [course, setCourse] = useState(dataCourse);   

    const { data: dataLikeList = [], isFetching: fetchingLike, isLoading: loadingLike } = useLikesList(post._id);
    const [likes, setLikes] = useState(dataLikeList);

    const { data: dataLikeByUser = [], isFetching: fetchingLikeByUser, isLoading: loadingLikeByUser } = useLikeByUser(post._id, userInfoPerfil.uid_user);
    const [starActive, setStarActive] = useState(dataLikeByUser);

    const { data: dataTotalComments = [], isFetching: fetchingTotalComments, isLoading: loadingTotalComments } = useCommentsTotal(post._id);
    const [ totalComments, setTotalComments ] = useState(dataTotalComments);

    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();

    const buttonMenuRef = useRef();

    const handleChange = (e) => {
        setCommentValue(e.target.value);
    };

    const handleMenu = () => {
        const x = buttonMenuRef.current.offsetLeft + 15 + 'px';
        setX(x);

        const y = buttonMenuRef.current.offsetTop + 15 + 'px';
        setY(y);

        setMenu(!menu);
    };

    const handleDelete = () => {
        !!menu && setMenu(!menu);
        const posts = { uid_user: userInfoPerfil.uid_user, id_Post: post._id };
        deletePost(posts, {
            onSuccess: (response) => {
                dispatch(
                    alertState({
                        isOpen: true,
                        message: 'Post eliminado con exito',
                        type: "success",
                    })
                );
            },
            onError: (response) => {
                console.log(response);
                dispatch(
                    alertState({
                        isOpen: true,
                        message: response,
                        type: "success",
                    })
                );
            }
        });
    };

    const handleHide = () => {
        !!menu && setMenu(!menu);
        hidePost({ uid_user: userInfoPerfil.uid_user, 
            id_Post: post._id }, {
            onSuccess: (response) => {
                dispatch(
                    alertState({
                        isOpen: true,
                        message: !hide ? 'Post ocultado' : 'Post mostrado',
                        type: "success",
                    })
                );
            }
        });
    };

    const handleSave = () => {
        !!menu && setMenu(!menu);
        savePost({ uid_user: userInfoPerfil.uid_user, 
            id_Post: post._id, career: post.career }, {
            onSuccess: (response) => {
                dispatch(
                    alertState({
                        isOpen: true,
                        message: !save ? 'Post guardado' : 'Post quitado en guardados',
                        type: "success",
                    })
                );
            }
        });
    };

    const handleSubmit = () => {
        const comments = { 
            uid_user: userInfoPerfil.uid_user, 
            id_Post: post._id, 
            comment: commentValue,
            action: `realizo un comentario en tu publicación`,
            uid_creator: post.uid_user,
            career: post.career,
            type: 'comment',
         };

        commentValue.length > 0 ? addComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            }
        })
        : console.log('no');

        setCommentValue('');
    };

    const submitHandler = ( event ) => 
        event.code === 'Enter' && handleSubmit()

    useEffect(() => {
        !fetchingUserPost && dataUserPost && userPost.length > -1 && setUserPost(dataUserPost);
        // eslint-disable-next-line
    }, [dataUserPost]);

    useEffect(() => {
        !fetchingCourse && dataCourse && setCourse(dataCourse);
        // eslint-disable-next-line
    }, [dataCourse]);

    useEffect(() => {
        !fetchingTotalComments && dataTotalComments && setTotalComments(dataTotalComments);
        // eslint-disable-next-line
    }, [dataTotalComments]);

    if ( loadingCourse || loadingLikeByUser || loadingLike || loadingTotalComments ) {
        return (
            <div className='spinner-container'>
                <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <div className='row'>
            <PostModal active={commentModal} dispatch={dispatch} >
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
                    <div className='col-8'>
                        <h3 style={{color:theme.userName}} className='name'>
                            {`${userPost.name} ${post.id_Course && ' > '}`}
                            {
                                post.id_Course && course ?
                                    <Link to={`/course/${course._id}`}
                                        style={{ textDecoration: 'none' }}>
                                        {course.title}
                                    </Link>
                                    : ''
                            }
                        </h3>
                    </div>
                    <div className='col-1'>
                        <button style={{background:theme.header, color:theme.colorPuntos}} className='button-options' ref={buttonMenuRef} onClick={handleMenu}>...</button>
                        <MenuPost x={x} y={y} showMenu={menu} userPost={userPost} handleDelete={handleDelete} handleHide={handleHide} handleSave={handleSave} post={post} hide={ hide } save={ save } prevUrl={location.pathname} />
                    </div>
                </div>
                <div className='row'>
                    <img
                        style={{ width: "50vw", marginTop: "10px" }}
                        src={post.imgUrl} alt={`${post.imgName} refresh the page`}
                    />
                </div>
                <div className='row'>
                    <div className='col-1'>
                    <LikeButton 
                        props={{
                            post:props.post,
                            userInfoPerfil,
                            vista:"1"
                        }}
                    />
                    </div>
                    <div className='col-3'> 
                        <Link to={post._id} onClick={ () => isChatModal(dispatch, true) } state={{ background: location, commentModal: !commentModal, post, userPost, prevPath: location.pathname }}>
                            <img style={{filter: theme.globo}} className='sinF' src={messages} alt="comments"/>
                        </Link>
                        <br/>
                        <p style={{
                            position: "absolute",
                            left: "95%",
                            color: theme.numbers
                        }}>
                            { totalComments }
                        </p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-11'>
                        <h4 style={{color:theme.userName}}>{post.title}</h4>
                        <p style={{color:theme.userName2}}>
                            <a>{userPost.username}: </a>
                            {post.description}
                            <br />
                            <span className='hashtag-post'>#{post.career}</span>
                        </p>
                    </div>
                </div>
                <div style={{backgroundColor:theme.linea}} className='linea-acostada' />
                <div className='row'>
                    <div className='col-1'>
                        <Link to={`/perfil/${userInfo.uid_user}`} style={{ textDecoration: 'none' }}>
                            <div className='boton-circular-volteado-2'>
                                <img className='icon-publications'
                                    src={userInfo.imgName ? userInfo.imgUrl : user}
                                    alt={userInfo.username} />
                            </div>
                        </Link>
                    </div>
                    <div className='col-8'>
                        <input style={{border:theme.comments2, background:theme.header, color:theme.userName}} className='inputCom' type="text" placeholder='¿Qué opinas?... ' value={commentValue} onKeyUp={ submitHandler } onChange={handleChange} />
                    </div>
                    <br />
                    <div className='col-1'>
                        <img className='send' src={send} alt='send' onClick={handleSubmit} onMouseEnter={() => handleMouseEnter(dispatch)} />
                    </div>
                </div>
            </PostModal>
            <Notification />
        </div>
    )
}

export default Post;