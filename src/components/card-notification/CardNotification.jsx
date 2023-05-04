import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { isNotificationModal, timeSince } from '../../helpers/utils';
import { useCourseById, useLikesList, usePostById, useUserById } from '../../hooks';
import { useTheme } from 'styled-components';
import { user } from '../../images';

const CardNotification = ({ notification = [], notificationModal = false }) => {
    const location = useLocation();

    const dispatch = useDispatch();

    const { data: dataUserReaction = [], isFetching: fetchingUserReaction } = useUserById(notification.uid_user);
    const [userReaction, setUserReaction] = useState(dataUserReaction);


    const { data: dataPost = [], isFetching: fetchingPost, isLoading: loadingPost } = usePostById(notification.type === 'like' || notification.type === 'comment' ? notification.id_action : null);
    const [post, setPost] = useState(dataPost);

    const { data: dataUserPost = [], isFetching: fetchingUserPost } = useUserById(post.uid_user);
    const [userPost, setUserPost] = useState(dataUserPost);

    const { data: dataLikeList = [], isFetching: fetchingLike } = useLikesList(post._id);
    const [likes, setLikes] = useState(dataLikeList);

    const { data: dataCourse = [], isFetching: fetchingCourse } = useCourseById(notification.type === 'course' || notification.type === 'inscription' ? notification.id_action : null);
    const [course, setCourse] = useState(dataCourse);

    const formatDate = () => new Date(notification.createdAt);

    const closeModal = () => {
        isNotificationModal(dispatch, notificationModal);
    }

    useEffect(() => {
        !fetchingUserReaction && dataUserReaction && userReaction.length > -1 && setUserReaction(dataUserReaction);
        // eslint-disable-next-line
    }, [dataUserReaction]);

    useEffect(() => {
        !fetchingPost && dataPost && post.length > -1 && setPost(dataPost);
        // eslint-disable-next-line
    }, [dataPost]);

    useEffect(() => {
        !fetchingLike && setLikes(dataLikeList);
        // eslint-disable-next-line
    }, [dataLikeList]);

    useEffect(() => {
        !fetchingUserPost && dataUserPost && userPost.length > -1 && setUserPost(dataUserPost);
        // eslint-disable-next-line
    }, [dataUserPost]);

    useEffect(() => {
        !fetchingCourse && dataCourse && course.length > -1 && setCourse(dataCourse);
        // eslint-disable-next-line
    }, [dataCourse]);
    const theme = useTheme();

    if( dataPost.length !== 0 ) {
        return (
            <div>
                <div style={{ background: theme.linea }} className='linea-acostada' />
                <div style={{ color: theme.userName2 }} className='row card-notification'>
                    <Link to={`/perfil/${notification.uid_user}`} style={{ textDecoration: 'none' }}>
                        <div style={{ float: 'left' }}>
                            <img className='icon-user-3'
                                src={userReaction.imgName ? userReaction.imgUrl : userReaction.username}
                                alt={userReaction.username} />
                        </div>
                        <div style={{ float: 'left', color: theme.userName }}>
                            <b>{userReaction.username}</b>
                        </div>
                    </Link>
                    <br />
                    {` ${notification.type === 'follower' ? notification.action : notification.action + ':'} `}
                    {
                        notification.type === 'course' &&
                        <Link to={`/course/${notification.id_action}`}
                            style={{ textDecoration: 'none' }}
                            onClick={closeModal}>
                            {
                                course.title
                            }
                        </Link>
                    }
                    {
                        notification.type === 'inscription' &&
                        <Link to={`/course/${notification.id_action}`}
                            style={{ textDecoration: 'none' }}
                            onClick={closeModal}>
                            {
                                course.title
                            }
                        </Link>
                    }
                    {
                        notification.type === 'comment' &&
                        <Link to={`${location.pathname + "/" + notification.id_action}`}
                            style={{ textDecoration: 'none' }}
                            onClick={closeModal}
                            state={{ background: location, commentModal: true, post, userPost, likes, prevPath: location.pathname }}>
                            {
                                post.title
                            }
                        </Link>
                    }
                    {
                        notification.type === 'like' &&
                        <Link to={`${location.pathname + "/" + notification.id_action}`}
                            style={{ textDecoration: 'none' }}
                            onClick={closeModal}
                            state={{ background: location, commentModal: true, post, userPost, likes, prevPath: location.pathname }}>
                            {
                                post.title
                            }
                        </Link>
                    }
                    <br />
                    <span className='format-time'>hace { timeSince( formatDate() ) }</span>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div style={{ background: theme.linea }} className='linea-acostada' />
                <div style={{ color: theme.userName2 }} className='row card-notification'>
                    <Link to={`/perfil/${notification.uid_user}`} style={{ textDecoration: 'none' }}>
                        <div style={{ float: 'left' }}>
                            <img className='icon-user-3'
                                src={userReaction.imgName ? userReaction.imgUrl : userReaction.username}
                                alt={userReaction.username} />
                        </div>
                        <div style={{ float: 'left', color: theme.userName }}>
                            <b>{userReaction.username}</b>
                        </div>
                    </Link>
                    <br />
                    {` ${notification.type === 'follower' ? notification.action : notification.action + ':'} `}
                    {
                        notification.type === 'course' && <span className='format-delete'>curso eliminada</span>
                    }
                    {
                        notification.type === 'inscription' && <span className='format-delete'>curso eliminada</span>
                    }
                    {
                        notification.type === 'comment' && <span className='format-delete'>publicación eliminada</span>
                    }
                    {
                        notification.type === 'like' && <span className='format-delete'>publicación eliminada</span>
                    }
                    <br />
                    <span className='format-time'>hace { timeSince( formatDate() ) }</span>
                </div>
            </div>
        )
    }
}

export default CardNotification;