import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import HomeHeader from './components/home-header/HomeHeader';
import MainHeader from './components/main-header/MainHeader';

import AppRouter from './routers/AppRouter';

const App = () => {
  const { active: sessionActive } = useSelector(state => state.sessionActive);
  
  return (
    <div>
      <BrowserRouter>
        {
          sessionActive ? <HomeHeader /> : <MainHeader />
        }
        <div id='content'>
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;