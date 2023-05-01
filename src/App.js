import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import HomeHeader from './components/home-header/HomeHeader';
import MainHeader from './components/main-header/MainHeader';

import AppRouter from './routers/AppRouter';
import { ThemeProvider } from 'styled-components';
import { light } from '@mui/material/styles/createPalette';
import ReactSwitch from 'react-switch';
import { useState } from 'react';
import { useThemeContext } from './context/ThemeContext';
const App = () => {
  const { contextTheme, setContextTheme } = useThemeContext();
  const { active: sessionActive } = useSelector(state => state.sessionActive);
  const [checked, setChecked] = useState(true);
  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === 'Light' ? 'Dark' : 'Light'))
    setChecked(nextChecked);


  }
  return (
    <div>
      <BrowserRouter>
        <header id={contextTheme}>
          <div id='content'>
            <ReactSwitch
              onChange={handleSwitch}
              checked={checked}
              onColor="#86d3ff"
              onHandleColor="#2693e6"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={30}
              width={48}
              className="react-switch"
              id="material-switch"
            />
            {
              sessionActive ? <HomeHeader /> : <MainHeader />
            }
            <AppRouter />
          </div>
        </header>
      </BrowserRouter>
    </div>
  )
}

export default App;