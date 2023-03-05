import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserById } from '../../hooks';

const CardCourses = (props) => {
    const { course } = props;

    const { data: dataUserCourse = [], isFetching: fetchingUserCourse, loading: loadingUserCourse } = useUserById(course.uid_user);
    const [userCourse, setUserCourse] = useState(dataUserCourse);

    useEffect(() => {
        !fetchingUserCourse && dataUserCourse && userCourse.length > -1 && setUserCourse(dataUserCourse);
        // eslint-disable-next-line
    }, [dataUserCourse]);

    if (loadingUserCourse) {
        return (
            <div className='parent'>
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }

    return (
        <div className='col-2'>
            <div className='card'>
                <img src={course.imgUrl} alt={dataUserCourse.username} style={{ width: '100%', height: '15vh'  }} />
                <div className='container'>
                    <h4>Autor de la tutoría: <b>{dataUserCourse.username}</b></h4>
                    <p>
                        Nombre: <br />
                        <Link to={`/course/${course._id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            {course.title}
                        </Link>
                        <br />
                        <b>Días: </b> {course.dates} <br />
                        <b>Horario: </b> {course.hours} <br />
                        <b>Participantes inscritos: </b> { course.participants.length } <br />
                        <span className='hashtag-post'>#{course.career} #{course.division}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default CardCourses;