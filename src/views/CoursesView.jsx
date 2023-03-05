import React, { useEffect, useState } from 'react';
import CardCareer from '../components/card-career/CardCareer';
import CardCourses from '../components/card-courses/CardCourses';
import { useCoursesList, useDivision } from '../hooks';

const CoursesView = () => {

  const [categoria, setCategoria] = useState('Todos');

  const { data: dataDivisions, isFetching: fetchingDivisions, isLoading: loadingDivisions } = useDivision();
  const [divisions, setDivisions] = useState(dataDivisions);

  const { data: dataCourseList, isFetching: fetchingCourseList, isLoading: loadingCourseList } = useCoursesList();
  const [ courses, setCourses ] = useState(dataCourseList);

  useEffect(() => {
    !fetchingDivisions && dataDivisions && setDivisions(dataDivisions);
    // eslint-disable-next-line
  }, [dataDivisions]);

  useEffect(() => {
    !fetchingCourseList && dataCourseList && setCourses(dataCourseList);
    // eslint-disable-next-line
  }, [dataCourseList]);

  if ( loadingDivisions || loadingCourseList ) {
    return (
      <div className='parent'>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    )
  };

  return (
    <div className='principal-body'>
      <div className="linea-acostada" />
      <div className='row'>
        <div className='col-11'>
          <div className='row'>
          <label style={{ textAlign: 'left', marginLeft: '3%', fontSize: '150%', fontFamily: 'Segoe UI Emoji' }}>
            <b>Tutorias por división</b>
          </label>
          <br />
          {
            divisions && divisions.map((division, index) => <CardCareer career={division} filter={division.division} key={division.id} section={categoria} action={setCategoria} />)
          }
          </div>
          <br />
          <div className='row'>
          {
            courses && courses.map((course, index) => 
              categoria === 'Todos'
              ? <CardCourses course={course} key={course._id} />
              : categoria === course.division && <CardCourses course={course} key={course._id} />
            )
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursesView;