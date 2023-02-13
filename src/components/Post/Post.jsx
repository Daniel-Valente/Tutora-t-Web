import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { handleMouseEnter } from '../../helpers/utils';
import { useUserById } from '../../hooks';
import { messages, send, star, user } from '../../images';
import PostModal from '../modals/PostModal';

const Post = (props) => {
    const { post, commentModal } = props;
    const location = useLocation();

    const { data: dataUserPost = [], isFetching: fetchingUserPost } = useUserById(post.uid_user);
    const [userPost, setUserPost] = useState(dataUserPost);

    const userInfo = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        !fetchingUserPost && dataUserPost && userPost.length > -1 && setUserPost(dataUserPost);
    }, [dataUserPost]);

    return (
        <div className='row'>
            <PostModal active={commentModal} dispatch={dispatch} >
                <Link to={`/perfil/${post.uid_user}`}>
                    <div className='boton-circular-volteado'>
                        <img className='icon-publications'
                            src={dataUserPost.imgName ? dataUserPost.imgUrl : user}
                            alt={dataUserPost.username}
                        />
                    </div>
                </Link>
                <h3 className='name'> {userPost.name} </h3>
                <img
                    style={{ width: "50vw", marginTop: "10px" }}
                    src={post.imgUrl} alt={post.imgName}
                />
                <img className='star' src={star} alt="star" />
                <Link to={post._id} state={{ commentModal: !commentModal, post, userPost, prevPath: location.pathname }}>
                    <img className='sinF' src={messages} alt="comments" />
                </Link>
                <h4>{post.title}</h4> <br />
                <p>
                    <a>{userPost.username}: </a>
                    {post.description}
                </p>
                <div className='linea-acostada' />
                <Link to={`/perfil/${userInfo.uid_user}`} style={{ textDecoration: 'none' }}>
                    <div className='boton-circular-volteado-2'>
                        <img className='icon-publications'
                            src={userInfo.imgName ? userInfo.imgUrl : user}
                            alt={userInfo.username} />
                    </div>
                </Link>
                <p style={{
                    position: "absolute",
                    top: "65.5vh",
                    left: "80px",
                    color: "#858585"
                }}>1</p>
                <input className='inputCom' type="text" placeholder='¿Qué opinas?... ' />
                <img className='send' src={send} alt='send' onMouseEnter={() => handleMouseEnter(dispatch)} />
            </PostModal>
        </div>
    )
}

export default Post;