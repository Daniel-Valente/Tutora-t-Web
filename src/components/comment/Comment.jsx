import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';

import { useUpdateComment, useUserById } from '../../hooks';
import { send, user } from '../../images';

const Comment = (props) => {
    const { userInfoPerfil, comment } = props;
    const { mutate: updateComment } = useUpdateComment(comment.id_Post);

    const { data: dataUserComment = [], isFetching: fetchingUserComment } = useUserById(comment.uid_user);
    const [userComment, setUserComment] = useState(dataUserComment);
    const [ commentValue, setCommentValue ] = useState(comment.comment);
    const [ edit, setEdit ] = useState(true);

    const handleEdit = () => {
        userInfoPerfil.uid_user === userComment.uid_user && setEdit(!edit);
    };

    const handleChange = (e) => {
        setCommentValue(e.target.value);
    };

    const handleSubmitEdit = () => {
        const comments = { uid_user: userInfoPerfil.uid_user, id_Post: comment.id_Post, id_comment: comment._id, comment: commentValue  };
        commentValue ? updateComment(comments, {
            onSuccess: (response) => {
                console.log(response);
            },
            onError: (repsonse) => {
                console.log(repsonse);
            }
        }) : setCommentValue(comment.comment);
        setEdit(!edit)
    }

    useEffect(() => {
        !fetchingUserComment && dataUserComment && userComment.length > -1 && setUserComment(dataUserComment);
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
                </p>
            </div>
            <div className='col-1'>
                <button  onClick={ handleEdit } >...</button>
            </div>
        </div>
    )
}

export default Comment;