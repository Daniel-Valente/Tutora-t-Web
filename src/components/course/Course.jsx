import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostsWithLimit, useUserById } from '../../hooks';
import { useTheme } from 'styled-components';

const Course = (props) => {
    const { course } = props;

    const { data: dataPost = [], isFetching: fetchingPost, isLoading: loadingPostsWithLimit } = usePostsWithLimit(course._id, 1);
    const [ post, setPost ] = useState(dataPost);
    
    const { data: dataUserPost = [], isFetching: fetchingUserPost } = useUserById(post.uid_user);
    const [userPost, setUserPost] = useState(dataUserPost);

    useEffect(() => {
        !fetchingPost && dataPost && post.length > -1 && setPost(dataPost);
        // eslint-disable-next-line
    }, [dataPost]);

    useEffect(() => {
        !fetchingUserPost && dataUserPost && userPost.length > -1 && setUserPost(dataUserPost);
        // eslint-disable-next-line
    }, [dataUserPost]);

    const theme = useTheme();

    if ( loadingPostsWithLimit ) {
        return (
            <div className='spinner-container'>
                <div className="loading-spinner"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    if(post.length === 0)
        return <div></div>

    return (
        <>
            <div className='card'>
                <img src={post.imgUrl} alt={dataUserPost.username} style={{ width: '100%' }} />
                <div className='container' style={{fontFamily:'sans-serif', fontSize:'16px', color:theme.userName2}}>
                    <h4 >Autor: <b>{dataUserPost.username}</b></h4>
                    <p>
                        Tutoria: <br />
                        <Link to={`/course/${course._id}`}
                            style={{ textDecoration: 'none' }}
                        >
                        {course.title}
                        </Link>
                    </p>
                </div>
            </div>
            <br />
        </>
    )
}

export default Course;