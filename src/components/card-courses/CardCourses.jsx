import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserById } from '../../hooks';
import { useTheme } from 'styled-components';

const CardCourses = (props) => {
    const { course } = props;

    const { data: dataUserCourse = [], isFetching: fetchingUserCourse } = useUserById(course.uid_user);
    const [userCourse, setUserCourse] = useState(dataUserCourse);

    useEffect(() => {
        !fetchingUserCourse && dataUserCourse && userCourse.length > -1 && setUserCourse(dataUserCourse);
        // eslint-disable-next-line
    }, [dataUserCourse]);
    const theme = useTheme();
    return (
        <div className='col-2' style={{marginRight:'40px', marginleft:'40px', width:'400px'}}>
            <div className='card'style={{borderRadius:'10px', width:'400px', border:'1px solid #d0d0d0'}}>
                <img src={course.imgUrl} alt={dataUserCourse.username} style={{ width: '400px', height: '15vh', borderRadius:'10px'   }} />
                <div className='container'>
                    <p>
                        <Link to={`/course/${course._id}`}
                            style={{ textDecoration: 'none', fontFamily:'sans-serif', fontSize:'30px', color:theme.userName }}
                        >
                            {course.title}
                        </Link>
                        <br/>
                        <span style={{fontFamily:'sans-serif', fontSize:'16px', color:theme.userName2}}>
                            {dataUserCourse.username}
                            <br/>
                            Días: {course.dates} <br />
                            Horario: {course.hours} <br />
                            Inscritos: { course.participants.length } <br />
                        </span>
                        <span className='hashtag-post'>#{course.career} #{course.division}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CardCourses;