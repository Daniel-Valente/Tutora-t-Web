import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { handleMouseEnter } from '../../helpers/utils';
import { useAddComment, useLikeByUser, useLikesList, useUpdateLike, useUserById } from '../../hooks';
import { messages, send, star, starSinF, user } from '../../images';
import MenuPost from '../menu-post/MenuPost';
import PostModal from '../modals/PostModal';

const Post = (props) => {
    const { post, commentModal } = props;
    const location = useLocation();
    const userInfoPerfil = useSelector(state => state.user);
    const { mutate: updateLike } = useUpdateLike(post._id);
    const { mutate: addComment } = useAddComment(post._id);

    const [ commentValue, setCommentValue ] = useState('');
    const [ x, setX ] = useState('');
    const [ y, setY ] = useState('');
    const [ menu, setMenu ] = useState(false);

    const { data: dataUserPost = [], isFetching: fetchingUserPost } = useUserById(post.uid_user);
    const [userPost, setUserPost] = useState(dataUserPost);

    const { data: dataLikeList = [], isFetching: fetchingLike, isLoading: loadingLike  } = useLikesList(post._id);
    const [ likes, setLikes ] = useState(dataLikeList);

    const { data: dataLikeByUser = [], isFetching: fetchingLikeByUser, isLoading: loadingLikeByUser } = useLikeByUser(post._id, userInfoPerfil.uid_user);
    const [ starActive, setStarActive ] = useState(dataLikeByUser);

    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();

    const buttonMenuRef = useRef();

    const handleStar = () => {
        const likeUser = { uid_user: userInfoPerfil.uid_user, id_Post: post._id };
        updateLike(likeUser, {
            onSuccess: ({data}) => {
                setStarActive(data);
            }
        });
    }
    
    const handleChange = (e) => {
        setCommentValue(e.target.value);
    };

    const handleMenu = () => {
        const x = buttonMenuRef.current.offsetLeft + 15 + 'px';
        setX(x);
    
        const y = buttonMenuRef.current.offsetTop + 15 + 'px';
        setY(y);
        
        setMenu(!menu);
    }

    const handleSubmit = () => {
        const comments = { uid_user: userInfoPerfil.uid_user, id_Post: post._id, comment: commentValue  };
        setCommentValue('');
        commentValue.length > 0 ? addComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            }
        })
        : console.log('no');
    }

    useEffect(() => {
        !fetchingUserPost && dataUserPost && userPost.length > -1 && setUserPost(dataUserPost);
    }, [dataUserPost]);

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
        <div className='row'>
            <PostModal active={commentModal} dispatch={dispatch} >
                <div className='row'>
                    <div className='col-1'>
                        <Link to={`/perfil/${post.uid_user}`}>
                            <div className='boton-circular-volteado'>
                                <img className='icon-publications'
                                    src={dataUserPost.imgName ? dataUserPost.imgUrl : user}
                                    alt={dataUserPost.username}
                                />
                            </div>
                        </Link>
                    </div>
                    <div className='col-8'>
                        <h3 className='name'> {userPost.name} </h3>
                    </div>
                    <div className='col-1'>
                        <button className='button-options' ref={buttonMenuRef} onClick={ handleMenu }>...</button>
                        <MenuPost x={x} y={y} showMenu={menu} userPost={userPost} />
                    </div>
                </div>
                <div className='row'>
                    <img
                        style={{ width: "50vw", marginTop: "10px" }}
                        src={post.imgUrl} alt={post.imgName}
                    />
                </div>
                <div className='row'>
                    <div className='col-1'>
                        <img className='star' onClick={ handleStar } src={ starActive ? star : starSinF } alt="star" />
                    </div>
                    <div className='col-2'>
                        <p style={{
                            position: "absolute",
                            left: "50px",
                            color: "#858585"
                        }}>
                            {likes}
                        </p>
                    </div>
                    <div className='col-3'>
                        <Link to={post._id} state={{ commentModal: !commentModal, post, userPost, likes, prevPath: location.pathname }}>
                            <img className='sinF' src={messages} alt="comments" />
                        </Link>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-11'>
                        <h4>{post.title}</h4>
                        <p>
                            <a>{userPost.username}: </a>
                            {post.description}
                        </p>
                    </div>
                </div>
                <div className='linea-acostada' />
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
                        <input className='inputCom' type="text" placeholder='¿Qué opinas?... ' value={ commentValue } onChange={ handleChange } />
                    </div>
                    <br />
                    <div className='col-1'>
                        <img className='send' src={send} alt='send' onClick={ handleSubmit } onMouseEnter={() => handleMouseEnter(dispatch)} />
                    </div>
                </div>
                
            </PostModal>
        </div>
    )
}

export default Post;