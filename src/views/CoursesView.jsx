import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import CardCareer from '../components/card-career/CardCareer';
import CardCourses from '../components/card-courses/CardCourses';
import { filterContent } from '../helpers/utils';
import { useCoursesList, useDivision, useTree } from '../hooks';
import { store } from '../store';
import { Loader } from '../components/loader/Loader';
import { useTheme } from 'styled-components';

const CoursesView = () => {
  const theme = useTheme();
  const { layout: { loading: globalLoader } } = store.getState();
  const userInfoPerfil = useSelector(state => state.user);
  const [categoria, setCategoria] = useState('Todos');

  const { data: dataDivisions, isFetching: fetchingDivisions } = useDivision();
  const [divisions, setDivisions] = useState(dataDivisions);
  
  const { data: dataTree = [], isFetching: fetchingTree } = useTree(userInfoPerfil.uid_user, userInfoPerfil.career);
  const [ tree, setTree ] = useState(dataTree);

  const { data: dataCourseList, isFetching: fetchingCourseList } = useCoursesList();
  const [ courses, setCourses ] = useState( filterContent( dataCourseList, tree ));

  useEffect(() => {
    !fetchingDivisions && dataDivisions && setDivisions(dataDivisions);
    // eslint-disable-next-line
  }, [dataDivisions]);
  
  useEffect(() => {
    !fetchingTree && dataTree && setTree(dataTree);
    // eslint-disable-next-line
  }, [dataTree]);

  useEffect(() => {
    !fetchingCourseList && dataCourseList && tree && setCourses( filterContent( dataCourseList, tree ));
    // eslint-disable-next-line
  }, [dataCourseList]);

  return (
    <div className='principal-body'>
      {
        globalLoader && <Loader/>
      }
      <div className="linea-acostada" />
      <div className='row'>
        <div className='col-11'>
          <div className='row'>
          <label style={{ textAlign: 'left', marginLeft: '1%', fontSize: '150%', fontFamily:'sans-serif',color: theme.subTitles }}>
            <b>Tutorias por división</b>
          </label>
          <br />
          {
            divisions && divisions.map((division, index) => <CardCareer career={division} filter={division.division} key={division.id} section={categoria} action={setCategoria} />)
          }
          </div>
          <br />
          <div className='row'>
          { tree &&
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