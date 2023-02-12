import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useLikesList, useUserById } from '../../hooks';
import { messages, send, star, user } from '../../images';
import CommentModal from '../modals/CommentModal';
import PostModal from '../modals/PostModal';

const Post = (props) => {
    const { post } = props;

    const { data: dataUserPost } = useUserById( post.uid_user );
    const [ postUser, setPostUser ] = useState(dataUserPost);

    const { data: dataLikePost } = useLikesList(post.id_Post);
    const [ likePost, setLikePost ] = useState(dataLikePost);

    const userInfo = useSelector(state => state.user);
    const { value: commentModal } = useSelector( (state) => state.commentModal );
    const dispatch = useDispatch();

    useEffect(() => {
        setPostUser(dataUserPost);
    }, [ dataUserPost ]);

    useEffect(() => {
        setLikePost(dataLikePost);
    }, [ dataLikePost ]);

  return (
    <div className='row'>
        <PostModal active={ commentModal } dispatch={dispatch } >
            <Link to={`/perfil/${ post.uid_user }`}>
                <div className='boton-circular-volteado'>
                    <img className='icon-publications' 
                        src={ postUser.imgName ? postUser.imgUrl : user } 
                        alt={ postUser.username }
                        />
                </div>
            </Link>
            <h3 className='name'> { postUser.name } </h3>
            <img
                style={{ width: "50vw", marginTop: "10px" }}
                src={ post.imgUrl } alt={ post.imgName }
            />
            <img className='star' src={ star } alt="star" />
            <button>
                <img className='sinF' src={ messages } alt="comments" />
            </button>
            <p>
                <h4>{ post.title }</h4> <br />
                <a style={{ textDecoration: "none" }}>{ postUser.username }</a>
                { post.description }
            </p>
            <div className='linea-acostada' />
            <Link to={`/perfil/${ userInfo.uid_user }`} style={{ textDecoration: 'none' }}>
                <div className='boton-circular-volteado-2'>
                    <img className='icon-publications' 
                    src={ userInfo.imgName ? userInfo.imgUrl : user } 
                    alt={ userInfo.username } />
                </div>
            </Link>
            <p style={{
                position: "absolute",
                top: "65.5vh",
                left: "80px",
                color: "#858585"
            }}>{ likePost.total_like }</p>
            <input className='inputCom' type="text" placeholder='¿Qué opinas?... ' />
            <img className='send' src={ send } alt='send' />
        </PostModal>

        <CommentModal active={ commentModal } dispatch={ dispatch }>
            <div className='linea-acostada-2' />
            <div className='linea-acostada-3' />
            <div>
                <img
                    style={{ width: '43vw', height: '91.6vh' }} 
                    src={ post.imgUrl } 
                    alt={ post.imgName } />
            </div>
            <div className='panelDerecho'>
                <div className='row'>
                    <div className='col-1'>
                        <Link to={`/perfil/${ post.uid_user }`}>
                            <div className='boton-circular-volteado'>
                                <img className='icon-publications' 
                                    src={ postUser.imgName ? postUser.imgUrl : user } 
                                    alt={ postUser.username }
                                    />
                            </div>
                        </Link>
                    </div>
                    <div className='col-11'>
                        <h3 className='name-comments-public'>{ post.name }</h3>
                    </div>
                </div>
                <p>
                    <h4>{ post.title }</h4> <br />
                    <a style={{ textDecoration: 'none' }}>{ postUser.username }</a>
                    { post.description }
                </p>
                <div className='meGusta'>
                    <img 
                        className='star'
                        style={{ position: 'absolute', top: '70vh', left: '0' }}
                        src={ star } alt="star" 
                    />
                    <p style={{
                        position: 'absolute',
                        top: '68.7vh',
                        left: '2vw',
                        color: '#858585'
                    }}>
                        { likePost.total_like }
                    </p>
                    <p style={{
                        position: 'absolute',
                        top: '72.5vh',
                        left: '0',
                        color: '#858585'
                    }}
                    ></p>
                    <input className='inputCom-2' type="text" placeholder=' ¿Qué opinas?... '/>
                    <img className='send-2' src={ send } alt="send" />
                </div>
            </div>
        </CommentModal>
    </div>
  )
}

export default Post;