import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePostsWithLimit, useUserById } from '../../hooks';

const Course = (props) => {
    const { course } = props;

    const { data: dataPost = [], isFetching: fetchingPost, isLoading: loadingPostsWithLimit } = usePostsWithLimit(course._id, 1);
    const [ post, setPost ] = useState(dataPost);
    
    const { data: dataUserPost = [], isFetching: fetchingUserPost } = useUserById(post.uid_user);
    const [userPost, setUserPost] = useState(dataUserPost);

    useEffect(() => {
        !fetchingPost && dataPost && post.length > -1 && setPost(dataPost);
    }, [dataPost]);

    useEffect(() => {
        !fetchingUserPost && dataUserPost && userPost.length > -1 && setUserPost(dataUserPost);
    }, [dataUserPost]);
    
    if (loadingPostsWithLimit) {
        return (
            <div className='parent'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <>
            <div className='card'>
                <img src={post.imgUrl} alt={dataUserPost.username} style={{ width: '100%' }} />
                <div className='container'>
                    <h4>Autor: <b>{dataUserPost.username}</b></h4>
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