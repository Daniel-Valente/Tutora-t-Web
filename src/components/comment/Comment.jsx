import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { useDeleteComment, useUpdateComment, useUserById } from '../../hooks';
import { send, user } from '../../images';
import MenuComment from '../menu-comment/MenuComment';
import { timeSince } from '../../helpers/utils';

const Comment = (props) => {
    const { userInfoPerfil, comment, userPost } = props;
    const { mutate: updateComment } = useUpdateComment(comment.id_Post);
    const { mutate: deleteComment } = useDeleteComment(comment.id_Post);

    const { data: dataUserComment = [], isFetching: fetchingUserComment } = useUserById(comment.uid_user);
    const [userComment, setUserComment] = useState(dataUserComment);
    const [ commentValue, setCommentValue ] = useState(comment.comment);
    const [ edit, setEdit ] = useState(true);

    const [ x, setX ] = useState('');
    const [ y, setY ] = useState('');
    const [ menu, setMenu ] = useState(false);
    const formatDate = () => new Date(comment.createdAt);

    const buttonMenuRef = useRef();

    const handleEdit = () => {
        menu && setMenu(!menu);
        userInfoPerfil.uid_user === userComment.uid_user && setEdit(!edit);
    };

    const handleChange = (e) => {
        menu && setMenu(!menu);
        setCommentValue(e.target.value);
    };

    const handleMenu = () => {
        const x = buttonMenuRef.current.offsetLeft - 165 + 'px';
        setX(x);
    
        const y = buttonMenuRef.current.offsetTop + 10 + 'px';
        setY(y);
        
        setMenu(!menu);
    }

    const handleSubmitEdit = () => {
        menu && setMenu(!menu);
        const comments = { uid_user: userInfoPerfil.uid_user, id_Post: comment.id_Post, id_comment: comment._id, comment: commentValue  };
        commentValue ? updateComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            },
            onError: (repsonse) => {
                console.log(repsonse);
            }
        }) : setCommentValue(comment.comment);
        setEdit(!edit);
    }

    const handleDelete = () => {
        menu && setMenu(!menu);
        const comments = { uid_user: userInfoPerfil.uid_user, id_Post: comment.id_Post, id_comment: comment._id };
        deleteComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            },
            onError: (response) => {
                console.log(response);
            }
        });
    }

    useEffect(() => {
        !fetchingUserComment && dataUserComment && userComment.length > -1 && setUserComment(dataUserComment);
        // eslint-disable-next-line
    }, [dataUserComment]);

    return (
        <div className='row'>
            <div className='col-1'>
                <Link to={`/perfil/${comment.uid_user}`}>
                    <div className='boton-circular-volteado-6'>
                        <img className='icon-user-comment'
                            src={userComment.imgName ? userComment.imgUrl : user}
                            alt={userComment.username}
                        />
                    </div>
                </Link>
            </div>
            <div className='col-8'>
                <p>
                    <label style={{ fontSize: '15px' }}> <b>{ userComment.name }</b> </label>
                    <br />
                    <textarea 
                        type="text" 
                        value={ commentValue } 
                        className={`${ edit ? 'textarea-comment-disabled' : 'textarea-comment' }`} 
                        readOnly={ edit }
                        onChange={ handleChange }
                    >
                    </textarea>
                    {
                        !edit && <img className='send-comment' src={send} alt="send" onClick={ handleSubmitEdit } />
                    }
                    <span className='format-time'> hace { timeSince( formatDate() ) } </span>
                </p>
            </div>
            <div className='col-1'>
                { userInfoPerfil.uid_user === userComment.uid_user 
                ? <button className='button-comments-options' ref={buttonMenuRef} onClick={ handleMenu } >...</button>
                : userInfoPerfil.uid_user === userPost.uid_user && <button className='button-comments-options' ref={buttonMenuRef} onClick={ handleMenu } >...</button> }
                <MenuComment x={x} y={y} showMenu={menu} userComment={userComment} userPost={userPost} handleEdit={handleEdit} handleDelete={handleDelete}/>
            </div>
        </div>
    )
}

export default Comment;